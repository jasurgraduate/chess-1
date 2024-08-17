// src/game/GameState.js
import React from 'react';

const GameState = ({ game }) => {
  const status = () => {
    if (!game) {
      return 'Loading...';
    }

    // Ensure game object methods exist
    const hasGameOver = typeof game.game_over === 'function';
    const hasInCheckmate = typeof game.in_checkmate === 'function';
    const hasInCheck = typeof game.in_check === 'function';
    const hasTurn = typeof game.turn === 'function';

    if (hasGameOver && game.game_over()) {
      if (hasInCheckmate && game.in_checkmate()) {
        return 'Checkmate';
      }
      return 'Draw';
    }

    if (hasInCheck && game.in_check()) {
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
