import { Button } from "@mui/material";

interface SquareProps {
  value: string;
  onSquareClick: () => void;
}

export default function Square({ value, onSquareClick }: SquareProps) {
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
