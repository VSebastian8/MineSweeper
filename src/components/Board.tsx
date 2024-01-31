import Square from "./Square";
import { useState, useEffect } from "react";

interface Props {
  columns?: number;
  rows?: number;
  squareSize?: number;
}

export default function Board({
  columns = 5,
  rows = 5,
  squareSize = 50,
}: Props) {
  const [board, setBoard] = useState<JSX.Element[]>([]);

  const generateBoard = () => {
    const board = [];
    for (let i = 0; i < rows; i++)
      for (let j = 0; j < columns; j++)
        board.push(
          <Square
            size={squareSize}
            key={(i * columns + j).toString()}
            bombs={i + j}
          />
        );
    return board;
  };

  useEffect(() => {
    const bd = generateBoard();
    setBoard(bd);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        height: rows * squareSize + "px",
        width: columns * squareSize + "px",
        gridTemplateColumns: `repeat(${columns}, ${squareSize}px)`,
        gridTemplateRows: `repeat(${rows},  ${squareSize}px)`,
      }}
    >
      {board}
    </div>
  );
}
