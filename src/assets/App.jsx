import { useState } from "react"

const Turns = {
    X: 'x',
    O: 'o'
}

const Square = ({ children , isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index)
    }

    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

const winner_combos = [
    [0,1,2],
    [3,4,5],
    [6,7,8]
]

export function App () {
    const [board, setBoard] = useState(Array(9).fill(null)) 
    const [turn, setTurn] = useState(Turns.X)
    const [winner, setWinner] = useState(null)

    const checkWinner = (boardToCheck) => {
        for( const combo of winner_combos){
            const [a,b,c] = combo
            if (
                boardToCheck[a] &&
                boardToCheck[a] === boardToCheck[b] &&
                boardToCheck[a] === boardToCheck[c]
            ){
                return boardToCheck[a]
            }
            return null
        }
    }

    const updateBoard = (index) => {
        if (board[index] || winner) return 

        const newBoard = [... board]
        newBoard[index] = turn
        setBoard(newBoard)

        const newTurn = turn === Turns.X ? Turns.O : Turns.X
        setTurn(newTurn)
        const newWinner = checkWinner(newBoard)
        if(newWinner){
            setWinner(newWinner)
            alert(`El ganador es ${newWinner}`)
        }
    }

    return (
        <>
        <main className='board'>
            <h1>Tik tak toe</h1>
            <section className="game">
                {
                    board.map(( _, index) => {
                        return (
                            <Square key={index} index={index} updateBoard={updateBoard} > {board[index]} </Square>
                        )
                    })
                }
            </section>
            <section className="turn">
                <Square isSelected={turn === Turns.X} >{Turns.X}</Square>
                <Square isSelected={turn === Turns.O}>{Turns.O}</Square>
            </section>
        </main>
        </>
    )
}