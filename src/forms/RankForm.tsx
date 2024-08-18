import { useState } from "react";
import Dropdown from "../components/Dropdown";
import MultiSelect from "../components/MultiSelect";
import InputForm from "../components/InputForm";
import Modal from "../components/Modal";

let teamAbbreviations = [
  "ATL",
  "BOS",
  "BKN",
  "CHA",
  "CHI",
  "CLE",
  "DAL",
  "DEN",
  "DET",
  "GSW",
  "HOU",
  "IND",
  "LAC",
  "LAL",
  "MEM",
  "MIA",
  "MIL",
  "MIN",
  "NOP",
  "NYK",
  "OKC",
  "ORL",
  "PHI",
  "PHX",
  "POR",
  "SAC",
  "SAN",
  "TOR",
  "UTA",
  "WAS",
];

interface Props {
  onSubmit: (
    agg: string,
    stat: string,
    order: string,
    limit: Number,
    team: string,
    seasons: string[],
    stage: string,
    filter: string
  ) => void;
}

const RankForm = ({ onSubmit }: Props) => {
  const [aggValue, setAggValue] = useState("Select an aggregate function");
  const [statValue, setStatValue] = useState("Select a stat");
  const [order, setOrder] = useState("Select order");
  const [limit, setLimit] = useState(-1);
  const [team, setTeam] = useState("Select team (optional)");
  const [seasons, setSeasons] = useState([""]);
  const [stage, setStage] = useState("Select a stage (optional)");
  const [filter, setFilter] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    aggValue == "Select an aggregate function" ||
    statValue == "Select a stat" ||
    order == "Select order" ||
    limit == -1
      ? onSubmit(
          "'Agg', 'Stat', 'Order', and 'Limit' are required fields",
          "",
          "",
          -1,
          "",
          [""],
          "",
          ""
        )
      : onSubmit(
          aggValue,
          statValue,
          order,
          limit,
          team,
          seasons,
          stage,
          filter
        );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Dropdown
        text={aggValue}
        color="light"
        options={["sum", "avg", "max", "min"]}
        handleClick={(name: string) => setAggValue(name)}
      ></Dropdown>

      <Dropdown
        text={statValue}
        color="light"
        options={[
          "points",
          "fgm",
          "fga",
          "ftm",
          "fta",
          "3pm",
          "3pa",
          "3pct",
          "fgpct",
          "ftpct",
          "ast",
          "reb",
          "steals",
          "blocks",
          "turnovers",
          "min",
          "OPI",
          "games",
        ]}
        handleClick={(stat: string) => setStatValue(stat)}
      ></Dropdown>

      <Dropdown
        text={order}
        options={["desc", "asc"]}
        handleClick={(order: string) => setOrder(order)}
      ></Dropdown>

      <InputForm
        inputType="limit"
        helperText="determines how many players will be ranked"
        onChange={(value: string) => setLimit(Number(value))}
      ></InputForm>

      <Dropdown
        text={team}
        options={teamAbbreviations}
        handleClick={(team: string) => setTeam(team)}
      ></Dropdown>

      <div>
        <br />
      </div>

      <MultiSelect
        text="Select a season or range of seasons (optional)"
        options={[
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
        ]}
        onChange={(options: string[]) => setSeasons(options)}
      ></MultiSelect>

      <Dropdown
        text={stage}
        color="light"
        options={["1", "2", "3", "4", "5"]}
        handleClick={(stage: string) => setStage(stage)}
      ></Dropdown>

      <div>
        <br />
      </div>

      <Modal
        title="Filter criteria? (optional)"
        enterMessage="Enter filter"
        textBox={
          <InputForm
            inputType="filter"
            helperText="stat1op1x1,stat2op2x2…"
            onChange={(value: string) => setFilter(value)}
          ></InputForm>
        }
      ></Modal>

      <p>Filter: {filter}</p>

      <div>
        <br />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default RankForm;
