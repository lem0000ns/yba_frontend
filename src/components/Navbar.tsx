import { Autocomplete } from "./All";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import namesList from "../forms/allNames.txt?raw";

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
            <a className="nav_links_items" href="/stats">
              Stats
            </a>
          </li>
          <li>
            <a className="nav_links_items" href="/games">
              Games
            </a>
          </li>
          <li>
            <a className="nav_links_items" href="/rank">
              Rank
            </a>
          </li>
        </ul>
      </nav>
      <form className="d-flex" role="search" onSubmit={(e) => handleSearch(e)}>
        <Autocomplete
          possibleValues={allNames}
          text=""
          onChange={(value: string) => setNameValue(value)}
          className="search-bar"
        />
      </form>
    </header>
  );
};

export default Navbar;
