import { useState } from "react";
import {
  Dropdown,
  MultiSelect,
  InputForm,
  Modal,
  Input_Tags,
} from "../components/All";

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
    filters: string[]
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
  const [filters, setFilters] = useState<string[]>([]);

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
          []
        )
      : onSubmit(
          aggValue,
          statValue,
          order,
          limit,
          team,
          seasons,
          stage,
          filters
        );
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        inputType="number of players"
        helperText="determines how many players will be ranked"
        onChange={(value: string) => setLimit(Number(value))}
      ></InputForm>

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
        options={["Most", "Least"]}
        handleClick={(order: string) => setOrder(order)}
      ></Dropdown>

      <Dropdown
        text={team}
        options={teamAbbreviations}
        handleClick={(team: string) => setTeam(team)}
      ></Dropdown>

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

      <Modal
        title="Filter criteria? (optional)"
        enterMessage="Enter filter"
        textBox={
          <Input_Tags
            tags={filters}
            addFilters={(event) => setFilters([...filters, event.target.value])}
            removeFilters={(indexToRemove) =>
              setFilters(filters.filter((_, index) => index !== indexToRemove))
            }
          ></Input_Tags>
        }
      />

      {filters.length > 0 && <p>Filter: {filters.join(", ")}</p>}

      <button
        type="submit"
        className="btn btn-primary"
        style={{ marginTop: "20px" }}
      >
        Submit
      </button>
    </form>
  );
};

export default RankForm;
