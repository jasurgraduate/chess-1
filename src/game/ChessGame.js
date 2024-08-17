import React, { useState, useMemo, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import Error from './error';
import { Chess } from 'chess.js';
import GameState from './gameState';
import { handleDrop } from './moves';
import { useClickHandling } from './click';
import './ChessGame.css';

const ChessGame = () => {
  const [fen, setFen] = useState(new Chess().fen());
  const [error, setError] = useState('');
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);

  const {
    game,
    onSquareClick,
    onSquareRightClick,
    onPromotionPieceSelect,
    showPromotionDialog,
    optionSquares,
    rightClickedSquares,
    moveTo
  } = useClickHandling(setFen);

  // Update turn after each move
  useEffect(() => {
    const turn = game.turn();
    setIsWhiteTurn(turn === 'w');

    // Add rotation effect
    const wrapper = document.querySelector('.chessboard-wrapper');
    wrapper.classList.add('rotating');

    const timeout = setTimeout(() => {
      wrapper.classList.remove('rotating');
    }, 500); // Duration matches the CSS transition time

    return () => clearTimeout(timeout);
  }, [fen, game]);

  const onDrop = (sourceSquare, targetSquare) => {
    handleDrop(game, setFen, setError)(sourceSquare, targetSquare);
  };

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
            transform: isWhiteTurn ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        />
      );
    });
    return pieceComponents;
  }, [isWhiteTurn]);

  const customDarkSquareStyle = {
    backgroundColor: '#779556',
  };

  const customLightSquareStyle = {
    backgroundColor: '#ebecd0',
  };

  return (
    <div className="chessboard-container">
      <Error message={error} />
      <GameState game={game} />
      <div
        className="chessboard-wrapper"
        style={{
          transform: isWhiteTurn ? 'rotate(0deg)' : 'rotate(180deg)',
        }}
      >
        <Chessboard
          position={fen}
          onPieceDrop={onDrop}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          onPromotionPieceSelect={onPromotionPieceSelect}
          customPieces={customPieces}
          style={{
            backgroundColor: '#f0d9b5',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          customDarkSquareStyle={customDarkSquareStyle}
          customLightSquareStyle={customLightSquareStyle}
          customSquareStyles={{
            ...optionSquares,
            ...rightClickedSquares,
          }}
          promotionToSquare={moveTo}
          showPromotionDialog={showPromotionDialog}
        />
      </div>
    </div>
  );
};

export default ChessGame;
