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


function App() {
	let [gameState, setGameState] = useState('initial');
	let [ballCord, setBallCord] = useState({ top: null, left: null })
	let [leftPongCord, setLeftPongCord] = useState({ top: '0px' })
	let [rightPongCord, setRightPongCord] = useState({ top: "0px" })
	const ballMoveHandler = useRef();
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
	let ballMove = () => {
		//retrieve ball coordinates
		//add bl and bh
		//call setBallCord and set ball coordinates
		//call func
		//if ball touches top border then change vhy to 1
		//if ball touches bottom border then change vhy to -1
		console.log(gbTop,gbLeft)
		let upLeft = parseInt(ballCord.left.slice(0, -2)) + vbl*speed;
		let upTop = parseInt(ballCord.top.slice(0, -2)) + vbt*speed;
		if(upTop > gbTop+10)
			vbt=-1;
		if(upTop < 10)
			vbt=1;
		if(upLeft < 20 && (upTop >= parseInt(leftPongCord.top.slice(0, -2)) && upTop <= parseInt(leftPongCord.top.slice(0, -2))+50))
			vbl=1;
		if(upLeft >  gbLeft-20 && (upTop >= parseInt(rightPongCord.top.slice(0, -2)) && upTop <= parseInt(rightPongCord.top.slice(0, -2))+50))
			vbl=-1;
		if(upLeft < 10)
			vbl = 1;
		if(upLeft > gbLeft+10)
			vbl = -1;
		setBallCord({
			top: upTop + 'px',
			left: upLeft + 'px'
		})
	};
	let pongMove = ({ key }) => {
		ballMove();
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
				console.log(String(key));
			}
		}
		else if (String(key) === 'ArrowUp') {
			if (parseInt(rightPongCord.top.slice(0, -2)) > 0) {
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
