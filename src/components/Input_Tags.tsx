import { useState } from "react";

interface Props {
  tags: string[];
  addFilters: (event: any) => void;
  removeFilters: (event: any) => void;
}

const Input_Tags = ({ tags, addFilters, removeFilters }: Props) => {
  const [currFilter, setCurrFilter] = useState("");

  const handleOnKeyDown = (event: any) => {
    if (event.key == ",") {
      event.preventDefault();
      addFilters(event);
      setCurrFilter("");
    }
  };

  const removeTags = (indexToRemove: any) => {
    removeFilters(indexToRemove);
  };

  return (
    <div className="input-tags">
      <ul>
        {tags.map((value, index) => (
          <li key={index}>
            <span>{value}</span>
            <i className="delete-filter" onClick={() => removeTags(index)}></i>
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
