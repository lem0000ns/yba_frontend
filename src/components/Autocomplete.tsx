import { useState } from "react";

interface Props {
  possibleValues: string[];
  helperText?: string;
  text: string;
  onChange: (value: string) => void;
}

const Autocomplete = ({
  possibleValues,
  helperText,
  text,
  onChange,
}: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([""]);
  const [alertVisibility, setAlertVisibility] = useState(false);

  const handleInputChange = (e: any) => {
    e.target.value == "" ? setAlertVisibility(false) : setAlertVisibility(true);
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0) {
      const filteredSuggestions = possibleValues.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      filteredSuggestions.length > 0
        ? setSuggestions(filteredSuggestions)
        : setSuggestions(["No matches found"]);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setAlertVisibility(false);
    setInputValue(suggestion);
    onChange(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete-wrapper">
      <h6>{text}</h6>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="type here..."
      />
      {suggestions.length > 0 && suggestions[0] != "" && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <div id="nameHelp" className="form-text">
        {helperText}
      </div>
      {alertVisibility && (
        <div className="alert alert-danger" role="alert">
          Click one of listed names
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
