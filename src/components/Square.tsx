import "./Square.css";
import { useEffect, useState } from "react";

interface Props {
  size: number;
  bombs: number;
  i: number;
  j: number;
  hidden: boolean;
  clickSquare: (i: number, j: number) => void;
  lockRefresh: boolean;
}

export default function Square({
  size,
  bombs,
  i,
  j,
  hidden,
  clickSquare,
  lockRefresh,
}: Props) {
  const isBomb = bombs == -1;
  const [lock, setLock] = useState(false);
  const colors = [
    "#818cf8",
    "#67e8f9",
    "#2dd4bf",
    "#4ade80",
    "#a3e635",
    "#facc15",
    "#f59e0b",
    "#fb7185",
  ];

  useEffect(() => {
    setLock(false);
  }, [lockRefresh]);

  return (
    <div
      className={"square" + (hidden ? (lock ? " locked" : "") : " revealed")}
      onClick={() => {
        if (hidden && !lock) {
          clickSquare(i, j);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setLock(!lock);
      }}
      style={{
        width: size + "px",
        color: isBomb ? "#9f1239" : colors[(bombs + 7) % 8],
      }}
    >
      {hidden || bombs == 0 ? "" : bombs}
    </div>
  );
}
