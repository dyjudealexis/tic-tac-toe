import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import NewGameSession from './components/NewGameSession';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-game" element={<NewGameSession />} />
          <Route path="/game" element={<GameBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
