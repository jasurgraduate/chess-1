import React from 'react';

const GameOverState = ({ game }) => {
  const gameOverMessage = () => {
    if (!game) {
      return 'Loading...';
    }

    // Ensure methods exist
    const hasCheckmate = typeof game.isCheckmate === 'function';
    const hasStalemate = typeof game.isStalemate === 'function';
    const hasDraw = typeof game.isDraw === 'function';

    // Check for checkmate first
    if (hasCheckmate && game.isCheckmate()) {
      return 'Checkmate';
    }

    // Check for stalemate or draw conditions
    if (hasStalemate && game.isStalemate()) {
      return 'Stalemate';
    }
    if (hasDraw && game.isDraw()) {
      return 'Draw';
    }

    return null;
  };

  const message = gameOverMessage();
  if (!message) {
    return null;
  }

  return (
    <div className="game-over-state">
      {message}
    </div>
  );
};

export default GameOverState;
