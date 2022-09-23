import { useEffect, useState, setState, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";

import SCREENS from "../../route/router";
import responsive from "../../events/responsive";
import elements from "../../utils/elements";

import Button from "../../components/ui/button/Button";

import "./tutorial.scss";

function Tutorial() {
  let getResponsive = responsive.handleResponsive();
  const DOGGO_HEIGHT = 72 * getResponsive;
  const DOGGO_WIDTH = 100 * getResponsive;
  const GAME_HEIGHT = window.innerHeight;
  const GAME_WIDTH = window.innerWidth;
  const GRAVITY = 6 * getResponsive;
  const SPEED = 13 * getResponsive;
  const FOODBALK_ARR = elements;

  const [phase, setPhase] = useState(1);
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

  function goToGame() {
    navigate(SCREENS.game);
  }

  function nextStep() {
    setPhase((phase) => phase + 1);
  }

  useEffect(() => {
    increment();
    setScore((score) => score + incrementScore);
  }, [display]);

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
      // navigate(SCREENS.result);
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

  return (
    <div className="bg-container tutorial" onClick={nextStep}>
      {phase === 1 && (
        <div className="mile mile1">
          <h1>WELCOME TO DOGGO IN THE DESERT!!</h1>
          <br></br>
          <h2>
            THIS IS THE TUTORIAL, YOU CAN SKIP IT AT ANY MOMENT JUST BY PRESSIN
            THE BUTTON THAT YOU CAN FIND IN THE BOTTOM-RIGHT CORNER OF YOU
            SCREEN
          </h2>
          <br></br>
          <h2> TO CONTINUE THE TUTORIAL, PRESS ANYWHERE ON YOU SCREEN</h2>
        </div>
      )}
      {phase === 2 && (
        <div className="mile mile2">
          <div className="food-container">
            {FOODBALK_ARR.map((element, key) => {
              return (
                element.obastacle === false && (
                  <div className={"legend"} key={key}>
                    <img src={element.img} />
                    <p> + {element.score}</p>
                  </div>
                )
              );
            })}
          </div>
          <h2>
            YOUR GOAL IS TO ANNOY CLEOPATRA AS MUCH AS YOU CAN BY PICKING UP
            FOOD
            <br></br>
            <br></br>
            THE TEASTIER THE FOOD, THE BETTER THE ANNOYMENT
            <br></br>
            <br></br>
            EACH TYPE OF FOOD HAS HIS OWN ANNOYING POWER, TO EAT THEM, YOU'LL
            NEED TO JUMP AND CATCH THEM
          </h2>
        </div>
      )}
      {phase === 3 && (
        <div className="mile mile2">
          <div className="food-container">
            {FOODBALK_ARR.map((element, key) => {
              return (
                element.obastacle === true && (
                  <div className={"legend obstacles"} key={key}>
                    <img src={element.img} />
                  </div>
                )
              );
            })}
          </div>
          <h2>
            THIS ARE THE ONLY OBSTACLES THAT WILL TRY TO DISTRUPT YOUR BRAVE
            QUEST
            <br></br>
            <br></br>
            IN ORDER TO AVOID THEM YOU'LL NEED TO JUMP BY PRESSING ANYWHERE ON
            YOUR SCREEN
            <br></br>
            <br></br>
            BUT BEWEARE, NOT ALL OBSTACLES ARE HIGH THE SAME, IN SOME CASES
            YOU'LL NEED TO TRY TO FLY
          </h2>
        </div>
      )}
      {phase === 4 && (
        <div className="mile">
          <h2>
            HERE YOU CAN SEE YOUR SCORE AND FOR HOW LONG YOU'VE BEEN PLAYING
            <br></br>
            <br></br>
            YOU ARE NOW READY TO TAKE ON THIS INCREDIBLY ANNOYING QUEST, GOOD
            LUCK AND HAVE FUN!
            <br></br>
            <br></br>
          </h2>

          <Button
            label={"PLAY!"}
            callBackClick={goToGame}
            objCss={{
              backgroundColor: "#ffcd4f",
              color: "#000",
              border: "1px #ffcd4f solid",
              fontSize: "16px",
              padding: "10px 20px",
              borderRadius: "3px",
              margin: "0 5px",
            }}
          />
        </div>
      )}
      <div className="layer layer-04"></div>
      <div className="layer layer-03"></div>
      <div className="layer layer-02"></div>
      <div className="layer layer-01"></div>
      <div className={`stats ${phase === 4 && "stats-active"}`}>
        <p>Doggo in the desert</p>
        <p>{score}</p>
        <p>angrymeter : {score}</p>
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
          style={{
            height: DOGGO_HEIGHT,
          }}
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
      <Button label={"PLAY!"} callBackClick={goToGame} classCss={"primary"} />
    </div>
  );
}
export default Tutorial;
