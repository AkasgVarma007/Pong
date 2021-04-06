import {useState,useEffect} from "react";

function ScoreBoard(props) {
    const [gameState, setGameState] = useState(false)
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)
    useEffect(() => {
        
    },[])
    return (
        <div className="scoreBoardContainer">

            <div>
                <h1>{props.player1}</h1>
                <h1>{player1Score}</h1>
            </div>
            <div>
                <h1>{props.player2}</h1>
                <h1>{player2Score}</h1>
            </div>
        </div>
    )
}

export default ScoreBoard;