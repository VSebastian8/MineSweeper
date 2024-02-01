import Square from "./Square";
import { useState, useEffect } from "react";

interface Props {
  columns?: number;
  rows?: number;
  squareSize?: number;
  bombNumber?: number;
  refresh?: boolean;
  retry?: boolean;
}

export default function Board({
  columns = 5,
  rows = 5,
  squareSize = 50,
  bombNumber = 12,
  refresh = true,
  retry = true,
}: Props) {
  const [board, setBoard] = useState<number[][]>([]);
  const [boardShow, setBoardShow] = useState<boolean[][]>([]);
  const [tiles, setTiles] = useState<JSX.Element[]>([]);

  const expand = (i: number, j: number, newBoardShow: boolean[][]) => {
    const neighbours = [
      [i - 1, j - 1],
      [i - 1, j],
      [i - 1, j + 1],
      [i, j - 1],
      [i, j + 1],
      [i + 1, j - 1],
      [i + 1, j],
      [i + 1, j + 1],
    ];
    for (let n of neighbours) {
      if (n[0] >= 0 && n[0] < rows && n[1] >= 0 && n[1] < columns) {
        if (!newBoardShow[n[0]][n[1]]) {
          newBoardShow[n[0]][n[1]] = true;
          if (board[n[0]][n[1]] == 0) expand(n[0], n[1], newBoardShow);
        }
      }
    }
  };

  const revealSquare = (i: number, j: number) => {
    let newBoardShow = [...boardShow];
    newBoardShow[i][j] = true;
    if (board[i][j] == -1) console.log("Game Over");
    if (board[i][j] == 0) expand(i, j, newBoardShow);

    setBoardShow(newBoardShow);
  };

  const bombNeighbours = (i: number, j: number, randomBoard: number[][]) => {
    const neighbours = [
      [i - 1, j - 1],
      [i - 1, j],
      [i - 1, j + 1],
      [i, j - 1],
      [i, j + 1],
      [i + 1, j - 1],
      [i + 1, j],
      [i + 1, j + 1],
    ];
    let score = 0;
    for (let n of neighbours) {
      if (n[0] >= 0 && n[0] < rows && n[1] >= 0 && n[1] < columns)
        if (randomBoard[n[0]][n[1]] == -1) score++;
    }
    return score;
  };

  const hideTiles = () => {
    let newBoardShow = [];
    for (let i = 0; i < rows; i++) {
      let boardShowRow = [];
      for (let j = 0; j < rows; j++) {
        boardShowRow.push(false);
      }
      newBoardShow.push(boardShowRow);
    }
    setBoardShow(newBoardShow);
  };

  const generateBoard = () => {
    let randomBoard = [];
    let possibleBombs = [];

    for (let i = 0; i < rows; i++) {
      let boardRow = [];
      for (let j = 0; j < columns; j++) {
        boardRow.push(0);
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

    for (let i = 0; i < rows; i++)
      for (let j = 0; j < columns; j++)
        if (randomBoard[i][j] != -1)
          randomBoard[i][j] = bombNeighbours(i, j, randomBoard);

    setBoard(randomBoard);
  };

  const generateTiles = () => {
    const newTiles = [];

    for (let i = 0; i < rows; i++)
      for (let j = 0; j < columns; j++)
        newTiles.push(
          <Square
            key={(i * columns + j).toString()}
            size={squareSize}
            bombs={board[i][j]}
            i={i}
            j={j}
            hidden={!boardShow[i][j]}
            clickSquare={revealSquare}
            lockRefresh={refresh == retry}
          />
        );

    setTiles(newTiles);
  };

  useEffect(() => {
    hideTiles();
    generateBoard();
  }, [refresh]);

  useEffect(() => {
    hideTiles();
  }, [retry]);

  useEffect(() => {
    if (board.length > 0) generateTiles();
  }, [board, boardShow]);

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
