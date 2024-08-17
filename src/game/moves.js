import { playSound } from './sound';

// Move handling function
export const handleDrop = (game, setFen, setError) => (sourceSquare, targetSquare, piece) => {
  try {
    const promotionPiece = piece[1] && ['q', 'r', 'b', 'n'].includes(piece[1].toLowerCase())
      ? piece[1].toLowerCase()
      : 'q'; // Default to Queen if invalid

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: promotionPiece,
    });

    if (move === null) {
      setError('Invalid move');
      playSound('error');
      return false;
    }

    if (move.promotion) {
      playSound('promote'); // Play the promotion sound
    } else if (move.captured) {
      playSound('capture');
    } else {
      playSound('move');
    }

    if (game.inCheck()) {
      playSound('check');
    }

    setFen(game.fen());
    setError('');
    return true;
  } catch (err) {
    console.error('Error in move:', err);
    // Only set the error message and play sound if it's not a promotion error
    if (!err.message.includes('promotion')) {
      setError('Incorrect move');
      playSound('error');
    }
    return false;
  }
};
