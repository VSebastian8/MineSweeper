import "./Square.css";
import { useState } from "react";

interface Props {
  size: number;
  bombs: number;
  clickSquare: () => void;
}

export default function Square({ size, bombs, clickSquare }: Props) {
  const [hidden, setHidden] = useState(true);
  return (
    <div
      className="square"
      onClick={() => {
        setHidden(false);
        clickSquare();
      }}
      style={{ width: size + "px" }}
    >
      {hidden ? "" : bombs}
    </div>
  );
}
