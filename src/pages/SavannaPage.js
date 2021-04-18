import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { makeStyles } from '@material-ui/core/styles';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import successSong from '../assets/sounds/success.mp3';
import failSong2 from '../assets/sounds/fail.mp3';
import fonSong from '../assets/sounds/fon.mp3';
import { backRoutes } from '../utils/backRoutes';
import { CircularProgress } from '@material-ui/core';
import { createSound, getRandomInt, getWordsForPlay, shuffleAllElements } from '../utils/helpers';
import { GameStats } from '../components/GameStats';
import { useHttp } from '../hooks/http.hook';
import { Transition } from 'react-transition-group';
import { toggleScreen } from '../utils/fullScreen';
import { LifesInGames } from '../components/LifesInGames';
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
		width: '90%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		background: 'white',
		position: 'relative'
	},
	heart: {
		fontSize: '50px',
		color: 'red'
	},
	contentWrap: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center'
	},
	buttonsWrap: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: '30px'
	},
	button: {
		marginRight: '10px',
		borderRadius: '5px',
		border: 'none',
		cursor: 'pointer',
		fontWeight: 'bold',
		width: '20%',
		maxWidth: '150px',
		height: '50px',
		background: '#01A299',
		color: '#FFF',
		'&:hover': {
			background: '#00D9CE'
		}
	},
	badButton: {
		background: '#B00020',
		'&:hover': {
			background: '#E6002A'
		}
	},
	goodButton: {
		background: '#16a600',
		'&:hover': {
			background: '#28fc03'
		}
	},
	fail: {
		marginBottom: '10px'
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
	top1: 49,
	top2: 50,
	top3: 51,
	top4: 52,
	num1: 35,
	num2: 40,
	num3: 34,
	num4: 37
};

export const SavannaPage = (props) => {
	const classes = useStyles();
	const { request } = useHttp();
	const { postStats, postAnswers } = useEndGame();
	const { userId, token } = useContext(AuthContext);
	const soundVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.soundVolume) || INIT_CONSTS.soundVolume, []);
	const musicVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.musicVolume) || INIT_CONSTS.musicVolume, []);
	const [ endGame, setEndGame ] = useState(false);
	const [ correctAnswers, setCorrectAnswers ] = useState([]);
	const [ failAnswers, setFailAnswers ] = useState([]);
	const [ currentNumber, setCurrentNumber ] = useState(0);
	const [ currentWord, setCurrentWord ] = useState({});
	const [ wordsArray, setWordsArray ] = useState([]);
	const [ fourButtons, setFourButtons ] = useState([]);
	const [ lifes, setLifes ] = useState(5);
	const [ block, setBlock ] = useState(true);
	const audioSuccess = useMemo(() => createSound(successSong, soundVolume), [ soundVolume ]);
	const audioFail2 = useMemo(() => createSound(failSong2, soundVolume), [ soundVolume ]);
	const audioFon = useMemo(() => createSound(fonSong, musicVolume * 0.1, 1, true), [ musicVolume ]);
	const four = useRef([]);
	const [ fullScreen, setFullScreen ] = useState(false);
	const gameBoard = useRef();
	const [ currentSeries, setCurrentSeries ] = useState(0);
	const [ allSeries, setAllSeries ] = useState([]);
	const seriesContainer = useRef('');
  const dispatch = useDispatch();

  const wordsRedux = useSelector(
    state=>state.words.wordsRedux,
  );
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
				console.log(playWords);
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
				setTimeout(() => {
					setBlock(false);
				}, 500);
			} catch (e) {
				console.log(e);
			}
		},
		[levelRedux, request, token, userId, wordsRedux]
	);

	useEffect(
		() => {
			if (endGame) {
				postStats('savanna', correctAnswers, failAnswers, allSeries);
				postAnswers(correctAnswers, failAnswers);
			}
		},
		[allSeries, correctAnswers, endGame, failAnswers, postAnswers, postStats]
	);

	const answer = useCallback(
		(value, click) => {
			if (block || endGame || !value) return;
			if (click) {
				if (value === currentWord.english) {
					seriesContainer.current.innerHTML +=
						' <img src="https://img.icons8.com/color/48/000000/hand-drawn-star.png"/>';
					setCurrentSeries((prev) => prev + 1);
					setCorrectAnswers((prev) => [ ...prev, currentWord ]);
					audioSuccess.play();
					const goodButton = four.current.find((button) => button.value === value);
					goodButton.classList.add(classes.goodButton);
					setBlock(true);
					setTimeout(() => {
						goodButton.classList.remove(classes.goodButton);
						setCurrentNumber((prev) => prev + 1);
						setBlock(false);
					}, 2000);
				} else {
					setAllSeries((prev) => [ ...prev, currentSeries ]);
					setCurrentSeries(0);
					seriesContainer.current.innerHTML = '';
					setFailAnswers((prev) => [ ...prev, currentWord ]);
					audioFail2.play();
					setLifes((prev) => prev - 1);
					const goodButton = four.current.find((button) => button.value === currentWord.english);
					const badButton = four.current.find((button) => button.value === value);
					goodButton.classList.add(classes.goodButton);
					badButton.classList.add(classes.badButton);
					setBlock(true);
					setTimeout(() => {
						goodButton.classList.remove(classes.goodButton);
						badButton.classList.remove(classes.badButton);
						setCurrentNumber((prev) => prev + 1);
						setBlock(false);
					}, 2000);
				}
			} else {
				setAllSeries((prev) => [ ...prev, currentSeries ]);
				setCurrentSeries(0);
				seriesContainer.current.innerHTML = '';
				setFailAnswers((prev) => [ ...prev, currentWord ]);
				audioFail2.play();
				setLifes((prev) => prev - 1);
				const goodButton = four.current.find((button) => button.value === value);
				goodButton.classList.add(classes.goodButton);
				setBlock(true);
				setTimeout(() => {
					goodButton.classList.remove(classes.goodButton);
					setCurrentNumber((prev) => prev + 1);
					setBlock(false);
				}, 2000);
			}
		},
		[ audioFail2, audioSuccess, block, classes.badButton, classes.goodButton, currentSeries, currentWord, endGame ]
	);

	useEffect(
		() => {
			fetchWords();
		},
		[ fetchWords ]
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

	useEffect(
		() => {
			if (!endGame && musicVolume) {
				audioFon.play();
			}
			return () => {
				audioFon.stop();
			};
		},
		[ endGame, audioFon, musicVolume ]
	);

	useEffect(
		() => {
			if ((currentNumber && currentNumber >= wordsArray.length) || !lifes) {
				setTimeout(() => {
					setEndGame(true);
					audioFon.stop();
				}, 2000);
			}
			return () => {
				clearTimeout();
			};
		},
		[ wordsArray, currentNumber, audioFon, lifes ]
	);

	useEffect(
		() => {
			if (wordsArray.length && currentNumber < wordsArray.length) {
				setCurrentWord(wordsArray[currentNumber]);
			}
		},
		[ currentNumber, wordsArray ]
	);

	useEffect(
		() => {
			if (wordsArray.length && currentNumber < wordsArray.length && currentWord) {
				const arr = wordsArray.filter((word) => word.english !== currentWord.english).sort(shuffleAllElements);
				arr.unshift(currentWord);
				const fourArr = arr.slice(0, 4);
				fourArr.sort(shuffleAllElements);
				fourArr.sort(shuffleAllElements);
				setFourButtons(fourArr);
			}
		},
		[ currentWord, wordsArray, currentNumber ]
	);

	useEffect(
		() => {
			if (endGame) return;
			const keyboardClick = (event) => {
				if (!Object.values(keyCodeArray).includes(event.keyCode)) return;
				let elem;
				if (event.keyCode === keyCodeArray.top1 || event.keyCode === keyCodeArray.num1) {
					elem = four.current[0];
				} else if (event.keyCode === keyCodeArray.top2 || event.keyCode === keyCodeArray.num2) {
					elem = four.current[1];
				} else if (event.keyCode === keyCodeArray.top3 || event.keyCode === keyCodeArray.num3) {
					elem = four.current[2];
				} else if (event.keyCode === keyCodeArray.top4 || event.keyCode === keyCodeArray.num4) {
					elem = four.current[3];
				}
				answer(elem.value, true);
			};
			document.addEventListener('keydown', keyboardClick);
			return () => {
				document.removeEventListener('keydown', keyboardClick);
        dispatch(deleteWords());
			};
		},
		[dispatch, answer, endGame ]
	);

	const setFourRef = (btn, index) => {
		if (!btn) return;
		four.current[index] = btn;
	};
	function goFullScreen(elem) {
		setFullScreen((prev) => !prev);
		toggleScreen(elem);
	}
	return (
		<div className={classes.root}>
			<ToastContainer />
			{endGame ? (
				<GameStats lifes={lifes} correctAnswers={correctAnswers} failAnswers={failAnswers} />
			) : wordsArray.length && fourButtons.length ? (
				<div ref={gameBoard} className={classes.gameContainer}>
					<button onClick={() => goFullScreen(gameBoard.current)} className={classes.fullScreenBtn}>
						{fullScreen ? (
							<FullscreenExitIcon className={classes.fullScreenIcon} />
						) : (
							<FullscreenIcon className={classes.fullScreenIcon} />
						)}
					</button>
					<Transition in={!block} timeout={5000} onEntered={(event) => answer(event.dataset.name, false)}>
						{(state) => (
							<Typography data-name={currentWord.english} className={`slide-word ${state}`} variant="h3">
								{currentWord.russian}
							</Typography>
						)}
					</Transition>
					<div className={classes.contentWrap}>
						<div ref={seriesContainer} className={classes.series} />
						<div className={classes.buttonsWrap}>
							{fourButtons.map((item, index) => {
								return (
									<button
										ref={(btn) => setFourRef(btn, index)}
										disabled={block}
										key={index}
										onClick={(event) => answer(event.target.value, true)}
										value={item.english}
										className={classes.button}
									>
										{item.english}
									</button>
								);
							})}
						</div>
						<LifesInGames lifes={lifes} />
						<Typography variant="subtitle1" className={classes.correct}>{`Правильные ответы: ${correctAnswers.length ||
							0}`}</Typography>
						<Typography color="secondary" variant="subtitle1" className={classes.fail}>{`Ошибки: ${failAnswers.length ||
							0}`}</Typography>
					</div>
				</div>
			) : (
				<CircularProgress className={classes.loader} />
			)}
		</div>
	);
};
