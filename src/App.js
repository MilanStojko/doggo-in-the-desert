import logo from './logo.svg';
import './app.scss';

import { Routes, Route } from 'react-router-dom';

import Home from './screens/home/Home';
import Login from './screens/login/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
