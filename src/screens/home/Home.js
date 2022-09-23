import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import soundPlay from "../../events/soundPlay";
import Doggo from "../../components/hook/doggo/Doggo";
import SCREENS from "../../route/router";
import homemp3 from "../../assets/sounds/home.mp3";

import "./home.scss";

function Home() {
  let navigate = useNavigate();
  function goToLogin() {
    navigate(SCREENS.login);
  }

  useEffect(() => {
    document.addEventListener("keydown", function (e) {
      if (e.key == " " || e.code == "Space") {
        goToLogin();
      }
    });
    document.addEventListener("click", goToLogin);
    soundPlay.soundPlay(homemp3, 0.3, true, true);
    return () => {
      document.removeEventListener("keydown", goToLogin);
      document.removeEventListener("click", goToLogin);
    };
  }, []);

  return (
    <div className="home">
      <div className="logo">
        <Doggo />
        <h1>
          Doggo
          <br />
          <span className="fs-small">in the desert</span>
        </h1>
      </div>

      <p className="pulse">Press spacebar to start game</p>
      <div className="cover-container">
        <div></div>
        <img
          className="cover"
          src={require("../../assets/images/cover-home.png")}
          alt=""
        />
        <p className="credits">
          Developed by
          <br />
          Milan Stojkovic &<br />
          Isabella Bagnulo
        </p>
      </div>
    </div>
  );
}

export default Home;
