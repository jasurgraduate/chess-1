import React from 'react';

const GameState = ({ game }) => {
  const status = () => {
    if (!game) {
      return 'Loading...';
    }

    // Check if the game state has the necessary methods
    const hasInCheck = typeof game.inCheck === 'function';
    const hasTurn = typeof game.turn === 'function';
    const hasIsCheckmate = typeof game.isCheckmate === 'function';
    const hasIsStalemate = typeof game.isStalemate === 'function';
    const hasIsInsufficientMaterial = typeof game.isInsufficientMaterial === 'function';
    const hasIsDraw = typeof game.isDraw === 'function';
    const hasIsThreefoldRepetition = typeof game.isThreefoldRepetition === 'function';

    // Checkmate
    if (hasIsCheckmate && game.isCheckmate()) {
      const isWhiteCheckmated = game.turn() === 'w';
      return isWhiteCheckmated ? 'Checkmate! ⚫Black wins!🎉' : 'Checkmate! ⚪White wins!🎉';
    }

    // Stalemate
    if (hasIsStalemate && game.isStalemate()) {
      return 'Stalemate! It\'s a draw';
    }

    // Insufficient material for checkmate
    if (hasIsInsufficientMaterial && game.isInsufficientMaterial()) {
      return 'Draw due to insufficient material';
    }

    // Threefold repetition
    if (hasIsThreefoldRepetition && game.isThreefoldRepetition()) {
      return 'Draw by threefold repetition';
    }

    // Any other draw situation
    if (hasIsDraw && game.isDraw()) {
      return 'Draw';
    }

    // In-check situation
    if (hasInCheck && game.inCheck()) {
      const isWhiteInCheck = game.turn() === 'w';
      return isWhiteInCheck ? 'White is in check!' : 'Black is in check!';
    }

    // Default case: whose turn is it
    if (hasTurn) {
      const isWhiteToMove = game.turn() === 'w';
      return isWhiteToMove ? '🔼 White to Move' : '🔽 Black to Move';
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
