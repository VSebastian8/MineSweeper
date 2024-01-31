import "./Square.css";

interface Props {
  size: number;
  bombs: number;
}

export default function Square({ size, bombs }: Props) {
  return (
    <div className="square" style={{ width: size + "px" }}>
      {bombs}
    </div>
  );
}
