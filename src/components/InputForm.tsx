import { useState } from "react";

interface Props {
  inputType: string;
  helperText?: string;
  onChange: (value: string) => void;
}

const InputForm = ({ inputType, onChange, helperText }: Props) => {
  const [nameValue, setNameValue] = useState("");

  const handleChange = (name: string) => {
    setNameValue(name);
    onChange(name);
  };

  return (
    <div className="mb-3">
      <label htmlFor="InputValue" className="form-label">
        Enter {inputType}
      </label>
      <input
        type="text"
        className="form-control"
        id="InputValue"
        aria-describedby="nameHelp"
        value={nameValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={"type here..."}
      ></input>
      <div id="nameHelp" className="form-text">
        {helperText}
      </div>
    </div>
  );
};

export default InputForm;
