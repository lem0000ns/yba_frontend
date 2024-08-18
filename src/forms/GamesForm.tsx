import { useState } from "react";
import { MultiSelect, InputForm, Modal, Autocomplete } from "../components/All";
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
    filter: string,
    limit: Number
  ) => void;
}

const GamesForm = ({ onSubmit }: Props) => {
  const [nameValue, setNameValue] = useState("");
  const [seasons, setSeasons] = useState([""]);
  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(-1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    limit == -1
      ? onSubmit("'Limit' is a required field", [""], "", -1)
      : onSubmit(nameValue, seasons, filter, limit);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete
        possibleValues={allNames}
        text="Enter name (optional)"
        onChange={(value: string) => setNameValue(value)}
      />

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

      <InputForm
        inputType="limit"
        helperText="determines how many games will be returned"
        onChange={(value: string) => setLimit(Number(value))}
      ></InputForm>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>

      <div>
        <br />
      </div>
    </form>
  );
};

export default GamesForm;
