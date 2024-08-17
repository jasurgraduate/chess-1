import React from 'react';
import './ChessGame.css'; // Import CSS

const Chessboard = ({ position, onPieceDrop }) => {
  return (
    <div className="chessboard">
      {[...Array(8).keys()].map(row => (
        <React.Fragment key={row}>
          {[...Array(8).keys()].map(col => {
            const square = `${String.fromCharCode(97 + col)}${8 - row}`;
            const squareColor = (row + col) % 2 === 0 ? 'light' : 'dark';
            return (
              <div
                key={col}
                className={`chessboard-square ${squareColor}`}
                onDrop={(e) => onPieceDrop(e, square)}
                onDragOver={(e) => e.preventDefault()}
              >
                {/* Render the piece */}
                {position[square] && (
                  <img
                    src={`/chess-pro/img/${position[square]}.png`}
                    alt={position[square]}
                    className="chess-piece"
                  />
                )}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Chessboard;
