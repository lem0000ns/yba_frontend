import { useState } from "react";
import {
  MultiSelect,
  InputForm,
  Modal,
  Autocomplete,
  Input_Tags,
  OPIModal,
} from "../components/All";
import namesList from "./allNames.txt?raw";

interface Props {
  onSubmit: (
    name: string,
    seasons: string[],
    filters: string[],
    limit: Number
  ) => void;
}

const GamesForm = ({ onSubmit }: Props) => {
  const allNames = namesList.split("\n");
  const [nameValue, setNameValue] = useState("");
  const [seasons, setSeasons] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [limit, setLimit] = useState(-1);
  const [error, setError] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    limit == -1
      ? setError("'Number of games' is a required field")
      : onSubmit(nameValue, seasons, filters, limit);
  };

  return (
    <section className="games-background">
      <form className="path_page" onSubmit={handleSubmit}>
        <InputForm
          inputType="number of games"
          helperText="determines how many games will be returned"
          onChange={(value: string) => setLimit(Number(value))}
        ></InputForm>

        <Autocomplete
          possibleValues={allNames}
          text="Enter name (optional)"
          onChange={(value: string) => setNameValue(value)}
        />

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

        <br />

        <Modal
          title="Filter criteria? (optional)"
          enterMessage="Enter filter"
          textBox={
            <Input_Tags
              tags={filters}
              addFilters={(event) =>
                setFilters([...filters, event.target.value])
              }
              removeFilters={(indexToRemove) =>
                setFilters(
                  filters.filter((_, index) => index !== indexToRemove)
                )
              }
            ></Input_Tags>
          }
          helperText={[
            "stats: points, fgm, fga, ftm, fta, 3pm, 3pa, 3pct, fgpct, ftpct, ast, reb, steals, blocks, turnovers, min, OPI, stage",
            "op: >, <, =",
            "'num' guidelines: use decimal for percents, stage = (1: preseason, 2: regular season, 3-5: playoffs)",
          ]}
        />

        {filters.length > 0 && <p>Filter: {filters.join(", ")}</p>}

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
        >
          Submit
        </button>

        {error && (
          <div className="alert-container" style={{ marginBottom: "100px" }}>
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        )}
        <OPIModal />
      </form>
    </section>
  );
};

export default GamesForm;
