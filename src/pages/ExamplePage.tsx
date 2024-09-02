interface DataItem {
  col1: string;
  col2: string;
}

interface Props {
  id: string;
  exampleSentence: string;
  details: DataItem[];
  path: string;
}

const Example = ({ id, exampleSentence, details, path }: Props) => {
  return (
    <>
      <div
        style={{ marginTop: "30px" }}
        className="simple-examples-english-translation"
        data-bs-toggle="offcanvas"
        data-bs-target={`#${id}`}
        aria-controls={id}
      >
        {exampleSentence}{" "}
        <span className="badge text-bg-secondary">{path}</span>
      </div>
      <div
        className="offcanvas offcanvas-end"
        id={id}
        aria-labelledby={`offcanvas${id}`}
        style={{ backgroundColor: "rgba(32, 0, 64, 0.9)", color: "white" }}
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title"
            id={`offcanvas${id}`}
            style={{
              marginTop: "100px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {exampleSentence}
          </h5>
        </div>
        <div className="offcanvas-body">
          <div className="example-body">
            <table className="example-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {details.map((item: any, index: any) => (
                  <tr key={index}>
                    <td>{item.col1}</td>
                    <td>{item.col2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const ExamplePage = () => {
  return (
    <div className="example-page-container" style={{ marginTop: "50px" }}>
      <h2 style={{ opacity: "0.6" }}>Check out these examples!</h2>
      <h3 className="simple-examples">Some simple ones</h3>

      <div className="simple-examples-container">
        <Example
          id="example1"
          exampleSentence="Damian Lillard's total assists in the 2015 season"
          details={[
            { col1: "Stat", col2: "Assists" },
            { col1: "Aggregate Function", col2: "Sum" },
            { col1: "Name", col2: "Damian Lillard" },
            { col1: "Season(s)", col2: "2015" },
            { col1: "Filter", col2: "N/A" },
          ]}
          path="Stats"
        />
        <Example
          id="example2"
          exampleSentence="30 player statlines who scored more than 60"
          details={[
            { col1: "Limit", col2: "30" },
            { col1: "Name", col2: "N/A" },
            { col1: "Season(s)", col2: "N/A" },
            { col1: "Filter", col2: "points>60" },
          ]}
          path="Games"
        />
        <Example
          id="example3"
          exampleSentence="Brandon Ingram's career-high in 3pm"
          details={[
            { col1: "Stat", col2: "3pm" },
            { col1: "Aggregate Function", col2: "Max" },
            { col1: "Name", col2: "Brandon Ingram" },
            { col1: "Season(s)", col2: "N/A" },
            { col1: "Filter", col2: "N/A" },
          ]}
          path="Stats"
        />
        <Example
          id="example4"
          exampleSentence="Least 20 efficient free-throw shooters (among those that shoot at least 2 fta/game)"
          details={[
            { col1: "Limit", col2: "20" },
            { col1: "Aggregate Function", col2: "Avg" },
            { col1: "Stat", col2: "Ftpct" },
            { col1: "Order", col2: "Least" },
            { col1: "Team", col2: "N/A" },
            { col1: "Season(s)", col2: "N/A" },
            { col1: "Stage", col2: "N/A" },
            { col1: "Filter", col2: "fta>2" },
          ]}
          path="Rank"
        />
        <Example
          id="example5"
          exampleSentence="10 games in which a player had an OPI of more than 0.9"
          details={[
            { col1: "Limit", col2: "10" },
            { col1: "Name", col2: "N/A" },
            { col1: "Season(s)", col2: "N/A" },
            { col1: "Filter", col2: "OPI>0.9" },
          ]}
          path="Games"
        />
        <br />
      </div>

      <h3 className="specific-examples">More specific... (but interesting!)</h3>
      <div className="specific-examples-container">
        <Example
          id="example6"
          exampleSentence="10 players with highest 3pt percentage who've shot at
          least 5 three-pointers per game from 2017 to 2021"
          details={[
            { col1: "Limit", col2: "10" },
            { col1: "Aggregate Function", col2: "Avg" },
            { col1: "Stat", col2: "3pct" },
            { col1: "Order", col2: "Most" },
            { col1: "Team", col2: "N/A" },
            { col1: "Season(s)", col2: "2017-2021" },
            { col1: "Stage", col2: "N/A" },
            { col1: "Filter", col2: "3pa>5" },
          ]}
          path="Rank"
        />
        <Example
          id="example7"
          exampleSentence="15 statlines of players who had at least 40 points and 13 assists in the
          regular season"
          details={[
            { col1: "Limit", col2: "15" },
            { col1: "Name", col2: "N/A" },
            { col1: "Season(s)", col2: "N/A" },
            { col1: "Filter", col2: "stage=2,points>40,ast>13" },
          ]}
          path="Games"
        />
        <Example
          id="example8"
          exampleSentence="How many turnovers did Jayson Tatum average in games where he shot
          below 40% in 2023?"
          details={[
            { col1: "Stat", col2: "Turnovers" },
            { col1: "Aggregate Function", col2: "Average" },
            { col1: "Name", col2: "Jayson Tatum" },
            { col1: "Season(s)", col2: "2023" },
            { col1: "Filter", col2: "fgpct<0.4" },
          ]}
          path="Stats"
        />
        <Example
          id="example9"
          exampleSentence="Top 13 players based on career-high in rebounds on the Utah Jazz
          among those who've played more than 50 games"
          details={[
            { col1: "Limit", col2: "13" },
            { col1: "Aggregate Function", col2: "Max" },
            { col1: "Stat", col2: "Rebounds" },
            { col1: "Order", col2: "Most" },
            { col1: "Team", col2: "UTA" },
            { col1: "Season(s)", col2: "N/A" },
            { col1: "Stage", col2: "N/A" },
            { col1: "Filter", col2: "games>50" },
          ]}
          path="Rank"
        />
        <Example
          id="example10"
          exampleSentence="What is the least amount of threes Klay Thompson has made in a game
          where he scored more than 35 points?"
          details={[
            { col1: "Stat", col2: "3pm" },
            { col1: "Aggregate Function", col2: "Least" },
            { col1: "Name", col2: "Klay Thompson" },
            { col1: "Season(s)", col2: "N/A" },
            { col1: "Filter", col2: "points>35" },
          ]}
          path="Stats"
        />
        <br />
      </div>
    </div>
  );
};

export default ExamplePage;
