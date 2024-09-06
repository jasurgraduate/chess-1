import React from 'react';
import './ChessGame.css'; // Import the CSS file for styling

const GameOverState = ({ game, onClose, isMinimized, onMinimize }) => {
  const gameOverMessage = () => {
    if (!game) {
      return 'Loading...';
    }

    const hasCheckmate = typeof game.isCheckmate === 'function';
    const hasStalemate = typeof game.isStalemate === 'function';
    const hasDraw = typeof game.isDraw === 'function';

    if (hasCheckmate && game.isCheckmate()) {
      const winner = game.turn() === 'w' ? 'Black' : 'White';
      const kingImage = game.turn() === 'w' ? 'chess-1/img/bK.png' : 'chess-1/img/wK.png';
      return (
        <div>
          <div className="king-image-container">
            <img src={kingImage} alt={`${winner} King`} className="king-image" />
          </div>
          {`Checkmate! ${winner.toUpperCase()} WON! 🏆`}
        </div>
      );
    }

    if (hasStalemate && game.isStalemate()) {
      return 'Stalemate!';
    }
    if (hasDraw && game.isDraw()) {
      return 'Draw!';
    }

    return null;
  };

  const handleRevenge = () => {
    // Refreshes the page to start a new game
    window.location.reload(); 
  };

  const message = gameOverMessage();
  if (!message) {
    return null;
  }

  return (
    <div className={`game-over-overlay ${isMinimized ? 'minimized' : ''}`}>
      <div className="game-over-state">
        <div className="game-over-header">
          <button className="minimize-button" onClick={onMinimize}>
            {isMinimized ? '🟪 Expand' : '➖ Minimize'}
          </button>
          <button className="close-button" onClick={onClose}>❎</button>
        </div>
        {!isMinimized && (
          <div className="game-over-message">
            {message}
            {/* Add the "REVENGE?" button */}
            <div className="revenge-button-container">
              <button className="revenge-button" onClick={handleRevenge}>⚒️ REVENGE? 💪🏻</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameOverState;
