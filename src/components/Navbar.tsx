import { Autocomplete } from "./All";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import namesList from "../pages/allNames.txt?raw";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const allNames = namesList.split("\n");
  const [nameValue, setNameValue] = useState("");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: unknown) => {
    console.log(e);
    if (nameValue == "") navigate("/");
    else navigate(`/players/${encodeURIComponent(nameValue)}`);
  };

  return (
    <nav>
      <a href="/">
        <h1 className="YangBA-header">YangBA</h1>
      </a>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
          console.log(menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : "test"}>
        <li>
          <a
            className="nav_links_items"
            href="/stats"
            data-tooltip-id="my-tooltip-inline"
            data-tooltip-content="Specific performance stats"
          >
            Stats
          </a>
        </li>
        <li>
          <a
            className="nav_links_items"
            href="/games"
            data-tooltip-id="my-tooltip-inline"
            data-tooltip-content="Per-game statlines"
          >
            Games
          </a>
        </li>
        <li>
          <a
            className="nav_links_items"
            href="/rank"
            data-tooltip-id="my-tooltip-inline"
            data-tooltip-content="Custom ranking system"
          >
            Rank
          </a>
        </li>
      </ul>
      <Tooltip
        id="my-tooltip-inline"
        style={{ backgroundColor: "rgb(179, 255, 179)", color: "#111" }}
        place={menuOpen ? "top" : "bottom"}
      />
      <form className="d-flex" role="search" onSubmit={(e) => handleSearch(e)}>
        <div className="search-container">
          <Autocomplete
            possibleValues={allNames}
            text=""
            onChange={(value: string) => setNameValue(value)}
            className="search-bar"
          />
          <button type="submit" className="magnifying-glass">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
    </nav>
  );
};

export default Navbar;
