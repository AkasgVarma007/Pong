import {useState,useEffect} from "react";

function ScoreBoard(props) {
    useEffect(() => {
    },[])
    return (
        <div className="scoreBoardContainer">

            <div>
                <h1>{props.player1}</h1>
                <h1>{props.p1}</h1>
            </div>
            <div>
                <h1>{props.player2}</h1>
                <h1>{props.p2}</h1>
            </div>
        </div>
    )
}

export default ScoreBoard;