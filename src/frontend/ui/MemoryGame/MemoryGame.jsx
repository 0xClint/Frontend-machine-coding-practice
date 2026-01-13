import { useState } from "react";
import "./MemoryGame.css";

const DEFAULT_COUNT = 4;

const initailizeGrid = (count) => {
  let newCount = count % 2 ? count - 1 : count;

  let arr = [...Array((newCount * newCount) / 2).keys()];

  const dedupeArray = [...arr, ...arr];

  return dedupeArray
    .sort(() => Math.random() - 0.5)
    .map((item, idx) => ({ id: idx , number: item }));
};

export const MemoryGame = () => {
  const [gridSize, setGirdSize] = useState(DEFAULT_COUNT);
  const [first, setFirst] = useState(-1);
  const [second, setSecond] = useState(-1);
  const [solved, setSolved] = useState([]);
  const [gridBoard, setgridBoard] = useState(initailizeGrid(DEFAULT_COUNT));

  const handleGridSizeInput = (e) => {
    const gridValue = e.target.value;
    setGirdSize(gridValue % 2 ? gridValue - 1 : gridValue);
  };

  const checkDedupe = (a, b) => {

    console.log(gridBoard[a], gridBoard[b])
    if (gridBoard[a].number == gridBoard[b].number) {
      setSolved((prev) => [...prev, gridBoard[a].id, gridBoard[b].id]);
    } else {
      setTimeout(() => {
        setFirst(-1);
        setSecond(-1);
      }, 500);
    }
  };

  const handleFlip = (event) => {
    const targetValue = event.target.getAttribute("data-value");

    console.log(targetValue);
    if (isNaN(parseInt(targetValue))) return;

    if (first === -1) setFirst(targetValue);
    else if (second === -1) {
      setSecond(targetValue);
      checkDedupe(first, targetValue);
    } else {
      setFirst(-1);
      setSecond(-1);
    }
  };

  const isFlipped = (id) => id == first || id == second || solved.includes(id);
console.log(solved)
  const isSolved = (id) => solved.includes(id);
  return (
    <div>
      <h2>MemoryGame</h2>
      <div className="">
        <input
          type="number"
          placeholder="cell size"
          className="grid-input"
          value={gridSize}
          onChange={handleGridSizeInput}
          min={2}
          max={8}
        />
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(${gridSize},1fr)`,
          gridTemplateRows: `repeat(${gridSize},1fr)`,
        }}
        className="grid-container"
        onClick={handleFlip}
      >
        {gridBoard.map(({ id, number }, index) => (
          <div
            className={`grid-item ${isSolved(id) && "flipped"}`}
            key={index}
            data-value={id}
          >
            {isFlipped(id) ? number : "?"}
          </div>
        ))}
      </div>
    </div>
  );
};
