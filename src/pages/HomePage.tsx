import Accordion from "../components/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleExamplesClick = () => {
    navigate("/examples");
  };
  return (
    <div className="homepage">
      <div className="homepage-title">
        <h1 style={{ fontWeight: "bold" }}>You've made it to the YangBA!</h1>
        <h2 style={{ opacity: "0.6" }}>
          Begin by choosing one of the three tools
        </h2>
      </div>
      <div style={{ marginTop: "100px" }}>
        <h2 style={{ opacity: "0.8" }}>What do these mean?</h2>
      </div>
      <div className="homepage-accordion">
        <Accordion />
      </div>
      <div className="see-examples-button" onClick={handleExamplesClick}>
        I need inspiration{" "}
        <FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default HomePage;
