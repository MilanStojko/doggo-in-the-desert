import logo from './logo.svg';
import './app.scss';

import { Routes, Route } from 'react-router-dom';

import SCREENS from './route/router';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Tutorial from './screens/tutorial/Tutorial';

function App() {
  return (
    <div>
      <Routes>
        <Route path={SCREENS.home} element={<Home />}/>
        <Route path={SCREENS.login} element={<Login />}/>
        <Route path={SCREENS.signup} element={<Login />}/>
        <Route path={SCREENS.tutorial} element={<Tutorial />}/>
        <Route path={SCREENS.game} element={<Login />}/>
        <Route path={SCREENS.result} element={<Login />}/>
        <Route path={SCREENS.leaderboard} element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
