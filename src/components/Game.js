import React, { useState } from 'react';
import Board from './Board';

// 判断是否有获胜者
function calculateWinner(board) {
  const directions = [
    { x: 1, y: 0 }, // 水平
    { x: 0, y: 1 }, // 垂直
    { x: 1, y: 1 }, // 右下对角线
    { x: 1, y: -1 }, // 左下对角线
  ];

  const checkLine = (x, y, dx, dy, player) => {
    let count = 0;
    for (let i = -4; i <= 4; i++) {
      const nx = x + dx * i;
      const ny = y + dy * i;
      if (nx >= 0 && nx < 15 && ny >= 0 && ny < 15 && board[nx * 15 + ny] === player) {
        count++;
      } else {
        count = 0;
      }
      if (count === 5) {
        return true;
      }
    }
    return false;
  };

  for (let x = 0; x < 15; x++) {
    for (let y = 0; y < 15; y++) {
      const player = board[x * 15 + y];
      if (player) {
        for (const { x: dx, y: dy } of directions) {
          if (checkLine(x, y, dx, dy, player)) {
            return player;
          }
        }
      }
    }
  }

  return null;
}

function Game() {
  const [history, setHistory] = useState([{
    board: Array(225).fill(null), // 15x15 的棋盘
    lastMove: null // 记录每一步的坐标
  }]); 
  const [stepNumber, setStepNumber] = useState(0); // 当前步数
  const [xIsNext, setXIsNext] = useState(true); // 判断下一个玩家是X还是O

  const currentHistory = history[stepNumber]; // 当前历史
  const currentBoard = currentHistory.board; // 当前棋盘状态
  const winner = calculateWinner(currentBoard); // 判断是否有胜者

  const handleClick = (i) => {
    const boardCopy = currentBoard.slice();
    if (winner || boardCopy[i]) return; // 如果已经有胜者或格子已被占用，返回

    const row = Math.floor(i / 15);
    const col = i % 15;
    
    boardCopy[i] = xIsNext ? 'X' : 'O';
    const newHistory = history.slice(0, stepNumber + 1); // 保留之前的历史记录，防止“回到某步”时，未来的步骤丢失
    setHistory(newHistory.concat([{ board: boardCopy, lastMove: { row, col } }])); // 添加新的棋盘状态和坐标到历史记录
    setStepNumber(newHistory.length); // 增加步骤
    setXIsNext(!xIsNext); // 切换玩家
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  // 生成历史记录的步骤按钮，显示坐标信息
  const moves = history.slice(1).map((step, move) => {
    const { lastMove } = step;
    const desc = `Go to move #${move} (${lastMove.row}, ${lastMove.col})`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (stepNumber === 225) {
    status = 'Game Draw';
  } else {
    status = `下一位棋手: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <h1>五子棋</h1>
      <div className="status">{status}</div>
      <Board board={currentBoard} onClick={handleClick} />
      <div className="history-container">
        <ol>{moves}</ol>
      </div>
      <button onClick={() => jumpTo(0)}>开始游戏</button>
    </div>
  );
}

export default Game;
