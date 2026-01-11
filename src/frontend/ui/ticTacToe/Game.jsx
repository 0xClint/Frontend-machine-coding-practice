import { useGame } from "./useGame";

import "./game.css"

export const Game = () => {


    const { board, handleClick, getMessage, resetGame } = useGame();
    return <div>
        <h3>TicTacToe</h3>
        <p>{getMessage}</p>
        <button onClick={resetGame}>reset</button>
        <div className="board">{board.map((item, index) => (<div key={index} className="cell"
            onClick={() => handleClick(index)}>{item}</div>))}</div>
    </div>
}