import { useParams } from "react-router-dom";
import { getStatInfo, computeURL } from "../utilities.tsx";
import { Table, Button } from "../components/All.tsx";
import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  path: string;
}

const baseURL = "https://vojed2b2fk.execute-api.us-west-1.amazonaws.com/dev/";

const fields = [
  "name",
  "stage",
  "gameDate",
  "team",
  "season",
  "points",
  "min",
  "fgm",
  "fga",
  "3pm",
  "3pa",
  "ftm",
  "fta",
  "reb",
  "ast",
  "steals",
  "blocks",
  "turnovers",
  "OPI",
];

const ResultsPage = ({ path }: Props) => {
  const [result, setResult] = useState<any>();
  const [statInfo, setStatInfo] = useState("");
  const [player, setPlayer] = useState<any>();
  const [percentile, setPercentile] = useState("");
  const routeParams = useParams();
  const [error, setError] = useState("");
  const name =
    routeParams["name"] && routeParams["name"] != "na"
      ? routeParams["name"]
      : "";
  const seasons =
    routeParams["seasons"] && routeParams["seasons"] != "na"
      ? routeParams["seasons"].split("-")
      : [];
  const filters =
    routeParams["filters"] && routeParams["filters"] != "na"
      ? routeParams["filters"].split("-")
      : [];
  const limit =
    routeParams["limit"] && routeParams["limit"] != "na"
      ? Number(routeParams["limit"])
      : -1;
  const stat =
    routeParams["stat"] && routeParams["stat"] != "na"
      ? routeParams["stat"]
      : "";
  let agg =
    routeParams["agg"] && routeParams["agg"] != "na" ? routeParams["agg"] : "";
  const order =
    routeParams["order"] && routeParams["order"] != "na"
      ? routeParams["order"]
      : "";
  const team =
    routeParams["team"] && routeParams["team"] != "na"
      ? routeParams["team"]
      : "";
  const stage =
    routeParams["stage"] && routeParams["stage"] != "na"
      ? routeParams["stage"]
      : "";

  function getPlayerImg(name: string) {
    return (
      <img
        src={`https://d2qd9wn47agcqj.cloudfront.net/allPlayerImages/${name}.jpg`}
        alt={`Image of ${name}`}
        style={{ width: "20%", height: "auto" }} // Example dimensions
        className="image"
        onError={() => setPlayer(false)}
      />
    );
  }

  let url =
    baseURL +
    `${path}?` +
    computeURL(name, stat, agg, seasons, filters, limit, order, team, stage);
  console.log(url);

  useEffect(() => {
    console.log([name, seasons, filters, limit, stat, agg, order, team, stage]);

    if (path == "games") {
      axios
        .get(url)
        .then((response) => {
          let temp = response.data.games
            ?.filter((item: any) => item != "playerID" && item != "gameID")
            .map((item: any) => {
              return (
                <tr key={item.id}>
                  {fields.map((field: string) => {
                    return field == "name" ? (
                      <td key={field}>
                        <a
                          className="table_player_name"
                          href={`/players/${item[field]}`}
                        >
                          {item[field]}
                        </a>
                      </td>
                    ) : (
                      <td key={field}>{item[field]}</td>
                    );
                  })}
                </tr>
              );
            });
          setResult(temp);
          setStatInfo(
            getStatInfo(name, "", "", seasons, filters, "", limit, "", "")
          );
        })
        .catch((error) => {
          console.log("there was an error: " + error);
          setError("There was an error");
        });
    }

    if (path == "stats") {
      if (name != "") {
        const tempName = name
          .replace(/[\s']/g, "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        let playerImg = getPlayerImg(tempName);
        setPlayer(playerImg);
      }
      if (stat == "games") agg = "sum";
      setStatInfo(
        getStatInfo(name, stat, agg, seasons, filters, "", -1, "", "")
      );
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          Number.isInteger(response.data[agg + "_" + stat])
            ? setResult(response.data[agg + "_" + stat])
            : setResult(response.data[agg + "_" + stat].toFixed(3));

          response.data.percentile != 0
            ? setPercentile(
                (response.data.percentile * 100).toFixed(3) + " percentile"
              )
            : setPercentile("");
        })
        .catch((error) => {
          console.error("there was an error: " + error);
          setError("There was an error");
        });
    }

    if (path == "rank") {
      setStatInfo(
        getStatInfo("", stat, agg, seasons, filters, team, limit, order, stage)
      );
      let cols = ["name", agg + "_" + stat];
      axios
        .get(url)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          let temp = response.data.result.map((item: any) => {
            return (
              <tr key={item.id}>
                {cols.map((value: string) => {
                  return value == "name" ? (
                    <td key={value}>
                      <a
                        className="table_player_name"
                        href={`/players/${item[value]}`}
                      >
                        {item[value]}
                      </a>
                    </td>
                  ) : (
                    <td key={value}>{item[value]}</td>
                  );
                })}
              </tr>
            );
          });
          setResult(temp);
        })
        .catch((error) => {
          console.error("there was an error: " + error);
          setError("There was an error");
        });
    }
  }, [baseURL]);

  if (error) {
    return (
      <div className="alert-container" style={{ marginTop: "100px" }}>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (path == "games" && (!result || !statInfo)) {
    return (
      <div style={{ color: "white", marginTop: "200px", fontSize: "36px" }}>
        Loading...
      </div>
    );
  } else if (path == "games") {
    return (
      <div className="result">
        <p className="statsInfo" style={{ fontSize: "24px" }}>
          {statInfo}:
        </p>
        <Table columns={fields} body={result}></Table>
      </div>
    );
  }

  if (path === "stats") {
    if (!result || !statInfo) {
      return (
        <div style={{ color: "white", marginTop: "200px", fontSize: "36px" }}>
          Loading...
        </div>
      );
    }

    return (
      <div className="result">
        <p className="statsInfo" style={{ fontSize: "24px" }}>
          {statInfo}:
        </p>
        <p className="statsResult" style={{ fontSize: "36px" }}>
          {result}
        </p>
        {percentile && <div className="percentile">{percentile}</div>}
        {player}
      </div>
    );
  }

  if (path == "rank") {
    if (!result || !statInfo) {
      return (
        <div style={{ color: "white", marginTop: "200px", fontSize: "36px" }}>
          Loading...
        </div>
      );
    }
    return (
      <div className="result">
        <p className="statsInfo" style={{ fontSize: "24px" }}>
          {statInfo}:
        </p>
        <Table columns={["Name", "Stat"]} body={result}></Table>
        <Button
          name="Reverse rows"
          onClick={() => setResult(result.slice().reverse())}
          color="dark"
        ></Button>
      </div>
    );
  }
};

export default ResultsPage;
