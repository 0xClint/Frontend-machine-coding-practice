import { useRef, useState } from "react"
import "./SelectableGrid.css"

export const SelectableGrid = ({ rows = 5, columns = 6 }) => {

    const [seletedBoxes, setSelectedBoxes] = useState([]);
    const [isMouseDown, setIsMouseDown] = useState(false)

    const startIdx = useRef(null);

    const handleMouseDown = (id) => {
        setIsMouseDown(true);
        setSelectedBoxes([id]);
        startIdx.current = id;
    }

    const handleMouseEnter = (id) => {
        if (!isMouseDown) return

        const startIndex = startIdx.current;
        const endIndex = id;

        const startRow = Math.floor(startIndex / columns);
        const startColumn = Math.floor(startIndex % columns);

        const endRow = Math.floor(endIndex / columns)
        const endColumn = Math.floor(endIndex % columns)

        const minRow = Math.min(startRow, endRow);
        const minColumn = Math.min(startColumn, endColumn);

        const maxRow = Math.max(startRow, endRow);
        const maxColumn = Math.max(startColumn, endColumn);
        const newSelectedBox = [];

        for (let i = minRow; i <= maxRow; i++) {
            for (let j = minColumn; j <= maxColumn; j++) {
                newSelectedBox.push(i * columns + j)
            }
        }
        setSelectedBoxes(newSelectedBox)
    }

    const handleMouseUp = () => {
        setIsMouseDown(false);
        setSelectedBoxes([]);
        startIdx.current = null
    }

    return (<div>
        <h2>SelectableGrid</h2>
        <div className="board" style={{
            gridTemplateRows: `repeat(${rows},1fr)`,
            gridTemplateColumns: `repeat(${columns},1fr)`,
        }}

            onMouseUp={handleMouseUp}
        >
            {[...Array(rows * columns).keys()].map((index) => (
                <div key={index} className="cell"
                    style={{ background: seletedBoxes.includes(index) ? "green" : 'white' }}
                    onMouseDown={() => handleMouseDown(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                >
                    {index}
                </div>))}
        </div>
    </div>)

}