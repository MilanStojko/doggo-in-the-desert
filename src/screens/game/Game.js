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
  const DOGGO_HEIGHT = 72;
  const DOGGO_WIDTH = 100;
  const GAME_HEIGHT = window.innerHeight;
  const GAME_WIDTH = window.innerWidth;
  const GRAVITY = 6;
  const JUMP = 180;
  const FOODBALK_ARR = [
    {
      img: rock,
      width: 100,
      height: 75,
      score: 0,
      obastacle: true,
      position: 0,
    },
    {
      img: cactus,
      width: 65,
      height: 90,
      score: 0,
      obastacle: true,
      position: 0,
    },
    {
      img: cat,
      width: 50,
      height: 110,
      score: 0,
      obastacle: true,
      position: 0,
    },
    {
      img: bone,
      width: 50,
      height: 72,
      score: 1,
      obastacle: false,
      position: 30,
    },
    {
      img: steak,
      width: 50,
      height: 72,
      score: 3,
      obastacle: false,
      position: 50,
    },
    {
      img: cookie,
      width: 50,
      height: 72,
      score: 2,
      obastacle: false,
      position: 60,
    },
    {
      img: bruxellessprout,
      width: 50,
      height: 72,
      score: -1,
      obastacle: false,
      position: 45,
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
    let elementDog = {
      x: doggoState,
      y: 0,
      w: DOGGO_WIDTH,
      h: DOGGO_HEIGHT,
    };

    let elementFoodBalk = {
      x: GAME_HEIGHT - foodBalk.height - foodBalk.position,
      y: balkLeft,
      w: foodBalk.width,
      h: foodBalk.height,
    };
    let gameEnd = gameStarted;
    // let collided = doggoState >= GAME_HEIGHT - foodBalk.height;
    let collided = checkCollide();
    function checkCollide() {
      if (
        elementDog.x < elementFoodBalk.x + elementFoodBalk.w &&
        elementDog.x + elementDog.w > elementFoodBalk.x &&
        elementDog.y < elementFoodBalk.y + elementFoodBalk.h &&
        elementDog.h + elementDog.y > elementFoodBalk.y
      ) {
        return true;
      }
      return false;
    }
    if (collided && foodBalk.obastacle === true) {
      gameEnd = false;
      // navigate(SCREENS.result);
    } else if (collided && foodBalk.obastacle === false) {
      setDisplay(false);
    }
    console.log(score, "nello score");
    setGameStarted(gameEnd);
    let balkId;
    if (gameStarted && balkLeft >= -foodBalk.width) {
      balkId = setInterval(() => {
        setBalkLeft((balkLeft) => balkLeft - 8);
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
    <div className="bg-container">
      <div className="layer layer-04"></div>
      <div className="layer layer-03"></div>
      <div className="layer layer-02"></div>
      <div className="layer layer-01"></div>
      <div
        className="doggo"
        style={{
          top: doggoState + "px",
          transition: "all .1s ease-out",
          left: 0,
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
  );
}

export default Game;
