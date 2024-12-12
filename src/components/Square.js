import React from 'react';

function Square({ value, onClick, isWinning }) {
  const pieceStyle = {
    color: value === 'X' ? '#E53E3E' : '#3E8E3E',
    fontSize: '24px',
    fontWeight: 'bold',
    backgroundColor: isWinning ? '#FFD700' : '#f8f8f8',  // 黄金色表示获胜的棋子
  };

  return (
    <button className="square" onClick={onClick} style={pieceStyle}>
      {value}
    </button>
  );
}

export default Square;
