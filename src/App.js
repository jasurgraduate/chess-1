import React from 'react';
import ChessGame from './game/ChessGame';
import './App.css'; // Import global CSS

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess Game</h1>
      </header>
      <main className="App-content">
        <ChessGame />
      </main>
      <footer className="App-footer">
        <h1>Made in China 😁😹</h1>
      </footer>
    </div>
  );
}

export default App;
