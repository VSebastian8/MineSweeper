import Square from "./Square";
import { useState, useEffect } from "react";

interface Props {
  columns?: number;
  rows?: number;
  squareSize?: number;
  bombNumber?: number;
}

export default function Board({
  columns = 5,
  rows = 5,
  squareSize = 50,
  bombNumber = 12,
}: Props) {
  const [board, setBoard] = useState<number[][]>([]);
  const [tiles, setTiles] = useState<JSX.Element[]>([]);

  const revealSquare = () => {
    console.log("ok");
  };

  const generateBoard = () => {
    const randomBoard = [];
    const possibleBombs = [];

    for (let i = 0; i < rows; i++) {
      const boardRow = [];
      for (let j = 0; j < columns; j++) {
        boardRow.push(1);
        possibleBombs.push(i * columns + j);
      }
      randomBoard.push(boardRow);
    }

    const actualBombs = possibleBombs
      .sort(() => 0.5 - Math.random())
      .slice(0, bombNumber);
    for (const bomb of actualBombs) {
      randomBoard[Math.floor(bomb / columns)][bomb % columns] = -1;
    }

    setBoard(randomBoard);
  };

  const generateTiles = () => {
    const newTiles = [];

    for (let i = 0; i < rows; i++)
      for (let j = 0; j < columns; j++)
        newTiles.push(
          <Square
            size={squareSize}
            key={(i * columns + j).toString()}
            bombs={board[i][j]}
            clickSquare={revealSquare}
          />
        );

    setTiles(newTiles);
  };

  useEffect(() => {
    generateBoard();
  }, []);

  useEffect(() => {
    if (board.length > 0) generateTiles();
  }, [board]);

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
      {tiles}
    </div>
  );
}
