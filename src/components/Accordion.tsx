import { Tooltip } from "react-tooltip";

const Accordion = () => {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordionButton"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
          >
            Stats
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <strong>Query a specific stat from an individual player.</strong>{" "}
            <h6 style={{ color: "rgb(104, 11, 185)" }}>
              hover over parameters for details
            </h6>
            <span style={{ fontStyle: "italic" }}>Required:</span>{" "}
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="base stat"
            >
              stat,
            </span>
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="how stat will be measured"
            >
              aggregate function
            </span>
            <br />
            <span style={{ fontStyle: "italic" }}>Optional:</span>{" "}
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="name of player"
            >
              name,
            </span>
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="limits to selected season(s)"
            >
              season(s),
            </span>
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="limits pool of data to certain criteria"
            >
              filter
            </span>
            <br />
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordionButton collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Games
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <strong>
              Retrieve specific statlines based on chosen filters.
            </strong>{" "}
            <h6 style={{ color: "rgb(104, 11, 185)" }}>
              hover over parameters for details
            </h6>
            <span style={{ fontStyle: "italic" }}>Required:</span>{" "}
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="only _ games will be shown"
            >
              number of games
            </span>
            <br />
            <span style={{ fontStyle: "italic" }}>Optional:</span>{" "}
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="limits to games from specified player"
            >
              name,
            </span>
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="limits to games from specified season(s)"
            >
              season(s),
            </span>
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="limits to games that match certain criteria"
            >
              filter
            </span>
            <br />
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordionButton collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Rank
          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <strong>Rank and compare players based on chosen filters.</strong>{" "}
            <h6 style={{ color: "rgb(104, 11, 185)" }}>
              hover over parameters for details
            </h6>
            <span style={{ fontStyle: "italic" }}>Required:</span>{" "}
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="top/bottom _ players"
            >
              number of players,
            </span>
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="specifies how data will be compared"
            >
              aggregate function,
            </span>
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="base stat by which to be ranked"
            >
              stat,
            </span>
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="most or least?"
            >
              order
            </span>
            <br />
            <span style={{ fontStyle: "italic" }}>Optional:</span>{" "}
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="limits to players/stats from specified team"
            >
              team,
            </span>
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="limits to players/stats from specified season(s)"
            >
              season(s),
            </span>
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="stage of season (e.g. preseason, reg, etc.)"
            >
              stage,
            </span>
            <span
              className="homepage-tooltip"
              data-tooltip-id="homepage-tooltip"
              data-tooltip-content="limits to players who meet threshold of certain stats"
            >
              filter
            </span>
            <br />
          </div>
        </div>
        <Tooltip
          id="homepage-tooltip"
          style={{ backgroundColor: "rgb(230,204,255)", color: "#222" }}
          place="bottom"
          positionStrategy="fixed"
        />
      </div>
    </div>
  );
};

export default Accordion;
