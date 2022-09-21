import { useEffect, useState, setState } from "react";
import rock from "../../assets/images/rock.png";
import cactus from "../../assets/images/cactus.png";
import cat from "../../assets/images/cat.png";

import Doggo from "../../components/hook/doggo/Doggo";

import "./game.scss";
function Game() {
  const DOGGO_HEIGHT = 72;
  const DOGGO_WIDTH = 100;
  const GAME_HEIGHT = window.innerHeight;
  const GAME_WIDTH = window.innerWidth;
  const GRAVITY = 6;
  const JUMP = 180;
  const BALK_WIDTH = 101;
  const BALK_ARR = [
    {
      img: rock,
      height: 75,
    },
    {
      img: cactus,
      height: 90,
    },
    {
      img: cat,
      height: 110,
    },
  ];

  const [doggoState, setDoggoState] = useState(GAME_HEIGHT - DOGGO_HEIGHT);
  const [jumping, setjumping] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [balkHeight, setBalkHeight] = useState(BALK_ARR[0].height);
  const [balkImg, setBalkImg] = useState(BALK_ARR[0].img);
  const [balkLeft, setBalkLeft] = useState(GAME_WIDTH - BALK_WIDTH);

  useEffect(() => {
    let timeId;
    if (gameStarted && doggoState < GAME_HEIGHT - DOGGO_HEIGHT) {
      timeId = setInterval(() => {
        setDoggoState((doggoState) => doggoState + GRAVITY);
      }, 24);
    }
    console.log(doggoState, "doggo nel effect");
    handleClick();
    return () => {
      clearInterval(timeId);
    };
  }, [doggoState, gameStarted]);

  useEffect(() => {
    let gameEnd = gameStarted;
    let collided = doggoState >= GAME_HEIGHT - balkHeight;
    if (balkLeft >= 0 && balkLeft <= DOGGO_WIDTH && collided) {
      gameEnd = false;
    }
    setGameStarted(gameEnd);
  }, [balkLeft, gameStarted, doggoState]);

  function handleClick() {
    let newDoggoPosition = doggoState;
    let handleJumping = true;
    setGameStarted(true);
    console.log(jumping, "nel click");
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

  useEffect(() => {
    let balkId;
    if (gameStarted && balkLeft >= -BALK_WIDTH) {
      balkId = setInterval(() => {
        setBalkLeft((balkLeft) => balkLeft - 8);
      }, 24);
    } else {
      setBalkLeft(GAME_WIDTH - BALK_WIDTH);
    }
    return () => {
      clearInterval(balkId);
    };
  }, [balkLeft, gameStarted]);

  return (
    <div className="bg-container" onClick={handleClick}>
      <div className="layer layer-04"></div>
      <div className="layer layer-03"></div>
      <div className="layer layer-02"></div>
      <div className="layer layer-01"></div>
      <div className="doggo" style={{ top: doggoState + "px" }}></div>
      <div
        className="balk"
        style={{
          top: GAME_HEIGHT - balkHeight,
          height: balkHeight,
          width: BALK_WIDTH,
          left: balkLeft,
          backgroundImage: `url(${balkImg})`,
        }}
      ></div>
      <div className="street"></div>
    </div>
  );
}

export default Game;
