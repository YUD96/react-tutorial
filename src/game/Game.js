import { useState } from "react";
import {
  Box,
  FormControlLabel,
  FormLabel,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAsc, setIsAsc] = useState(true);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleSortButtonClick(ascending) {
    ascending === true ? setIsAsc(true) : setIsAsc(false);
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
      <Box key={move}>
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
      </Box>
    );
  });

  if (!isAsc) moves.reverse();
  return (
    <Box className="game">
      <Box className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </Box>
      <Box className="game-info">
        <Box sx={{ pl: 5 }} className="sort-toggle">
          <FormLabel id="demo-row-radio-buttons-group-label">並び順</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="昇順"
              control={<Radio />}
              label="昇順"
              onChange={() => handleSortButtonClick(true)}
            />

            <FormControlLabel
              value="降順"
              control={<Radio />}
              label="降順"
              onChange={() => handleSortButtonClick(false)}
            />
          </RadioGroup>
        </Box>
        <ol>{moves}</ol>
      </Box>
    </Box>
  );
}
