import { useEffect, useState } from "react";
import "./GridLight.css"

const GRID_ROW = 3
const GRID_COL = 3
const initializeBoard = () => {
    const board = [...Array(GRID_ROW * GRID_COL).keys()].map((item) => ({ id: item + 1, active: false, disable: false }))
    return board;
}

export const GridLight = () => {

    const [board, setBoard] = useState(initializeBoard());
    const [selected, setSelected] = useState([]);

    const handleClick = (event) => {
        const selectedId = parseInt(event.target.getAttribute("data-value"))

        if (selected.includes(selectedId)) return;
        setSelected((arr) => [...arr, selectedId]);

        setBoard((prevBoard) => {
            return prevBoard.map((cell) => {

                if (selectedId === cell.id)
                    return {
                        ...cell, active: true
                    };

                return cell;

            })
        })
    }

    useEffect(() => {
        if (selected.length === board.length) {
            let newSelected = selected;
            for (let i = 0; i < selected.length; i++) {

                setTimeout(() => {

                    setBoard((prevBoard) => {
                        return prevBoard.map((cell) => {

                            if (newSelected[i] === cell.id)
                                return {
                                    ...cell, active: false
                                };

                            return cell;

                        })
                    })

                }, i * 300)
            }
        }
    }, [selected])


    return (<div>
        <h2>GridLight</h2>
        <div className="board"
            style={{ gridTemplateColumns: `repeat(${GRID_COL},1fr)`, gridTemplateRows: `repeat(${GRID_ROW},1fr)` }}
            onClick={handleClick}>
            {board.map(({ id, active, disable }) => (
                <div key={id} className="cell"
                    tabIndex={0}
                    style={{ background: active ? "blue" : 'white' }}
                    data-value={id}
                >{id}</div>
            ))}</div>
    </div>)
}