import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/games`)
      .then((response) => {
        setGames(response.data);
        setLoading(false);
      })
      .catch(() => {
        // Handle errors if needed
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Previous Games</h1>
      {games.length === 0 ? (
        <p>No games available.</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.id}>{`${game.player1} (X) vs ${game.player2} (O) - Winner: `}
              <>
              {game.winner ? (
                <b>{
                    game.player1 === game.winner 
                      ? game.player1 + " (X)" 
                      : game.player2 === game.winner ? game.player2 + " (O)" : game.winner
                  }
                </b>
              ) : null}
              </>
            </li>
          ))}
        </ul>
      )}
      <Link to="/new-game">
        <button style={{marginTop: '15px'}}>Start New Game</button>
      </Link>
    </div>
  );
}

export default HomePage;
