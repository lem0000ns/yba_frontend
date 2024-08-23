import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  possibleValues: string[];
  helperText?: string;
  text: string;
  onChange: (value: string) => void;
  className?: string;
}

const Autocomplete = ({
  possibleValues,
  helperText,
  text,
  onChange,
  className = "input",
}: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([""]);
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
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
    setInputValue(suggestion);
    onChange(suggestion);
    setSuggestions([]);
    if (className == "search-bar") {
      navigate(`/players/${suggestion}`);
      setInputValue("");
    }
  };

  return (
    <div className="autocomplete-wrapper">
      <h6>{text}</h6>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for a player..."
        className={className}
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
    </div>
  );
};

export default Autocomplete;
