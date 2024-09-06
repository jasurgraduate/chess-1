import React from 'react';
import ChessGame from './game/ChessGame';
import './App.css'; // Import global CSS

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess | 1️⃣-side</h1>
      </header>
      <main className="App-content">
        <ChessGame />
      </main>
      <footer className="App-footer">
        <h1>Designed by <a href='https://jasurlive.uz'>jasurlive.uz</a>🟢</h1>
      </footer>
    </div>
  );
}

export default App;
