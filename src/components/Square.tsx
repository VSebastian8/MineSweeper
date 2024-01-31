import "./Square.css";
import { useState } from "react";

interface Props {
  size: number;
  bombs: number;
  clickSquare: () => void;
}

export default function Square({ size, bombs, clickSquare }: Props) {
  const [hidden, setHidden] = useState(true);
  const isBomb = bombs == -1;
  const colors = [
    "#6366f1",
    "#38bdf8",
    "#2dd4bf",
    "#34d399",
    "#a3e635",
    "#facc15",
    "#f59e0b",
    "#fb7185",
  ];
  return (
    <div
      className={"square" + (hidden ? "" : " revealed")}
      onClick={() => {
        if (hidden) {
          setHidden(false);
          clickSquare();
        }
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
