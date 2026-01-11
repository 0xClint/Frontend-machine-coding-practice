import { useMemo, useState } from "react";

const initializeBoard = () => Array(9).fill(null);

const PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

export function useGame() {

    const [board, setBoard] = useState(initializeBoard())
    const [flag, setFlag] = useState(true);

    const handleClick = (id) => {
        if (checkWinner()) return;

        if (board[id]) return;

        const newBoard = [...board];
        newBoard[id] = flag ? "X" : "O";
        setFlag((item) => !item);

        setBoard(newBoard)
    }

    const checkWinner = () => {

        const length = PATTERNS.length;

        for (let i = 0; i < length; i++) {
            const [a, b, c] = PATTERNS[i];

            if (board[a] === board[b] && board[b] === board[c]) return board[a];
        }
        return null;

    }


    const getMessage = useMemo(() => {

        const isWinner = checkWinner();

        if (isWinner) return `Player ${isWinner} wins!`;

        if (!board.includes(null)) return "Its a Draw!"

        return `Player ${flag ? "X" : "O"} turn`
    }, [board, flag])

    const resetGame = () => setBoard(initializeBoard());



    return { board, handleClick, getMessage, resetGame }
}