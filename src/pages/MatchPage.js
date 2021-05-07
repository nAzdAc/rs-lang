import React, { useCallback, useEffect, useMemo, useRef, useState, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import fonSong from '../assets/sounds/fon.mp3';
import successSong from '../assets/sounds/success.mp3';
import failSong2 from '../assets/sounds/fail.mp3';
import { backRoutes } from '../utils/backRoutes';
import { CircularProgress } from '@material-ui/core';
import { createSound, getRandomInt, getWordsForPlay, shuffleAllElements } from '../utils/helpers';
import { originURL } from '../utils/backRoutes';
import { GameStats } from '../components/GameStats';
import { useHttp } from '../hooks/http.hook';
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
import { useStyles } from '../styles/pagesStyles/Games.styles';
import { fourKeyCode } from '../utils/keyCode';
import { convertText } from '../utils/helpers';

export const MatchPage = () => {
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
	const [ fourImages, setFourImages ] = useState([]);
	const [ lifes, setLifes ] = useState(5);
	const [ block, setBlock ] = useState(true);
	const [ currentSeries, setCurrentSeries ] = useState(0);
	const [ allSeries, setAllSeries ] = useState([]);
	const seriesContainer = useRef('');

	const audioSuccess = useMemo(() => createSound(successSong, soundVolume), [ soundVolume ]);
	const audioFail = useMemo(() => createSound(failSong2, soundVolume), [ soundVolume ]);
	const audioFon = useMemo(() => createSound(fonSong, musicVolume * 0.1, 1, true), [ musicVolume ]);
	const four = useRef([]);
	const [ fullScreen, setFullScreen ] = useState(false);
	const gameBoard = useRef();

	const dispatch = useDispatch();

	const wordsRedux = useSelector((state) => state.words.wordsRedux);
	const levelRedux = useSelector((state) => state.level.level);

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
						meaning: convertText(item.textMeaning),
						src: `${originURL}/${item.image}`,
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
		[ levelRedux, request, token, userId, wordsRedux ]
	);

	useEffect(
		() => {
			if (endGame) {
				postStats('match', correctAnswers, failAnswers, allSeries);
				postAnswers(correctAnswers, failAnswers);
			}
		},
		[ allSeries, correctAnswers, endGame, failAnswers, postAnswers, postStats ]
	);

	const answer = useCallback(
		(src) => {
			if (block || !src || endGame) return;
			if (src === currentWord.src) {
				seriesContainer.current.innerHTML += ' <img src="https://img.icons8.com/color/48/000000/hand-drawn-star.png"/>';
				setCurrentSeries((prev) => prev + 1);
				setCorrectAnswers((prev) => [ ...prev, currentWord ]);
				const goodOverlay = four.current.find((elem) => elem.dataset.name === src);
				goodOverlay.classList.add(classes.goodOverlay);
				setBlock(true);
				setTimeout(() => {
					goodOverlay.classList.remove(classes.goodOverlay);
					setCurrentNumber((prev) => prev + 1);
					setBlock(false);
				}, 2000);
				audioSuccess.play();
			} else {
				setAllSeries((prev) => [ ...prev, currentSeries ]);
				setCurrentSeries(0);
				seriesContainer.current.innerHTML = '';
				setFailAnswers((prev) => [ ...prev, currentWord ]);
				setLifes((prev) => prev - 1);
				const goodOverlay = four.current.find((elem) => elem.dataset.name === currentWord.src);
				const badOverlay = four.current.find((elem) => elem.dataset.name === src);
				goodOverlay.classList.add(classes.goodOverlay);
				badOverlay.classList.add(classes.badOverlay);
				setBlock(true);
				setTimeout(() => {
					goodOverlay.classList.remove(classes.goodOverlay);
					badOverlay.classList.remove(classes.badOverlay);
					setCurrentNumber((prev) => prev + 1);
					setBlock(false);
				}, 2000);
				audioFail.play();
			}
		},
		[ audioFail, audioSuccess, block, classes.badOverlay, classes.goodOverlay, currentSeries, currentWord, endGame ]
	);

	useEffect(
		() => {
			fetchWords();
		},
		[ fetchWords ]
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
		[ endGame, musicVolume, audioFon ]
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
			if (endGame) return;
			const keyboardClick = (event) => {
				if (!Object.values(fourKeyCode).includes(event.keyCode)) return;
				let elem;
				if (event.keyCode === fourKeyCode.top1 || event.keyCode === fourKeyCode.num1) {
					elem = four.current[0];
				} else if (event.keyCode === fourKeyCode.top2 || event.keyCode === fourKeyCode.num2) {
					elem = four.current[1];
				} else if (event.keyCode === fourKeyCode.top3 || event.keyCode === fourKeyCode.num3) {
					elem = four.current[2];
				} else if (event.keyCode === fourKeyCode.top4 || event.keyCode === fourKeyCode.num4) {
					elem = four.current[3];
				}
				answer(elem.dataset.name);
			};
			document.addEventListener('keydown', keyboardClick);
			return () => {
				document.removeEventListener('keydown', keyboardClick);
				dispatch(deleteWords());
			};
		},
		[ dispatch, answer, endGame ]
	);

	useEffect(
		() => {
			return () => {
				dispatch(deleteWords());
				dispatch(deleteLevel());
			};
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			if (wordsArray.length && currentNumber < wordsArray.length) {
				const arr = wordsArray.filter((word) => word.src !== currentWord.src).sort(shuffleAllElements);
				arr.unshift(currentWord);
				const fourArr = arr.slice(0, 4);
				fourArr.sort(shuffleAllElements);
				fourArr.sort(shuffleAllElements);
				setFourImages(fourArr);
			}
		},
		[ currentWord, wordsArray, currentNumber ]
	);

	const setFourRef = (elem, index) => {
		if (!elem) return;
		four.current[index] = elem;
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
			) : wordsArray.length && currentWord && fourImages.length === 4 ? (
				<div ref={gameBoard} className={classes.gameContainer}>
					<button onClick={() => goFullScreen(gameBoard.current)} className={classes.fullScreenBtn}>
						{fullScreen ? (
							<FullscreenExitIcon className={classes.fullScreenIcon} />
						) : (
							<FullscreenIcon className={classes.fullScreenIcon} />
						)}
					</button>
					<div className={classes.imagesContainer}>
						{fourImages.map((image, index) => {
							return (
								<div key={index} className={classes.imageWrap}>
									<div data-name={image.src} ref={(elem) => setFourRef(elem, index)} className={classes.overlay} />
									<img
										className={classes.image}
										onClick={(event) => answer(event.target.dataset.name)}
										data-name={image.src}
										src={image.src}
										alt={image.src}
									/>
								</div>
							);
						})}
					</div>
					<Typography className={classes.word} variant="h3">{`${currentWord.english || ''}`}</Typography>
					<Typography className={classes.meaning} variant="h5">{`${currentWord.meaning || ''}`}</Typography>
					<div ref={seriesContainer} className={classes.series} />
					<LifesInGames lifes={lifes} />
					<Typography
						variant="subtitle1"
						className={classes.correct}
					>{`Правильные ответы: ${correctAnswers.length}`}</Typography>
					<Typography
						color="secondary"
						variant="subtitle1"
						className={classes.fail}
					>{`Ошибки: ${failAnswers.length}`}</Typography>
				</div>
			) : (
				<CircularProgress className={classes.loader} />
			)}
		</div>
	);
};
