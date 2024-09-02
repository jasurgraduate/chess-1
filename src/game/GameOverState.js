import React from 'react';

const GameOverState = ({ game, onClose, onRevenge }) => {
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
    if (typeof onRevenge === 'function') {
      onRevenge(); // This should reset the game state or start a new game
    }
  };

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose(); // This should close the modal or current window
    }
  };

  const message = gameOverMessage();
  if (!message) {
    return null;
  }

  return (
    <div className="game-over-state">
      <button className="close-button" onClick={handleClose}>X Close</button>
      <div className="game-over-message">
        {message}
      </div>
      <button className="revenge-button" onClick={handleRevenge}>🔁 REVENGE?</button>
    </div>
  );
};

export default GameOverState;
