import logo from './logo.svg';
import './App.css';
import ScoreBoard from './components/ScoreBoard'
import { useState, useEffect } from "react";
import $ from 'jquery';
import useEventListener from './hooks/useEventListner';
let gbLeft;
let gbTop;

function App() {
  const [gameState, setGameState] = useState('initial');
  const [ballCord, setBallCord] = useState({ top: null, left: null })
  const [leftPongCord, setLeftPongCord] = useState({ top: '0px' })
  const [rightPongCord, setRightPongCord] = useState({ top: "0px" })
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
  let pongMove = ({ key }) => {
    if (String(key) === 's') {
      if (parseInt(leftPongCord.top.slice(0, -2)) < gbTop) {
        let updatedCord = parseInt(leftPongCord.top.slice(0, -2)) + 10;
        setLeftPongCord({ top: (updatedCord + 'px') });
      }
    }
    else if (String(key) === 'w') {
      if (parseInt(leftPongCord.top.slice(0, -2))  > 0) {
        let updatedCord = parseInt(leftPongCord.top.slice(0, -2)) - 10;
        setLeftPongCord({ top: (updatedCord + 'px') });
      }
    }
    else if (String(key) === 'ArrowUp') {
      if (parseInt(rightPongCord.top.slice(0, -2))  < gbTop) {
        let updatedCord = parseInt(rightPongCord.top.slice(0, -2)) + 10;
        setRightPongCord({ top: (updatedCord + 'px') });
        console.log(String(key));
      }
    }
    else if (String(key) === 'ArrowDown') {
      if (parseInt(rightPongCord.top.slice(0, -2))  > 0) {
        let updatedCord = parseInt(rightPongCord.top.slice(0, -2)) - 10;
        setRightPongCord({ top: (updatedCord + 'px') });
        console.log(String(key));
      }
    }
  }
  useEffect(() => {
    $('#divGameBox').on('click', () => {
      if (gameState == 'initial') {
        setGameState('start')
        gbTop = $('#divGameBox').height() - 40;
        gbLeft = $('#divGameBox').width() - 40;
      }
    });
  }, []);
  useEffect(() => {
    if (gameState == "start") {
      setBallCord({
        left: Math.floor(Math.random() * (gbLeft * 0.4)) + (gbLeft * 0.3) + 'px',
        top: Math.floor(Math.random() * (gbTop * 0.6)) + (gbTop * 0.2) + 'px'
      })
    }
  }, [gameState])

  useEventListener('keydown', pongMove);

  return (
    <div className="App">
      <div id="divGameBox" className="gameBox">
        {game()}
      </div>
    </div>
  );
}

export default App;
