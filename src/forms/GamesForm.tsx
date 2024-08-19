import { useState } from "react";
import {
  MultiSelect,
  InputForm,
  Modal,
  Autocomplete,
  Input_Tags,
} from "../components/All";
import { capitalizeName } from "../utilities";

let allNames: string[] = [];

async function processNames() {
  const response = await fetch("names.txt");
  const namesStr = await response.text();
  allNames = namesStr.split("\n").map((name: string) => capitalizeName(name));
  return allNames;
}

processNames();

interface Props {
  onSubmit: (
    name: string,
    seasons: string[],
    filters: string[],
    limit: Number
  ) => void;
}

const GamesForm = ({ onSubmit }: Props) => {
  const [nameValue, setNameValue] = useState("");
  const [seasons, setSeasons] = useState([""]);
  const [filters, setFilters] = useState<string[]>([]);
  const [limit, setLimit] = useState(-1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    limit == -1
      ? onSubmit("'Limit' is a required field", [""], [], -1)
      : onSubmit(nameValue, seasons, filters, limit);
  };

  return (
    <form onSubmit={handleSubmit}>
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

export default GamesForm;
