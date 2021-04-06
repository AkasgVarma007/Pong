import logo from './logo.svg';
import './App.css';
import ScoreBoard from './components/ScoreBoard'
import { useState, useEffect } from "react";
import $ from 'jquery';
function App() {
  const [gameState, setGameState] = useState('initial');
  const [ballCord, setBallCord] = useState({ top: null, left: null })
  const [leftPongCord, setLeftPongCord] = useState({ top: '0px' })
  const [rightPongCord, setRightPongCord] = useState({ top: "0px" })
  $(document).on('keypress', (e) => {
    if (e.key === 'w') {
      console.log(e);
      let updatedCord = parseInt(leftPongCord.top.slice(0, -2)) + 20;
      setLeftPongCord({ top: updatedCord + 'px' });
    }
  })
  let game = () => {
    if (gameState == 'initial') {
      return (
        <h1>Click on the board to start the Game</h1>
      )
    }
    else if (gameState == 'start') {
      return (
        <div>
          <ScoreBoard player1="Akash" player2="Aditya" />
          <div className="rightPong" style={rightPongCord}></div>
          <div className="vl"></div>
          <div className="leftPong" style={leftPongCord}></div>
          <div className="ball" style={ballCord}></div>
        </div>
      )
    }
  }
  useEffect(() => {
    $('#divGameBox').on('click', () => {
      if (gameState == 'initial') {
        setBallCord({
          left: Math.floor(Math.random() * ($('#divGameBox').width() * 0.7) + ($('#divGameBox').width() * 0.3)) + 'px',
          top: Math.floor(Math.random() * ($('#divGameBox').height() * 0.8) + ($('#divGameBox').width() * 0.2)) + 'px'
        })
        setGameState('start')
      }
    })
  }, []);
  useEffect(() => {
  }, [gameState])
  return (
    <div className="App">
      <div id="divGameBox" className="gameBox">
        {game()}
      </div>
    </div>
  );
}

export default App;
