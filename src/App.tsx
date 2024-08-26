import { Table, Navbar, Button } from "./components/All.tsx";
import { StatsForm, GamesForm, RankForm } from "./forms/All";
import { useState } from "react";
import { computeURL, getStatInfo } from "./utilities.tsx";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { curry, Image, PlayerInfo } from "./content/All";
import { Route, Routes, useNavigate } from "react-router-dom";

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

function App() {
  const [result, setResult] = useState<any>();
  const [percentile, setPercentile] = useState("");
  const [statInfo, setStatInfo] = useState("");
  const [player, setPlayer] = useState<any>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleStatsSubmit = (
    name: string,
    stat: string,
    agg: string,
    seasons: string[],
    filters: string[]
  ) => {
    if (name == "'Stat' and 'Agg' are required fields") {
      setError(name);
    } else {
      setError("");
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
      setStatInfo(getStatInfo(name, stat, agg, seasons, filters, "", -1, ""));
      let url =
        baseURL +
        "stats?" +
        computeURL(name, stat, agg, seasons, filters, -1, "", "", "");
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
          navigate("/stats/results");
        })
        .catch((error) => {
          setError("Oh no! An error occurred!");
          console.error("there was an error: " + error);
        });
    }
  };

  const handleGamesSubmit = (
    name: string,
    seasons: string[],
    filters: string[],
    limit: Number
  ) => {
    if (name == "'Limit' is a required field") {
      setError(name);
    } else {
      if (name != "") setPlayer(true);
      setStatInfo(getStatInfo(name, "", "", seasons, filters, "", limit, ""));
      setError("");
      let url =
        baseURL +
        "games?" +
        computeURL(name, "", "", seasons, filters, limit, "", "", "");
      axios
        .get(url)
        .then((response) => {
          console.log(JSON.stringify(response.data));
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
          navigate("/games/results");
        })
        .catch((error) => {
          setError("Oh no! There was an error");
          console.error("there was an error: " + error);
        });
    }
  };

  const handleRankSubmit = (
    agg: string,
    stat: string,
    order: string,
    limit: Number,
    team: string,
    seasons: string[],
    stage: string,
    filters: string[]
  ) => {
    if (agg == "'Agg', 'Stat', 'Order', and 'Limit' are required fields") {
      setError(agg);
    } else {
      setStatInfo(
        getStatInfo("", stat, agg, seasons, filters, team, limit, order)
      );
      setError("");
      let url =
        baseURL +
        "rank?" +
        computeURL("", stat, agg, seasons, filters, limit, order, team, stage);
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
          navigate("/rank/results");
        })
        .catch((error) => {
          setError("Oh no! There was an error");
          console.error("there was an error: " + error);
        });
    }
  };

  return (
    <>
      <div className="body">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <div style={{ marginTop: "30px" }}>
                <Image source={curry}></Image>
              </div>
            }
          />
          <Route
            path="/stats/results"
            element={
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
            }
          />
          <Route
            path="/games/results"
            element={
              <div className="result">
                <p className="statsInfo" style={{ fontSize: "24px" }}>
                  {statInfo}:
                </p>
                <Table columns={fields} body={result}></Table>
              </div>
            }
          />
          <Route
            path="/rank/results"
            element={
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
            }
          />
          <Route
            path="/stats"
            element={<StatsForm onSubmit={handleStatsSubmit} />}
          />
          <Route
            path="/games"
            element={<GamesForm onSubmit={handleGamesSubmit} />}
          />
          <Route
            path="/rank"
            element={<RankForm onSubmit={handleRankSubmit} />}
          />
          <Route path="/players/:name" element={<PlayerInfo />} />
        </Routes>

        {error && (
          <div className="alert-container">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
