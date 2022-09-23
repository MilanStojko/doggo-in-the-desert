import logo from "./logo.svg";
import "./app.scss";

import { Routes, Route } from "react-router-dom";
import DeviceOrientation, { Orientation } from "react-screen-orientation";

import SCREENS from "./route/router";
import Home from "./screens/home/Home";
import Game from "./screens/game/Game";
import Leaderboard from "./screens/leaderboard/Leaderboard";
import Login from "./screens/login/Login";
import Result from "./screens/result/Result";
import Signup from "./screens/signup/Signup";
import Tutorial from "./screens/tutorial/Tutorial";

function App() {
  // screen.orientation.lock('landscape-primary')

  return (
    <div>
      <DeviceOrientation lockOrientation={"landscape"}>
        <Orientation orientation="landscape" alwaysRender={false}>
          <Routes>
            <Route path={SCREENS.home} element={<Home />} />
            <Route path={SCREENS.login} element={<Login />} />
            <Route path={SCREENS.signup} element={<Signup />} />
            <Route path={SCREENS.tutorial} element={<Tutorial />} />
            <Route path={SCREENS.game} element={<Game />} />
            <Route path={SCREENS.result} element={<Result />} />
            <Route path={SCREENS.leaderboard} element={<Leaderboard />} />
          </Routes>
        </Orientation>
        <Orientation orientation="portrait">
          <div className="portrait-view">
            <h1>Please rotate your device</h1>
          </div>
        </Orientation>
      </DeviceOrientation>
    </div>
  );
}

export default App;
