import { Dropdown, Table, Navbar, Button } from "./components/All.tsx";
import { StatsForm, GamesForm, RankForm } from "./forms/All";
import { useState, useRef } from "react";
import { computeURL, getStatInfo } from "./utilities.tsx";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { curry, Image } from "./content/All";

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
  const [path, setPath] = useState("Explore");
  const [result, setResult] = useState<any>();
  const [percentile, setPercentile] = useState("");
  const [statInfo, setStatInfo] = useState("");

  const [showCurry, setShowCurry] = useState(true);
  const [showPlayer, setShowPlayer] = useState<any>();
  const [resultVisibility, setResultVisibility] = useState(false);
  const [pathVisibility, setPathVisibility] = useState(false);
  const [error, setError] = useState("");

  const handleClick = (resource: string) => {
    if (resource == "Where's Curry?") resource = "Explore";
    reset();
    setPath(resource);
    if (resource == "Explore") {
      setShowCurry(true);
      setPathVisibility(false);
    } else {
      setShowCurry(false);
      setPathVisibility(true);
    }
  };

  const reset = () => {
    setResultVisibility(false);
    setError("");
    setPercentile("");
    setShowPlayer(false);
  };

  const handleStatsSubmit = (
    name: string,
    stat: string,
    agg: string,
    seasons: string[],
    filters: string[]
  ) => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (name == "'Stat' and 'Agg' are required fields") {
      setError(name);
    } else {
      setResultVisibility(false);
      setPathVisibility(false);
      setError("");
      if (name != "") {
        let tempName = name.split(" ").join("-");

        let playerImg = (
          <img
            src={`https://d2xnnptf2jlna3.cloudfront.net/playerImages/${tempName}.jpg`}
            alt={`Image of ${tempName}`}
            style={{ width: "20%", height: "auto" }} // Example dimensions
            className="image"
            onError={() => setShowPlayer(false)}
          />
        );
        console.log(playerImg);
        setShowPlayer(playerImg);
      }
      if (stat == "games") agg = "sum";
      setStatInfo(getStatInfo(name, stat, agg, seasons, filters, "", -1, ""));
      setResultVisibility(true);
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
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (name == "'Limit' is a required field") {
      setError(name);
    } else {
      if (name != "") setShowPlayer(true);
      setStatInfo(getStatInfo(name, "", "", seasons, filters, "", limit, ""));
      setError("");
      setPathVisibility(false);
      let url =
        baseURL +
        "games?" +
        computeURL(name, "", "", seasons, filters, limit, "", "", "");
      axios
        .get(url)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          let temp = response.data.games
            .filter((item: any) => item != "playerID" && item != "gameID")
            .map((item: any) => {
              return (
                <tr key={item.id}>
                  {fields.map((field: string) => (
                    <td key={field}>{item[field]}</td>
                  ))}
                </tr>
              );
            });
          setResult(temp);
          setResultVisibility(true);
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
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (agg == "'Agg', 'Stat', 'Order', and 'Limit' are required fields") {
      setError(agg);
    } else {
      setPathVisibility(false);
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
                {cols.map((value: string) => (
                  <td key={value}>{item[value]}</td>
                ))}
              </tr>
            );
          });
          setResult(temp);
          setResultVisibility(true);
        })
        .catch((error) => {
          setError("Oh no! There was an error");
          console.error("there was an error: " + error);
        });
    }
  };

  const resultRef = useRef<HTMLDivElement | null>(null);

  let pathDropdown = (
    <Dropdown
      text={path}
      color="light"
      options={["Stats", "Games", "Rank"]}
      handleClick={(resource: string) => handleClick(resource)}
    ></Dropdown>
  );

  return (
    <div className="body">
      <Navbar
        dropdown={pathDropdown}
        home="Where's Curry?"
        onHomeClick={(home: string) => handleClick(home)}
      ></Navbar>

      {showCurry && (
        <div>
          <Image source={curry}></Image>
        </div>
      )}

      {path == "Stats" && pathVisibility && (
        <StatsForm onSubmit={handleStatsSubmit}></StatsForm>
      )}
      {path == "Games" && pathVisibility && (
        <GamesForm onSubmit={handleGamesSubmit}></GamesForm>
      )}
      {path == "Rank" && pathVisibility && (
        <RankForm onSubmit={handleRankSubmit}></RankForm>
      )}
      {resultVisibility && path == "Stats" && (
        <div className="result">
          <p className="statsInfo" style={{ fontSize: "24px" }}>
            {statInfo}:
          </p>
          <p
            ref={resultRef}
            className="statsResult"
            style={{ fontSize: "36px" }}
          >
            {result}
          </p>
        </div>
      )}
      {resultVisibility && path == "Games" && (
        <div className="result">
          <p ref={resultRef} className="statsInfo" style={{ fontSize: "24px" }}>
            {statInfo}:
          </p>
          {showPlayer}
          <Table columns={fields} body={result}></Table>
        </div>
      )}
      {resultVisibility && path == "Rank" && (
        <div className="result">
          <p ref={resultRef} className="statsInfo" style={{ fontSize: "24px" }}>
            {statInfo}:
          </p>
          <Table columns={["Name", "Stat"]} body={result}></Table>
          <Button
            name="Reverse rows"
            onClick={() => setResult(result.slice().reverse())}
            color="dark"
          ></Button>
        </div>
      )}
      {percentile && <div className="percentile">{percentile}</div>}
      {showPlayer}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
