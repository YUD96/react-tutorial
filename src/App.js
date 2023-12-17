import { useState } from "react";
import {
  Box,
  Button,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

function Square({ value, onSquareClick }) {
  return (
    <Button
      className="square"
      sx={{
        height: "34px",
        fontSize: "24px",
        fontWeight: "bold",
        background: "#ffff",
        border: "1px solid #999",
        borderRadius: "0px",
      }}
      onClick={onSquareClick}
    >
      {value}
    </Button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "winner " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <Box className="status">{status}</Box>
      <Box className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </Box>
      <Box className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </Box>
      <Box className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </Box>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "GO to move #" + move;
    } else {
      description = "GO to game start";
    }

    return (
      <>
        {move === currentMove ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 1,
              py: 2,
              height: "50px",
              color: "red",
              backgroundColor: "#e0e0e0",
              border: "1px solid #999",
            }}
          >
            <Typography>You are at move #{move}</Typography>
          </Box>
        ) : (
          <ListItemButton
            key={move}
            sx={{
              backgroundColor: "#e0e0e0",
              border: "1px solid #999",
            }}
            onClick={() => jumpTo(move)}
          >
            <ListItemText primary={description} />
          </ListItemButton>
        )}
      </>
    );
  });

  return (
    <Box className="game">
      <Box className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </Box>
      <Box className="game-info">
        <ol>{moves}</ol>
      </Box>
    </Box>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
