import "../App.css";

interface Props {
  text: string;
  color?: string;
  options: string[];
  handleClick: (name: string) => void;
}

const Dropdown = ({ text, color = "light", options, handleClick }: Props) => {
  return (
    <div className="dropdown-container">
      <button
        type="button"
        className={`btn btn-${color} dropdown-toggle`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {text}
      </button>
      <ul className="dropdown-menu">
        {options.map((key) => (
          <li key={key}>
            <div className="dropdown-items" onClick={() => handleClick(key)}>
              {key}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
