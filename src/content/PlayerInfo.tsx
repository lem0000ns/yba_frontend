import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlayerInfo = () => {
  const { name } = useParams();
  const [info, setInfo] = useState<any>();

  useEffect(() => {
    axios
      .get(
        `https://vojed2b2fk.execute-api.us-west-1.amazonaws.com/dev/players?name=${name}`
      )
      .then((response) => {
        setInfo(response.data.player);
        console.log(info);
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
      <h3 className="player-profile-pos">Position: {info.pos}</h3>
      <h5 className="player-profile-born">Born: {info.born}</h5>
      <h5 className="player-profile-height">Height: {info.height}</h5>
      <h5 className="player-profile-weight">Weight: {info.weight}</h5>
      <h5 className="player-profile-hs">High school: {info.high_school}</h5>
      <h5 className="player-profile-college">College: {info.college}</h5>
      <h5 className="player-profile-college">Draft: {info.draft}</h5>
      <h5 className="player-profile-college">Career: {info.career}</h5>
      <h5 className="player-profile-college">Playing history: {info.teams}</h5>
      <h5 className="player-profile-college">Awards: {info.awards}</h5>
      <h5 className="player-profile-college">{info.intro}</h5>
    </div>
  );
};

export default PlayerInfo;
