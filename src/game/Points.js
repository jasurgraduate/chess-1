import React from 'react';
import './ChessGame.css';

const pieceValues = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0, // The king is not considered in point calculation since it can't be captured
};

const pieceImages = {
  wP: 'wP.png',
  wN: 'wN.png',
  wB: 'wB.png',
  wR: 'wR.png',
  wQ: 'wQ.png',
  bP: 'bP.png',
  bN: 'bN.png',
  bB: 'bB.png',
  bR: 'bR.png',
  bQ: 'bQ.png',
};

const Points = ({ capturedPieces }) => {
  const calculatePoints = pieces => {
    return pieces.reduce((total, piece) => {
      const pieceType = piece.charAt(1).toLowerCase();
      return total + (pieceValues[pieceType] || 0);
    }, 0);
  };

  const whitePoints = calculatePoints(capturedPieces.black);
  const blackPoints = calculatePoints(capturedPieces.white);

  return (
    <div className="points-container">
      <div className="points white-points">
        {capturedPieces.white.map((piece, index) => (
          <img
            key={index}
            src={`/chess-1/img/${pieceImages[piece]}`}
            alt={piece}
            className="captured-piece"
          />
        ))}
        <span className="points-value">+{whitePoints}</span>
      </div>
      <div className="points black-points">
        {capturedPieces.black.map((piece, index) => (
          <img
            key={index}
            src={`/chess-1/img/${pieceImages[piece]}`}
            alt={piece}
            className="captured-piece"
          />
        ))}
        <span className="points-value">+{blackPoints}</span>
      </div>
    </div>
  );
};

export default Points;
