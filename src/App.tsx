import { Navbar } from "./components/All.tsx";
import {
  StatsForm,
  GamesForm,
  RankForm,
  HomePage,
  ExamplePage,
  ResultsPage,
} from "./pages/All.tsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { PlayerInfo } from "./content/All";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleStatsSubmit = (
    name: string,
    stat: string,
    agg: string,
    seasons: string[],
    filters: string[]
  ) => {
    if (name == "") name = "na";
    let seasons_string = seasons.length == 0 ? "na" : seasons.join("-");
    let filters_string = filters.length == 0 ? "na" : filters.join("-");
    navigate(
      `/stats/results/${name}/${seasons_string}/${filters_string}/na/${stat}/${agg}/na/na/na`
    );
  };

  const handleGamesSubmit = (
    name: string,
    seasons: string[],
    filters: string[],
    limit: Number
  ) => {
    if (name == "") name = "na";
    let seasons_string = seasons.length == 0 ? "na" : seasons.join("-");
    let filters_string = filters.length == 0 ? "na" : filters.join("-");
    navigate(
      `/games/results/${name}/${seasons_string}/${filters_string}/${limit}`
    );
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
    let seasons_string = seasons.length == 0 ? "na" : seasons.join("-");
    let filters_string = filters.length == 0 ? "na" : filters.join("-");
    if (team == "") team = "na";
    if (stage == "") stage = "na";
    navigate(
      `/rank/results/na/${seasons_string}/${filters_string}/${limit}/${stat}/${agg}/${order}/${team}/${stage}`
    );
  };

  return (
    <>
      <div className="body">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/examples" element={<ExamplePage />} />

          <Route
            path="/stats/results/:name?/:seasons?/:filters?/:limit?/:stat?/:agg?/:order?/:team?/:stage?"
            element={<ResultsPage path="stats" />}
          />
          <Route
            path="/games/results/:name?/:seasons?/:filters?/:limit?/:stat?/:agg?/:order?/:team?/:stage?"
            element={<ResultsPage path="games" />}
          />
          <Route
            path="/rank/results/:name?/:seasons?/:filters?/:limit?/:stat?/:agg?/:order?/:team?/:stage?"
            element={<ResultsPage path="rank" />}
          />

          {/* <Route
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
          /> */}
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
      </div>
    </>
  );
}

export default App;
