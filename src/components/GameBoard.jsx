import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialBoard = Array(9).fill(null);

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

function GameBoard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { player1, player2 } = location.state;

  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [playerStats, setPlayerStats] = useState({
    [player1]: { wins: 0, draws: 0 },
    [player2]: { wins: 0, draws: 0 },
  });
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  useEffect(() => {
    const gameWinner = calculateWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      updateStats(gameWinner);
    } else if (!board.includes(null)) {
      setWinner('Draw');
      updateStats('Draw');
    }
  }, [board]);

  const updateStats = (result) => {
    const updatedStats = { ...playerStats };
    if (result === 'Draw') {
      updatedStats[player1].draws += 1;
      updatedStats[player2].draws += 1;
    } else {
      const winnerPlayer = result === 'X' ? player1 : player2;
      updatedStats[winnerPlayer].wins += 1;
    }
    setPlayerStats(updatedStats);
  };

  const handleEndGame = async () => {
    setLoading(true);
    const winnerName = winner === 'X' ? player1 : winner === 'O' ? player2 : 'Draw';
    const gameRecord = { player1, player2, winner: winnerName, date: new Date().toISOString() };

    try {
      const newHistory = [...gameHistory, gameRecord];
      await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/games`, newHistory);
      console.log('Game data saved successfully');
      setGameHistory([]);
      setBoard(initialBoard);
      setXIsNext(true);
      setWinner(null);
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.error('Error saving game data:', error);
      setLoading(false);
    }
  };
  
  const handleContinue = () => {
    const winnerName = winner === 'X' ? player1 : winner === 'O' ? player2 : 'Draw';
    const gameRecord = { player1, player2, winner: winnerName, date: new Date().toISOString() };
    setGameHistory([...gameHistory, gameRecord]);
    setBoard(initialBoard);
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div>
        <p>Player 1: {player1} (X) - Wins: {playerStats[player1].wins}, Draws: {playerStats[player1].draws}</p>
        <p>Player 2: {player2} (O) - Wins: {playerStats[player2].wins}, Draws: {playerStats[player2].draws}</p>
        <div>
          {board.map((value, index) => (
            <React.Fragment key={index}>
              {index % 3 === 0 && <br />}
              <button 
                onClick={() => handleClick(index)} 
                style={{ width: '50px', height: '50px', margin: '5px', border: '1px solid #d4d4d4' }}
              >
                {value}
              </button>
            </React.Fragment>
          ))}
        </div>
        {winner && (
          <div>
            <p>{winner === 'Draw' ? "It's a draw!" : `Winner: ${winner === 'X' ? player1 : player2} (${winner})`}</p>
            <button onClick={handleContinue}>Continue</button>
            <button onClick={handleEndGame} disabled={loading}>
              {loading ? 'Saving...' : 'Stop'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameBoard;
