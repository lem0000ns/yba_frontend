function computeURL(
  name: string,
  stat: string,
  agg: string,
  seasons: string[],
  filters: string[],
  limit: Number,
  order: string,
  team: string,
  stage: string
) {
  let url = "";
  let isLimit = false;
  if (limit != -1) {
    url += "limit=" + limit;
    isLimit = true;
  }
  if (stat != "") isLimit ? (url += "&stat=" + stat) : (url += "stat=" + stat);
  if (name != "") url += "&name=" + name.toLowerCase();
  if (agg != "") {
    if (stat == "games") agg = "sum";
    url += "&agg=" + agg;
  }
  if (seasons.length > 0 && seasons[0] != "") {
    for (const szn of seasons) {
      url += "&season=" + szn;
    }
  }
  if (filters.length > 0) {
    let tempFilters = filters.join(",");
    url += "&filter=" + tempFilters;
  }
  if (order != "") {
    order == "Most" ? (url += "&order=desc") : (url += "&order=asc");
  }
  if (team != "" && team != "Select team (optional)") url += "&team=" + team;
  if (stage != "" && stage != "Select a stage (optional)")
    url += "&stage=" + stage;
  return url;
}

function getStatInfo(
  name: string,
  stat: string,
  agg: string,
  seasons: string[],
  filters: string[],
  team: string,
  limit: Number,
  order: string
) {
  let res = "";
  if (name != "") {
    res += name + "'s ";
  }
  //rank
  if (order != "") {
    order == "Most"
      ? (res += "Top " + limit + " players based on ")
      : (res += "Bottom " + limit + " players based on ");
  }
  //games
  else if (stat == "") {
    res += limit + " games ";
  }
  //rank or stats
  if (stat != "") {
    agg == "sum"
      ? (res += ` total ${stat}`)
      : agg == "avg"
      ? (res += ` average ${stat} per game`)
      : agg == "max"
      ? (res += ` most ${stat}`)
      : (res += ` least ${stat}`);
  }

  if (team != "" && team != "Select team (optional)") {
    res += ` on ${team} `;
  }

  if (seasons.length == 1 && seasons[0] != "") {
    res += ` in ${seasons[0]}`;
  } else if (seasons.length > 1) {
    res += " in the given seasons";
  }

  if (filters.length > 0) {
    res += " where ";
    for (let i = 0; i < filters.length; i++) {
      let currFilter = filters[i];
      let foundOp = false;
      let currStat = "";
      let op = "";
      let num = "";
      for (let j = 0; j < currFilter.length; j++) {
        if (
          currFilter[j] == ">" ||
          currFilter[j] == "<" ||
          currFilter[j] == "="
        ) {
          foundOp = true;
          op = currFilter[j];
        } else {
          foundOp ? (num += currFilter[j]) : (currStat += currFilter[j]);
        }
      }
      res += `${currStat} ${op} ${num}, `;
    }
    res = res.slice(0, -2);
  }

  return res;
}

export { computeURL, getStatInfo };
