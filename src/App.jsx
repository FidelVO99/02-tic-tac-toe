import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"

const TURNS =  { //TURNOS
  X:'x',
  O:'o'   
}
//ESTE ES UN ELEMENTO
const Square = ({children, isSelect,updateBoard, index})=>{
  const className =`square ${isSelect ? 'is-selected':''}`
  const handleClick =()=>{
    updateBoard(index)
  }
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  const [board,setBoard] = useState (Array(9).fill(null))
  const [turn,setTurn]= useState(TURNS.X) //ESTADO DE LOSTURNOS
  const [winner,setwinner] = useState(null) //ESTADO DE UN GANADOR donde el Null no hay un ganador
  //true es que existe un ganador y false es que existe un empate
  const checkWinner = (boardToCheck) =>{
    //revisamos todas las combinaciones ganadoras
    //para ver si x u o gano
    for(const combo of WINNER_COMBOS){
      const[a,b,c] = combo
      if (
        boardToCheck[a]&&
        boardToCheck[a]===boardToCheck[b] &&
        boardToCheck[a]===boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }
  const resetGame =()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setwinner(null)
  }
  const checkEndGame =(newBoard)=>{
    //Se revisa si hay un empate
    //si no hay mas espacios vacios en el tablero
    return newBoard.every((square)=>square!=null)
    //La funcion dice si todas las posiciones son diferentes a null
  }
  const updateBoard =(index)=>{
    //no actualizamos esta posicion
    //si ya tien algo
    if(board[index] || winner)return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn===TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //revisar si existe un ganador 
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setwinner(newWinner)
    }
    else if(checkEndGame(newBoard)){
      setwinner(false)//empate
    }
  }
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}> Reset del juego </button>
      <section className='game'>
          {
            board.map((square,index)=>{
              return(
                  <Square
                  key={index} index={index}
                  updateBoard={updateBoard}>
                    {square}
                  </Square>
              )

            })
          }
      </section>
      <section className="turn">
        <Square isSelect ={turn===TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelect={turn===TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      {
        winner != null && (
          <section className='winner'>
            <div className='text'>
                <h2>
                  {
                    winner === false?
                    'Empate':
                    'Gano'
                  }
                </h2>
                <header className='win'>
                  {winner&&<Square>{winner}</Square>}
                </header>
                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
