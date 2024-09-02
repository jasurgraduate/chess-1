import React from 'react';

const GameState = ({ game }) => {
  const status = () => {
    if (!game) {
      return 'Loading...';
    }

    const hasInCheck = typeof game.inCheck === 'function';
    const hasTurn = typeof game.turn === 'function';

    if (hasInCheck && game.inCheck()) {
      return 'Check';
    }

    if (hasTurn) {
      const isWhiteToMove = game.turn() === 'w';
      return isWhiteToMove ? 'White to Move' : 'Black to Move';
    }

    return 'Error: Game state cannot be determined';
  };

  return (
    <div className="game-state">
      {status()}
    </div>
  );
};

export default GameState;
