import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SCREENS from "../../route/router";
import Button from "../../components/ui/button/Button";

import "./leaderboard.scss";

function Leaderboard() {
  let navigate = useNavigate();
  let rank = JSON.parse(localStorage.getItem("players")) || [];

  function goToLogin() {
    sessionStorage.clear();
    navigate(SCREENS.login);
  }
  function goToGame() {
    navigate(SCREENS.game);
  }

  return (
    <div className="leaderboard">
      <section>
        <h1>Leaderboard</h1>

        <ul>
          {rank.length > 0 ? (
            rank
              .sort((a, b) => (a.score > b.score ? -1 : 1))
              .map((element, key) => {
                return (
                  <li key={key}>
                    {element.username}: {element.score}
                  </li>
                );
              })
          ) : (
            <p>No results available</p>
          )}
        </ul>

        <div className="button-container">
          <Button
            label={"Restart"}
            callBackClick={goToGame}
            classCss={"primary"}
          />
          <Button
            label={"Logout"}
            callBackClick={goToLogin}
            classCss={"secondary"}
          />
        </div>
      </section>

      <section>
        <img
          className="pharahone"
          src={require("../../assets/images/egypt-god.png")}
          alt=""
        />
      </section>
    </div>
  );
}

export default Leaderboard;
