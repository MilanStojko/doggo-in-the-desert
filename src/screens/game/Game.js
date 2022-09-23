import { useEffect, useState, setState, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";

import SCREENS from "../../route/router";

import Doggo from "../../components/hook/doggo/Doggo";

import "./game.scss";
import rock from "../../assets/images/rock.png";
import cactus from "../../assets/images/cactus.png";
import cat from "../../assets/images/cat.png";
import bone from "../../assets/images/bone.png";
import cookie from "../../assets/images/cookie.png";
import steak from "../../assets/images/steak.png";
import bruxellessprout from "../../assets/images/bruxellessprout.png";

function Game() {
  function handleResponsive() {
    if (window.innerHeight > 900 && window.innerWidth > 1100) {
      return parseInt(2.5);
    } else if (window.innerHeight > 630 && window.innerWidth > 1100) {
      return parseInt(2);
    } else if (window.innerHeight > 375 && window.innerWidth > 700) {
      return parseInt(1.5);
    } else {
      return parseInt(1);
    }
  }
  let getResponsive = handleResponsive();
  console.log(getResponsive);
  console.log();
  const DOGGO_HEIGHT = 72 * getResponsive;
  const DOGGO_WIDTH = 100 * getResponsive;
  const GAME_HEIGHT = window.innerHeight;
  const GAME_WIDTH = window.innerWidth;
  const GRAVITY = 6 * getResponsive;
  const SPEED = 13 * getResponsive;
  const JUMP = 210 * getResponsive;
  const FOODBALK_ARR = [
    {
      img: rock,
      width: 65 * getResponsive,
      height: 50 * getResponsive,
      score: 0,
      obastacle: true,
      position: 0 * getResponsive,
    },
    {
      img: cactus,
      width: 65 * getResponsive,
      height: 80 * getResponsive,
      score: 0,
      obastacle: true,
      position: 0 * getResponsive,
    },
    {
      img: cat,
      width: 50 * getResponsive,
      height: 100 * getResponsive,
      score: 0,
      obastacle: true,
      position: 0 * getResponsive,
    },
    {
      img: bone,
      width: 40 * getResponsive,
      height: 40 * getResponsive,
      score: 1,
      obastacle: false,
      position: 80 * getResponsive,
    },
    {
      img: steak,
      width: 60 * getResponsive,
      height: 40 * getResponsive,
      score: 3,
      obastacle: false,
      position: 130 * getResponsive,
    },
    {
      img: cookie,
      width: 40 * getResponsive,
      height: 40 * getResponsive,
      score: 2,
      obastacle: false,
      position: 105 * getResponsive,
    },
    {
      img: bruxellessprout,
      width: 40 * getResponsive,
      height: 40 * getResponsive,
      score: -1,
      obastacle: false,
      position: 105 * getResponsive,
    },
  ];

  const [foodBalk, setFoodBalk] = useState({
    img: FOODBALK_ARR[0].img,
    width: FOODBALK_ARR[0].width,
    height: FOODBALK_ARR[0].height,
    score: FOODBALK_ARR[0].score,
    obastacle: FOODBALK_ARR[0].obastacle,
    position: FOODBALK_ARR[0].position,
  });
  const [display, setDisplay] = useState(true);
  const [doggoState, setDoggoState] = useState(GAME_HEIGHT - DOGGO_HEIGHT);
  const [jumping, setjumping] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [balkLeft, setBalkLeft] = useState(GAME_WIDTH - foodBalk.width);
  const [score, setScore] = useState(0);

  let incrementScore = 0;
  let navigate = useNavigate();

  useEffect(() => {
    increment();
    setScore((score) => score + incrementScore);
  }, [display]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    let timeId;
    if (gameStarted && doggoState < GAME_HEIGHT - DOGGO_HEIGHT) {
      timeId = setInterval(() => {
        setDoggoState((doggoState) => doggoState + GRAVITY);
      }, 24);
    }
    let e = {
      x: 0,
      y: doggoState,
      w: DOGGO_WIDTH,
      h: DOGGO_HEIGHT,
    };

    let a = {
      x: balkLeft,
      y: GAME_HEIGHT - foodBalk.position - foodBalk.height,
      w: foodBalk.width,
      h: foodBalk.height,
    };
    let gameEnd = gameStarted;
    // let collided = doggoState >= GAME_HEIGHT - foodBalk.height;
    let collided = checkCollide();
    function checkCollide() {
      if (
        e.y + e.h < a.y ||
        e.y > a.y + a.h ||
        e.x + e.w < a.x ||
        e.x > a.x + a.w
      ) {
        return false;
      }
      return true;
    }
    if (collided && foodBalk.obastacle === true) {
      gameEnd = false;
      navigate(SCREENS.result, { state: { score: score } });
    } else if (collided && foodBalk.obastacle === false) {
      setDisplay(false);
    }
    console.log(score, "nello score");
    setGameStarted(gameEnd);
    let balkId;
    if (gameStarted && balkLeft >= -foodBalk.width) {
      balkId = setInterval(() => {
        setBalkLeft((balkLeft) => balkLeft - SPEED);
      }, 24);
    } else {
      let newBalk = FOODBALK_ARR[~~(Math.random() * FOODBALK_ARR.length)];
      setFoodBalk({
        img: newBalk.img,
        width: newBalk.width,
        height: newBalk.height,
        score: newBalk.score,
        obastacle: newBalk.obastacle,
        position: newBalk.position,
      });
      setDisplay(true);
      setBalkLeft(GAME_WIDTH - foodBalk.width);
    }
    return () => {
      clearInterval(timeId);
      clearInterval(balkId);
    };
  }, [balkLeft, gameStarted, doggoState]);

  function increment() {
    incrementScore = foodBalk.score;
  }

  function handleClick() {
    let newDoggoPosition = doggoState;
    let handleJumping = true;
    setGameStarted(true);
    if (!jumping) {
      newDoggoPosition = doggoState - JUMP;
      handleJumping = true;
    }
    if (doggoState === GAME_HEIGHT - DOGGO_HEIGHT && jumping) {
      handleJumping = false;
    }
    setjumping(handleJumping);
    setDoggoState(newDoggoPosition);
  }

  return (
    <div className="game">
      <div className="bg-container">
        <div className="layer layer-04"></div>
        <div className="layer layer-03"></div>
        <div className="layer layer-02"></div>
        <div className="layer layer-01"></div>

        <div className="stats">
          <p>Doggo in the desert</p>
          <p>{score}</p>
          <p>secondi</p>
        </div>

        <div
          className="doggo"
          style={{
            top: doggoState + "px",
            transition: "all .1s ease-out",
            left: 0,
            height: DOGGO_HEIGHT,
            width: DOGGO_WIDTH,
          }}
        >
          <img
            className="doggo_img"
            src={require("../../assets/images/spritesheet.png")}
            alt="dog"
          />
        </div>
        {display && (
          <div
            className="balk"
            style={{
              top: GAME_HEIGHT - foodBalk.height - foodBalk.position,
              height: foodBalk.height,
              width: foodBalk.width,
              left: balkLeft,
              backgroundImage: `url(${foodBalk.img})`,
            }}
          ></div>
        )}
        <div className="street"></div>
      </div>
    </div>
  );
}

export default Game;
