import "./Square.css";
import click_lock from "../assets/lock.mp3";
import click_unlock from "../assets/unlock.mp3";
import { useEffect, useState } from "react";

const lockSound = new Audio(click_lock);
const unlockSound = new Audio(click_unlock);

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
  const [triggered, setTriggered] = useState(false);
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
    setTriggered(false);
  }, [lockRefresh]);

  const handleLock = () => {
    if (lock) unlockSound.play();
    else lockSound.play();
    setLock(!lock);
  };

  return (
    <div
      className={
        "square" +
        (lock ? " locked" : hidden ? "" : " revealed") +
        (triggered ? " exploded" : "")
      }
      onClick={() => {
        if (isBomb) setTriggered(true);
        if (hidden && !lock) {
          clickSquare(i, j);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        handleLock();
      }}
      style={{
        width: size + "px",
        color: isBomb ? "#9f1239" : colors[(bombs + 7) % 8],
        animationDelay: j * 0.05 + "s",
      }}
    >
      {hidden || bombs == 0 ? "" : isBomb ? (triggered ? "x" : "o") : bombs}
    </div>
  );
}
