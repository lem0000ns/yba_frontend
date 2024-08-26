const cleanUnicode = (str: string) => {
  str = str.replace("u2013", "\u2013");
  str = str.replace("u2192", "\u2192");
  return str;
};

export const filterBorn = (born: string) => {
  let lastParenIndex = born.lastIndexOf(")");
  if (lastParenIndex == -1) {
    return <div>{born}</div>;
  }
  let firstParenIndex = born.lastIndexOf(")", lastParenIndex - 1);
  return (
    <>
      <div>{born.slice(firstParenIndex + 1, lastParenIndex + 1)}</div>
      <div>{born.slice(lastParenIndex + 1).replace("[a]", "")}</div>
    </>
  );
};

export const filterTeams = (teams: any) => {
  const teams_json = JSON.parse(teams);
  const teams_json_data = teams_json.map((item: JSON) => {
    const [[tempYear, tempTeam]] = Object.entries(item) as [[string, string]];
    const year = cleanUnicode(tempYear);
    const team = cleanUnicode(tempTeam);
    return (
      <tr>
        <td>{year}</td>
        <td>{team}</td>
      </tr>
    );
  });
  return (
    <div className="teams-table-container">
      <table>
        <tbody>{teams_json_data}</tbody>
      </table>
    </div>
  );
};

export const filterSchools = (schools: any) => {
  let tempSchools = schools.split("\n");
  tempSchools = tempSchools.filter((item: string) => item != "");
  return (
    <div>
      {tempSchools.map((curr: string) => {
        let firstParen = curr.indexOf("(");
        curr = curr.slice(0, firstParen) + " " + curr.slice(firstParen);
        return (
          <div key={curr} style={{ marginTop: "10px" }}>
            {curr}
          </div>
        );
      })}
    </div>
  );
};
