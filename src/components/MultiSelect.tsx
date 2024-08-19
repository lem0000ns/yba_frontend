import { useState } from "react";

interface Props {
  text: string;
  options: string[];
  onChange: (selectedOptions: string[]) => void;
}

const MultiSelect = ({ text, options, onChange }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (options: HTMLCollectionOf<HTMLOptionElement>) => {
    const selectedValues = Array.from(options, (item) => item.value);
    setSelectedOptions(selectedValues);
    onChange(selectedValues);
  };

  return (
    <div>
      <h6 className="select-team">{text}</h6>
      <select
        className="form-select"
        multiple
        aria-label="Multiple select functionality"
        value={selectedOptions}
        onChange={(e) => handleChange(e.target.selectedOptions)}
      >
        {options.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelect;
