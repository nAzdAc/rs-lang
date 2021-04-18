import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { makeStyles } from '@material-ui/core/styles';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import fonSong from '../assets/sounds/fon.mp3';
import successSong from '../assets/sounds/success.mp3';
import failSong from '../assets/sounds/no.wav';
import { backRoutes } from '../utils/backRoutes';
import { CircularProgress } from '@material-ui/core';
import { createSound, getRandomInt, getWordsForPlay } from '../utils/helpers';
import { GameStats } from '../components/GameStats';
import { useHttp } from '../hooks/http.hook';
import { toggleScreen } from '../utils/fullScreen';
import { AuthContext } from '../context/AuthContext';
import { useEndGame } from '../hooks/endGame.hook';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { deleteWords } from '../store/wordsSlice';
import { useDispatch } from 'react-redux';
import { deleteLevel } from '../store/levelSlice';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	gameContainer: {
		position: 'relative',
		width: '90%',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: '20px 0px 10px 0px',
		background: 'white'
	},
	buttonsWrap: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center'
	},
	badButton: {
		borderRadius: '5px',
		border: 'none',
		cursor: 'pointer',
		marginRight: '10px',
		fontWeight: 'bold',
		width: '109px',
		height: '36px',
		background: '#B00020',
		color: '#FFF',
		'&:hover': {
			background: '#E6002A'
		}
	},
	goodButton: {
		borderRadius: '5px',
		border: 'none',
		cursor: 'pointer',
		fontWeight: 'bold',
		width: '109px',
		height: '36px',
		background: '#01A299',
		color: '#FFF',
		'&:hover': {
			background: '#00D9CE'
		}
	},
	loader: {
		position: 'absolute',
		top: '50%',
		left: '50%'
	},
	fullScreenBtn: {
		position: 'absolute',
		right: '0',
		bottom: '0',
		border: 'none',
		outline: 'none',
		cursor: 'pointer',
		fontWeight: 'bold',
		width: '50px',
		height: '50px',
		background: 'white',
		color: '#FFF'
	},
	fullScreenIcon: {
		cursor: 'pointer',
		fontSize: '50px',
		color: '#01A299',
		'&:hover': {
			color: '#00D9CE'
		}
	},
	series: {
		minHeight: '100px',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginBottom: '30px',
		width: '90%'
	},
	starIcon: {
		fontSize: '50px',
		color: 'gold'
	}
});

const keyCodeArray = {
	enter: 13,
	space: 32,
	num1: 35,
	num2: 40
};

export const SprintPage = () => {
	const classes = useStyles();
	const { userId, token } = useContext(AuthContext);
	const { request } = useHttp();
	const { postStats, postAnswers } = useEndGame();
	const soundVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.soundVolume) || INIT_CONSTS.soundVolume, []);
	const musicVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.musicVolume) || INIT_CONSTS.musicVolume, []);
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

	const dispatch = useDispatch();
	const wordsRedux = useSelector((state) => state.words.wordsRedux);
	const levelRedux = useSelector((state) => state.level.level)

	const fetchWords = useCallback(
		async () => {
			try {
				let userWordsArr = [];
				if (userId && token) {
					userWordsArr = (await backRoutes.getUserWords({ userId, token })).userWords;
				}
				let playWords = [];
				if (wordsRedux.length) {
					playWords = wordsRedux;
				} else if (levelRedux !== null) {
					const randomPage = getRandomInt(0, 31);
					playWords = await request(`${backRoutes.words}?group=${levelRedux}&page=${randomPage}`, 'GET');
				} else {
					const randomGroup = getRandomInt(0, 6);
					const randomPage = getRandomInt(0, 31);
					playWords = await request(`${backRoutes.words}?group=${randomGroup}&page=${randomPage}`, 'GET');
				}
				const parsedPlayWords = playWords.map((item) => {
					return {
						english: item.word,
						russian: item.wordTranslate,
						id: item.id,
						group: item.group,
						page: item.page,
						deleted: false
					};
				});
				const gamesArr = getWordsForPlay(parsedPlayWords, userWordsArr);
				console.log(gamesArr);
				setWordsArray(gamesArr);
			} catch (e) {
				console.log(e);
			}
		},
		[levelRedux, request, token, userId, wordsRedux]
	);

	useEffect(
		() => {
			if (endGame) {
				postStats('sprint', correctAnswers, failAnswers, allSeries);
				postAnswers(correctAnswers, failAnswers);
			}
		},
		[ allSeries, correctAnswers, endGame, failAnswers, postAnswers, postStats ]
	);

	const answer = useCallback(
		(value) => {
			if (endGame) return;
			if (
				(value === 'true' && currentWord.russian === currentRussianhWord) ||
				(value === 'false' && currentWord.russian !== currentRussianhWord)
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
			fetchWords();
		},
		[ fetchWords ]
	);

	useEffect(
		() => {
			if (wordsArray.length && currentNumber < wordsArray.length) {
				setCurrentWord(wordsArray[currentNumber]);
				setCurrentRussianhWord(() => {
					let word;
					const num = Math.random();
					if (num > 0.45) {
						word = wordsArray[currentNumber].russian;
					} else {
						word = wordsArray[getRandomInt(0, wordsArray.length)].russian;
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
				if (!Object.values(keyCodeArray).includes(event.keyCode)) return;
				let value;
				if (event.keyCode === keyCodeArray.enter || event.keyCode === keyCodeArray.num2) {
					value = 'true';
				} else if (event.keyCode === keyCodeArray.space || event.keyCode === keyCodeArray.num1) {
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
				dispatch(deleteWords());
				dispatch(deleteLevel())
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
				<GameStats correctAnswers={correctAnswers} failAnswers={failAnswers} />
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
					<Typography variant="h4">{`${currentWord.english || ''} = ${currentRussianhWord || ''}`}</Typography>
					<div ref={seriesContainer} className={classes.series} />
					<div className={classes.buttonsWrap}>
						<button className={classes.badButton} onClick={(event) => answer(event.target.value)} value={false}>
							НЕ ВЕРНО
						</button>
						<button className={classes.goodButton} onClick={(event) => answer(event.target.value)} value={true}>
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
