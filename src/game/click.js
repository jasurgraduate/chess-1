import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import { playSound } from './sound';

export function useClickHandling(setFen) {
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState("");
  const [moveTo, setMoveTo] = useState(null);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [optionSquares, setOptionSquares] = useState({});
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [error, setError] = useState('');

  const handleMove = useCallback(
    (sourceSquare, targetSquare, promotionPiece) => {
      try {
        const move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: promotionPiece || 'q', // Default to Queen if promotion is not specified
        });

        if (move === null) {
          setError('Invalid move');
          playSound('error');
          return false;
        }

        if (move.captured) {
          playSound('capture');
        } else {
          playSound('move');
        }

        if (game.inCheck()) {
          playSound('check');
        }

        const newFen = game.fen();
        setFen(newFen); // Update FEN here
        setGame(new Chess(newFen)); // Update the game state with the new FEN
        setError('');
        return true;
      } catch (err) {
        console.error('Error in move:', err);
        setError('Error performing move');
        playSound('error');
        return false;
      }
    },
    [game, setFen]
  );

  function getMoveOptions(square) {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }
    const newSquares = {};
    moves.forEach(move => {
      newSquares[move.to] = {
        background: game.get(move.to) && game.get(move.to).color !== game.get(square).color
          ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
          : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    });
    newSquares[square] = { background: "rgba(255, 255, 0, 0.4)" };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square) {
    if (!moveFrom) {
      // No piece has been selected yet
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) {
        setMoveFrom(square);
        setError(''); // Clear error if a valid piece is selected
      } else {
        setError('No valid moves for this piece');
        // Error sound should be played only if a piece is selected
        
      }
      return;
    }

    if (!moveTo) {
      // Piece has been selected
      const moves = game.moves({ from: moveFrom, verbose: true });
      const foundMove = moves.find(m => m.from === moveFrom && m.to === square);

      if (!foundMove) {
        // Invalid move after selecting a piece
        const hasMoveOptions = getMoveOptions(square);
        setMoveFrom(hasMoveOptions ? square : "");
        setError('Invalid move');
        playSound('error'); // Play error sound only if a piece has been selected
        return;
      }

      setMoveTo(square);

      // Handle promotion
      if (
        (foundMove.color === "w" && foundMove.piece === "p" && square[1] === "8") ||
        (foundMove.color === "b" && foundMove.piece === "p" && square[1] === "1")
      ) {
        playSound('promote'); // Play the promotion sound
        setShowPromotionDialog(true);
        return;
      }

      const moveResult = handleMove(moveFrom, square);
      if (moveResult) {
        setMoveFrom("");
        setMoveTo(null);
        setOptionSquares({});
      } else {
        setMoveFrom("");
        setMoveTo(null);
        setOptionSquares({});
      }
      return;
    }
  }

  function onPromotionPieceSelect(piece) {
    if (piece) {
      handleMove(moveFrom, moveTo, piece[1].toLowerCase() ?? "q");
    }
    setMoveFrom("");
    setMoveTo(null);
    setShowPromotionDialog(false);
    setOptionSquares({});
    return true;
  }

  function onSquareRightClick(square) {
    const colour = "rgba(0, 0, 255, 0.4)";
    setRightClickedSquares(prev => ({
      ...prev,
      [square]: prev[square] && prev[square].backgroundColor === colour ? undefined : { backgroundColor: colour }
    }));
  }

  return {
    game,
    onSquareClick,
    onSquareRightClick,
    onPromotionPieceSelect,
    showPromotionDialog,
    optionSquares,
    rightClickedSquares,
    moveTo,
    error
  };
}
