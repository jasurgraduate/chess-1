import React, { useState, useMemo, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import Error from './error';
import { Chess } from 'chess.js';
import GameOverState from './GameOverState'; // Import GameOverState component
import GameState from './gameState';
import { handleDrop } from './moves';
import { useClickHandling } from './click';
import './ChessGame.css';

const ChessGame = () => {
  const [fen, setFen] = useState(new Chess().fen()); // Initialize with the starting FEN
  const [error, setError] = useState('');
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [showGameOver, setShowGameOver] = useState(false); // Track GameOverState visibility
  const [isGameOverMinimized, setIsGameOverMinimized] = useState(false); // New state for minimizing

  const {
    game,
    onSquareClick,
    onSquareRightClick,
    onPromotionPieceSelect,
    showPromotionDialog,
    optionSquares,
    rightClickedSquares,
    moveTo
  } = useClickHandling(setFen); // Pass setFen here

  useEffect(() => {
    const turn = game.turn();
    setIsWhiteTurn(turn === 'w');

    const isGameOver = game.isCheckmate() || game.isStalemate() || game.isDraw();
    setShowGameOver(isGameOver); // Show GameOverState if the game is over

    // Rotation effect for the chessboard
    const wrapper = document.querySelector('.chessboard-wrapper');
    wrapper.classList.add('rotating');

    const timeout = setTimeout(() => {
      wrapper.classList.remove('rotating');
    }, 500); // Duration matches the CSS transition time

    return () => clearTimeout(timeout);
  }, [fen, game]);

  const onDrop = handleDrop(game, setFen, setError); // Handle piece drops

  // Custom pieces for the chessboard
  const customPieces = useMemo(() => {
    const pieces = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];
    const pieceComponents = {};
    pieces.forEach(piece => {
      pieceComponents[piece] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(/chess-1/img/${piece}.png)`,
            backgroundSize: "100%",
          }}
        />
      );
    });
    return pieceComponents;
  }, []);

  // Custom board styles
  const customDarkSquareStyle = {
    backgroundColor: '#779556',
  };

  const customLightSquareStyle = {
    backgroundColor: '#ebecd0',
  };

  return (
    <div className="chessboard-container">
      {/* Display any errors */}
      <Error message={error} />
      {/* Display game state */}
      <GameState game={game} />
      {/* Conditionally render GameOverState based on showGameOver state */}
      {showGameOver && (
        <GameOverState 
          game={game} 
          onClose={() => setShowGameOver(false)} // Handle close
          isMinimized={isGameOverMinimized} // Pass minimize state
          onMinimize={() => setIsGameOverMinimized(!isGameOverMinimized)} // Toggle minimize
        />
      )}
      {/* Chessboard component */}
      <div className={`chessboard-wrapper ${isWhiteTurn ? 'white-turn' : 'black-turn'}`}>
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          onPromotionPieceSelect={onPromotionPieceSelect}
          customPieces={customPieces}
          customDarkSquareStyle={customDarkSquareStyle}
          customLightSquareStyle={customLightSquareStyle}
          customSquareStyles={{
            ...optionSquares,
            ...rightClickedSquares
          }}
          promotionToSquare={moveTo}
          showPromotionDialog={showPromotionDialog}
          boardOrientation={isWhiteTurn ? 'white' : 'black'} // Rotates the board based on turn
        />
      </div>
    </div>
  );
};

export default ChessGame;
