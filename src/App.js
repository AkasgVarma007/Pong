import './App.css';
import ScoreBoard from './components/ScoreBoard'
import { useState, useRef, useEffect, useCallback } from "react";
import $ from 'jquery';
import useEventListener from './hooks/useEventListner';
let gbLeft;
let gbTop;
let vbt = 1;
let vbl = 1;
let speed = 1;
let player1Name = null;
let player2Name = null;

function App() {
	let [gameState, setGameState] = useState('initial');
	let [ballCord, setBallCord] = useState({ top: null, left: null });
	let [leftPongCord, setLeftPongCord] = useState({ top: '0px' });
	let [rightPongCord, setRightPongCord] = useState({ top: "0px" });
	let [player1Score, setPlayer1Score] = useState(0);
	let [player2Score, setPlayer2Score] = useState(0);
	let game = () => {
		if (gameState == 'initial') {
			return (
				<div>
					<h1>Pong</h1>
					<form>
						<label className="playerLabel" >Enter player 1 name</label><br></br>
						<input type="text" className="inputBox" id="player1Name"></input><br></br>
						<label className="playerLabel">Enter player 2 name</label><br></br>
						<input type="text" className="inputBox" id="player2Name"></input><br></br>
						<input type="button" value="Start" onClick={initnames}></input>
					</form>
				</div>
			)
		}
		else if (gameState == 'start') {
			return (
				<div>
					<ScoreBoard player1={player1Name} player2={player2Name} p1 = {player1Score} p2 = {player2Score}/>
					<div className="rightPong" style={rightPongCord}></div>
					<div className="vl"></div>
					<div className="leftPong" style={leftPongCord}></div>
					<div className="ball" style={ballCord}></div>
				</div>
			)
		}
		else if (gameState == 'end'){
			if(player1Score == 11){
				return (
					<div>
						<h1 className="playerLabel">{player1Name} Wins</h1>
						<input type="button" value="Play Again?" onClick={() => {window.location.reload();}}></input>
					</div>
				)
			}
			else{
				return (
					<div>
						<h1 className="playerLabel">{player2Name} Wins</h1>
					</div>
				)
			}
		}
	}
	let initnames = () => {
		player1Name = document.getElementById("player1Name").value;
		player2Name = document.getElementById("player2Name").value;
		if(player1Name != '' && player2Name != '')
			setGameState('start');
		else
			alert("Enter Name");
	}
	let ballMove = () => {
		let p1 = player1Score;
		let p2 = player2Score;
		let upLeft = parseFloat(ballCord.left.slice(0, -2)) + vbl*speed;
		let upTop = parseFloat(ballCord.top.slice(0, -2)) + vbt*speed;
		if(upTop > gbTop+10)
			vbt=-1;
		if(upTop < 10)
			vbt=1;
		if(upLeft < 20 && (upTop >= parseInt(leftPongCord.top.slice(0, -2)) && upTop <= parseInt(leftPongCord.top.slice(0, -2))+50))
			vbl=1;
		if(upLeft >  gbLeft-20 && (upTop >= parseInt(rightPongCord.top.slice(0, -2)) && upTop <= parseInt(rightPongCord.top.slice(0, -2))+50))
			vbl=-1;
		if(upLeft >= gbLeft)
		{
			setGameState('score');
			setPlayer1Score(p1+1);
		}
		if(upLeft <= 0)
		{
			setGameState('score');
			setPlayer2Score(p2+1);
		}
		setBallCord({
			top: upTop + 'px',
			left: upLeft + 'px'
		})
		if(p1==11 || p2==11)
			setGameState('end');
	};
	const sleep = (milliseconds) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	      }
	let pongMove = ({ key }) => {
		if (String(key) === 's') {
			if (parseInt(leftPongCord.top.slice(0, -2)) < gbTop) {
				let updatedCord = parseInt(leftPongCord.top.slice(0, -2)) + 10;
				setLeftPongCord({ top: (updatedCord + 'px') });
			}
		}
		else if (String(key) === 'w') {
			if (parseInt(leftPongCord.top.slice(0, -2)) > 0) {
				let updatedCord = parseInt(leftPongCord.top.slice(0, -2)) - 10;
				setLeftPongCord({ top: (updatedCord + 'px') });
			}
		}
		else if (String(key) === 'ArrowDown') {
			if (parseInt(rightPongCord.top.slice(0, -2)) < gbTop) {
				let updatedCord = parseInt(rightPongCord.top.slice(0, -2)) + 10;
				setRightPongCord({ top: (updatedCord + 'px') });
			}
		}
		else if (String(key) === 'ArrowUp') {
			if (parseInt(rightPongCord.top.slice(0, -2)) > 0) {
				let updatedCord = parseInt(rightPongCord.top.slice(0, -2)) - 10;
				setRightPongCord({ top: (updatedCord + 'px') });
			}
		}
	}
	useEffect(() => {
		gbTop = $('#divGameBox').height() - 40;
		gbLeft = $('#divGameBox').width() - 40;
	}, []);
	useEffect(() => {
		if (gameState == "start") {
			setBallCord({
				left: Math.floor(Math.random() * (gbLeft * 0.4)) + (gbLeft * 0.3) + 'px',
				top: Math.floor(Math.random() * (gbTop * 0.6)) + (gbTop * 0.2) + 'px'
			})
		}
		else if(gameState === "score") {
			sleep(1000).then(() => {
				setGameState('start');
			})
		}
	}, [gameState])
	useEffect(() => {
		if(gameState == "start")
			ballMove();
	},[ballCord])
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
