import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import fonSong from '../assets/sounds/fon.mp3';
import successSong from '../assets/sounds/success.mp3';
import failSong from '../assets/sounds/no.wav';
import { CircularProgress } from '@material-ui/core';
import { createSound, getRandomInt } from '../utils/helpers';
import { GameStats } from '../components/GameStats';
import { toggleScreen } from '../utils/fullScreen';
import { useGames } from '../hooks/games.hook';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { useStyles } from '../styles/pagesStyles/Games.styles';
import { yesNoKeyCode } from '../utils/constants';
import { deleteLevel } from '../redux/actions';

export const SprintPage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { soundVolume, musicVolume } = useSelector((state) => state.settings);
	const { getWords } = useGames();
	const [ endGame, setEndGame ] = useState(false);
	const [ seconds, setSeconds ] = useState(60);
	const [ wordsArray, setWordsArray ] = useState([]);
	const [ correctAnswers, setCorrectAnswers ] = useState([]);
	const [ failAnswers, setFailAnswers ] = useState([]);
	const [ currentWord, setCurrentWord ] = useState({});
	const [ currentRussianhWord, setCurrentRussianhWord ] = useState('');
	const [ currentNumber, setCurrentNumber ] = useState(0);
	const timer = useRef();
	const [ fullScreen, setFullScreen ] = useState(false);
	const [ currentSeries, setCurrentSeries ] = useState(0);
	const [ allSeries, setAllSeries ] = useState([]);
	const seriesContainer = useRef('');
	const gameBoard = useRef();

	const audioSuccess = useMemo(() => createSound(successSong, soundVolume), [ soundVolume ]);
	const audioFail = useMemo(() => createSound(failSong, soundVolume * 5), [ soundVolume ]);
	const audioFon = useMemo(() => createSound(fonSong, musicVolume * 0.1, 1, true), [ musicVolume ]);

	const playWords = useCallback(
		async () => {
			const words = await getWords();
			console.log(words);
			setWordsArray(words);
		},
		[ getWords ]
	);

	useEffect(
		() => {
			playWords();
		},
		[ playWords ]
	);

	const answer = useCallback(
		(value) => {
			if (endGame) return;
			if (
				(value === 'true' && currentWord.wordTranslate === currentRussianhWord) ||
				(value === 'false' && currentWord.wordTranslate !== currentRussianhWord)
			) {
				seriesContainer.current.innerHTML += ' <img src="https://img.icons8.com/color/48/000000/hand-drawn-star.png"/>';
				setCurrentSeries((prev) => prev + 1);
				setCorrectAnswers((prev) => [ ...prev, currentWord ]);
				audioSuccess.play();
			} else {
				setAllSeries((prev) => [ ...prev, currentSeries ]);
				setCurrentSeries(0);
				seriesContainer.current.innerHTML = '';
				setFailAnswers((prev) => [ ...prev, currentWord ]);
				audioFail.play();
			}
			setCurrentNumber((prev) => prev + 1);
		},
		[ audioFail, audioSuccess, currentRussianhWord, currentSeries, currentWord, endGame ]
	);

	useEffect(
		() => {
			if (wordsArray.length && currentNumber < wordsArray.length) {
				setCurrentWord(wordsArray[currentNumber]);
				setCurrentRussianhWord(() => {
					let word;
					const num = Math.random();
					if (num > 0.45) {
						word = wordsArray[currentNumber].wordTranslate;
					} else {
						word = wordsArray[getRandomInt(0, wordsArray.length)].wordTranslate;
					}
					return word;
				});
			}
		},
		[ currentNumber, wordsArray ]
	);

	useEffect(
		() => {
			if (!endGame && wordsArray.length && currentWord) {
				audioFon.play();
				timer.current = setInterval(() => {
					setSeconds((prev) => prev - 1);
				}, 1000);
			}
			return () => {
				clearInterval(timer.current);
				audioFon.stop();
			};
		},
		[ endGame, audioFon, wordsArray, currentWord ]
	);

	useEffect(
		() => {
			if (seconds === 0 || (currentNumber && currentNumber >= wordsArray.length)) {
				setEndGame(true);
				clearInterval(timer.current);
				audioFon.stop();
			}
		},
		[ seconds, wordsArray, currentNumber, audioFon ]
	);

	useEffect(
		() => {
			if (endGame) return;
			const keyboardClick = (event) => {
				if (!Object.values(yesNoKeyCode).includes(event.keyCode)) return;
				let value;
				if (event.keyCode === yesNoKeyCode.enter || event.keyCode === yesNoKeyCode.num2) {
					value = 'true';
				} else if (event.keyCode === yesNoKeyCode.space || event.keyCode === yesNoKeyCode.num1) {
					value = 'false';
				}
				answer(value);
			};
			document.addEventListener('keydown', keyboardClick);
			return () => {
				document.removeEventListener('keydown', keyboardClick);
			};
		},
		[ answer, endGame ]
	);

	useEffect(
		() => {
			return () => {
				dispatch(deleteLevel());
			};
		},
		[ dispatch ]
	);

	function goFullScreen(elem) {
		setFullScreen((prev) => !prev);
		toggleScreen(elem);
	}

	return (
		<div className={classes.root}>
			<ToastContainer />
			{endGame ? (
				<GameStats allSeries={allSeries} gameName="sprint" correctAnswers={correctAnswers} failAnswers={failAnswers} />
			) : wordsArray.length && currentWord && currentRussianhWord ? (
				<div ref={gameBoard} className={classes.gameContainer}>
					<button onClick={() => goFullScreen(gameBoard.current)} className={classes.fullScreenBtn}>
						{fullScreen ? (
							<FullscreenExitIcon className={classes.fullScreenIcon} />
						) : (
							<FullscreenIcon className={classes.fullScreenIcon} />
						)}
					</button>
					<Typography variant="h5">Осталось: </Typography>
					<Typography variant="h2">{seconds}</Typography>
					<Typography variant="h4">{`${currentWord.word || ''} = ${currentRussianhWord || ''}`}</Typography>
					<div ref={seriesContainer} className={classes.series} />
					<div className={classes.buttonsWrap}>
						<button
							className={`${classes.button} ${classes.badButton}`}
							onClick={(event) => answer(event.target.value)}
							value={false}
						>
							НЕ ВЕРНО
						</button>
						<button
							className={`${classes.button} ${classes.goodButton}`}
							onClick={(event) => answer(event.target.value)}
							value={true}
						>
							ВЕРНО
						</button>
					</div>
					<Typography
						variant="subtitle1"
						className={classes.answer}
					>{`Правильные ответы: ${correctAnswers.length}`}</Typography>
					<Typography
						color="secondary"
						variant="subtitle1"
						className={classes.answer}
					>{`Ошибки: ${failAnswers.length}`}</Typography>
				</div>
			) : (
				<CircularProgress className={classes.loader} />
			)}
		</div>
	);
};
