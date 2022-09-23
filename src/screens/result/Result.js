import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import SCREENS from "../../route/router";
import Button from "../../components/ui/button/Button";

import "./result.scss";

function Result() {
  let navigate = useNavigate();
  const location = useLocation();
  let storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
  let sessionPlayer = JSON.parse(sessionStorage.getItem("player")) || [];

  sessionPlayer.score = location.state.score;
  sessionStorage.setItem("player", JSON.stringify(sessionPlayer));

  function setNewScore() {
    storedPlayers.map((element) => {
      if (element.username === sessionPlayer.username) {
        element.score = element.score + sessionPlayer.score;
      }
    });
    localStorage.setItem("players", JSON.stringify(storedPlayers));
  }

  function goToLogin() {
    sessionStorage.clear();
    navigate(SCREENS.login);
  }

  function goToGame() {
    navigate(SCREENS.game);
    setNewScore();
  }

  function goToLeaderboard() {
    navigate(SCREENS.leaderboard);
    setNewScore();
  }

  return (
    <div className="result">
      <section>
        <h1>Game over</h1>
        <p>
          Hai totalizzato{" "}
          <span className="yellow-marker">{location?.state?.score}</span> punti
        </p>
        <div className="button-container">
          <Button
            label={"Restart"}
            callBackClick={goToGame}
            classCss={"primary"}
          />
          <Button
            label={"Rank"}
            callBackClick={goToLeaderboard}
            classCss={"secondary"}
          />
        </div>

        <Button
          label={"Logout"}
          callBackClick={goToLogin}
          classCss={"tertiary"}
        />
      </section>

      <section className="section-cat">
        <img
          className="cat-game-over"
          src={require("../../assets/images/cat-game-over.png")}
          alt="cat"
        />
      </section>
    </div>
  );
}

export default Result;
