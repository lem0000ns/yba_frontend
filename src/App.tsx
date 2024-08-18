import { Dropdown, Table, Navbar } from "./components/All.tsx";
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
  const [path, setPath] = useState("Path");
  const [result, setResult] = useState<any>();
  const [percentile, setPercentile] = useState("");
  const [statInfo, setStatInfo] = useState("");

  const [showCurry, setShowCurry] = useState(true);
  const [showPlayer, setShowPlayer] = useState<any>();
  const [isPlayer, setIsPlayer] = useState(false);
  const [resultVisibility, setResultVisibility] = useState(false);
  const [error, setError] = useState("");

  const handleClick = (resource: string) => {
    if (resource == "Where's Curry?") resource = "Path";
    reset();
    setPath(resource);
    resource == "Path" ? setShowCurry(true) : setShowCurry(false);
  };

  const reset = () => {
    setResultVisibility(false);
    setError("");
    setPercentile("");
    setIsPlayer(false);
  };

  const handleStatsSubmit = (
    name: string,
    stat: string,
    agg: string,
    seasons: string[],
    filter: string
  ) => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (name == "'Stat' and 'Agg' are required fields") {
      setError(name);
    } else {
      setResultVisibility(false);
      setIsPlayer(true);
      if (name != "") {
        let tempName = name.split(" ").join("-");

        let playerImg = (
          <img
            src={`https://d2xnnptf2jlna3.cloudfront.net/playerImages/${tempName}.jpg`}
            alt={`Image of ${tempName}`}
            style={{ width: "20%", height: "auto" }} // Example dimensions
            className="image"
            onError={() => setIsPlayer(false)}
          />
        );
        console.log(playerImg);
        setShowPlayer(playerImg);
      }
      setError("");
      if (stat == "games") agg = "sum";
      setStatInfo(getStatInfo(name, stat, agg, seasons, filter, "", -1, ""));
      setResultVisibility(true);
      let url =
        baseURL +
        "stats?" +
        computeURL(name, stat, agg, seasons, filter, -1, "", "", "");
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
    filter: string,
    limit: Number
  ) => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (name == "'Limit' is a required field") {
      setError(name);
    } else {
      if (name != "") setShowPlayer(true);
      setStatInfo(getStatInfo(name, "", "", seasons, filter, "", limit, ""));
      setError("");
      let url =
        baseURL +
        "games?" +
        computeURL(name, "", "", seasons, filter, limit, "", "", "");
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
    filter: string
  ) => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (agg == "'Agg', 'Stat', 'Order', and 'Limit' are required fields") {
      setError(agg);
    } else {
      setStatInfo(
        getStatInfo("", stat, agg, seasons, filter, team, limit, order)
      );
      setError("");
      let url =
        baseURL +
        "rank?" +
        computeURL("", stat, agg, seasons, filter, limit, order, team, stage);
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

  const isStats = path === "Stats";
  const isGames = path === "Games";
  const isRank = path === "Rank";
  const pathVisibility = isRank || isGames || isStats;

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

      {isStats && pathVisibility && (
        <StatsForm onSubmit={handleStatsSubmit}></StatsForm>
      )}
      {isGames && pathVisibility && (
        <GamesForm onSubmit={handleGamesSubmit}></GamesForm>
      )}
      {isRank && pathVisibility && (
        <RankForm onSubmit={handleRankSubmit}></RankForm>
      )}
      {resultVisibility && isStats && (
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
      {resultVisibility && isGames && (
        <div className="result">
          <p ref={resultRef} className="statsInfo" style={{ fontSize: "24px" }}>
            {statInfo}:
          </p>
          {showPlayer}
          <Table columns={fields} body={result}></Table>
        </div>
      )}
      {resultVisibility && isRank && (
        <div className="result">
          <p ref={resultRef} className="statsInfo" style={{ fontSize: "24px" }}>
            {statInfo}:
          </p>
          <Table columns={["Name", "Stat"]} body={result}></Table>
        </div>
      )}
      {percentile && <div className="percentile">{percentile}</div>}
      {isPlayer && showPlayer}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
