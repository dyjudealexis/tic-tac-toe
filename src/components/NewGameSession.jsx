import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewGameSession() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const startGame = () => {
    if (!player1 || !player2) {
      setError('Both player names are required');
      return;
    }
    if (player1 === player2) {
      setError('Player 1 and Player 2 cannot have the same name');
      return;
    }
    setError('');
    navigate('/game', { state: { player1, player2 } });
  };

  return (
    <div>
      <h1>New Game</h1>
      <input
        type="text"
        style={{ padding: '10px', borderRadius: '100px', marginBottom: '10px', border: '1px solid #d4d4d4' }}
        placeholder="Player 1 Name"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />
      <br />
      <input
        type="text"
        style={{ padding: '10px', borderRadius: '100px', marginBottom: '10px', border: '1px solid #d4d4d4' }}
        placeholder="Player 2 Name"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
      />
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={startGame}>Start</button>
    </div>
  );
}

export default NewGameSession;
