import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { filterTeams, filterBorn, filterSchools } from "./filter.tsx";
import { defaultIcon, Image } from "./All.tsx";

const PlayerInfo = () => {
  const { name } = useParams();
  const [info, setInfo] = useState<any>();
  const [player, setPlayer] = useState<any>();

  useEffect(() => {
    axios
      .get(
        `https://vojed2b2fk.execute-api.us-west-1.amazonaws.com/dev/players?name=${name}`
      )
      .then((response) => {
        const playerData = response.data.player;

        if (playerData.born) playerData.born = filterBorn(playerData.born);
        if (playerData.teams) playerData.teams = filterTeams(playerData.teams);
        if (playerData.high_school)
          playerData.high_school = filterSchools(playerData.high_school);
        if (playerData.college)
          playerData.college = filterSchools(playerData.college);
        if (playerData.awards) {
          playerData.awards = filterSchools(playerData.awards);
        }
        setInfo(playerData);
        const tempName = playerData.name
          .replace(/[\s']/g, "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        console.log(
          `https://d2qd9wn47agcqj.cloudfront.net/allPlayerImages/${tempName}.jpg`
        );
        setPlayer(
          <img
            src={`https://d2qd9wn47agcqj.cloudfront.net/allPlayerImages/${tempName}.jpg`}
            alt={`Image of ${playerData.name}`}
            className="player-profile-image"
            onError={() => setPlayer(<Image source={defaultIcon}></Image>)}
          />
        );
        console.log(player);
      })
      .catch((error) => {
        setInfo("Sorry - we don't have information on this player");
        console.log(error);
      });
  }, [name]);

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <div className="player-profile-container">
      <h1 className="player-profile-name">{info.name}</h1>

      <h5 className="player-profile-intro">{info.intro}</h5>

      <div className="basicInfo-image-container">
        <div className="player-profile-basicInfo">
          {info.pos && <h5 className="player-profile-label">Position(s):</h5>}
          <h5 className="player-profile-pos">{info.pos}</h5>

          {info.born && <h5 className="player-profile-label">Born:</h5>}
          <h5 className="player-profile-born">{info.born}</h5>

          {info.height && <h5 className="player-profile-label">Height:</h5>}
          <h5 className="player-profile-height">{info.height}</h5>

          {info.weight && <h5 className="player-profile-label">Weight:</h5>}
          <h5 className="player-profile-weight">{info.weight}</h5>

          {info.high_school && (
            <h5 className="player-profile-label">High school(s):</h5>
          )}
          <h5 className="player-profile-hs">{info.high_school}</h5>

          {info.college && (
            <h5 className="player-profile-label">College(s):</h5>
          )}
          <h5 className="player-profile-college">{info.college}</h5>

          {info.draft && <h5 className="player-profile-label">Draft:</h5>}
          <h5 className="player-profile-draft">{info.draft}</h5>

          {info.career && (
            <h5 className="player-profile-label">Career Timeline:</h5>
          )}
          <h5 className="player-profile-career">{info.career}</h5>
        </div>

        <div className="player-profile-image-container">
          <div>{player}</div>
        </div>
      </div>

      <div className="player-profile-teamsAwards">
        <h5 className="player-profile-label" style={{ marginTop: "20px" }}>
          Playing history:
        </h5>
        <h5 className="player-profile-teams">{info.teams}</h5>

        <h5 className="player-profile-label" style={{ marginTop: "20px" }}>
          Awards:{" "}
        </h5>
        <h5 className="player-profile-awards">{info.awards}</h5>
      </div>
    </div>
  );
};

export default PlayerInfo;
