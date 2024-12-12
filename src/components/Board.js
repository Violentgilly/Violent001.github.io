import React from 'react';
import Square from './Square';

function Board({ board, onClick, winningLine }) {
  const renderSquare = (i) => {
    return <Square value={board[i]} onClick={() => onClick(i)} isWinning={winningLine && winningLine.some(([x, y]) => x * 15 + y === i)} />;
  };

  const rows = [];
  for (let i = 0; i < 15; i++) {
    const squares = [];
    for (let j = 0; j < 15; j++) {
      squares.push(renderSquare(i * 15 + j));
    }
    rows.push(<div key={i} className="board-row">{squares}</div>);
  }

  return <div>{rows}</div>;
}

export default Board;
