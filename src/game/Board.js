import { Box } from "@mui/material";
import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
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

  const board = [...Array(3)].map((_, i) => {
    let threeSquares = [...Array(3)].map((_, j) => {
      let n = 3 * i + j;
      return (
        <Square
          key={n}
          value={squares[n]}
          onSquareClick={() => handleClick(n)}
        />
      );
    });
    return (
      <Box key={i} className="box-row">
        {threeSquares}
      </Box>
    );
  });

  return (
    <>
      <Box className="status">{status}</Box>
      {board}
    </>
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
