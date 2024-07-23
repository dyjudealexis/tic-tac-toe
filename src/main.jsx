import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'

import HomePage from './components/HomePage';
import NewGameSession from './components/NewGameSession';
import GameBoard from './components/GameBoard';

const router = createBrowserRouter([
  {path: '/', element: <HomePage />},
  {path: '/new-game', element: <NewGameSession />},
  {path: '/game', element: <GameBoard />},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
