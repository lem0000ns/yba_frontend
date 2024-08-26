import { Autocomplete } from "./All";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import namesList from "../forms/allNames.txt?raw";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const allNames = namesList.split("\n");
  const [nameValue, setNameValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: any) => {
    console.log(e);
    nameValue == ""
      ? navigate("/")
      : navigate(`/players/${encodeURIComponent(nameValue)}`);
  };

  return (
    <header>
      <a href="/">
        <h1 className="YangBA-header">YangBA</h1>
      </a>
      <nav>
        <ul className="nav_links">
          <li>
            <a
              className="nav_links_items"
              href="/stats"
              data-tooltip-id="my-tooltip-inline"
              data-tooltip-content="View an individual stat from your favorite player!"
            >
              Stats
            </a>
          </li>
          <li>
            <a
              className="nav_links_items"
              href="/games"
              data-tooltip-id="my-tooltip-inline"
              data-tooltip-content="Per-game statlines tailored to your choice!"
            >
              Games
            </a>
          </li>
          <li>
            <a
              className="nav_links_items"
              href="/rank"
              data-tooltip-id="my-tooltip-inline"
              data-tooltip-content="Choose how to rank the best (or worst) players!"
            >
              Rank
            </a>
          </li>
        </ul>
        <Tooltip
          id="my-tooltip-inline"
          style={{ backgroundColor: "rgb(179, 255, 179)", color: "#111" }}
        />
      </nav>
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
    </header>
  );
};

export default Navbar;
