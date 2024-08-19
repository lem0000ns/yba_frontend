import { useState } from "react";

interface Props {
  tags: string[];
  addFilters: (event: any) => void;
}

const Input_Tags = ({ tags, addFilters }: Props) => {
  const [currFilter, setCurrFilter] = useState("");
  const handleOnKeyDown = (event: any) => {
    if (event.key == ",") {
      event.preventDefault();
      addFilters(event);
      setCurrFilter("");
    }
  };
  return (
    <div className="input-tags">
      <ul>
        {tags.map((value, index) => (
          <li key={index}>
            <span>{value}</span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter filters"
        value={currFilter}
        onChange={(e: any) => setCurrFilter(e.value)}
        onKeyDown={handleOnKeyDown}
      ></input>
    </div>
  );
};

export default Input_Tags;
