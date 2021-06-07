import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import fonSong from '../assets/sounds/fon.mp3';
import successSong from '../assets/sounds/success.mp3';
import failSong2 from '../assets/sounds/fail.mp3';
import { CircularProgress } from '@material-ui/core';
import { convertText, createSound, shuffleAllElements } from '../utils/helpers';
import { GameStats } from '../components/GameStats';
import { toggleScreen } from '../utils/fullScreen';
import { LifesInGames } from '../components/LifesInGames';
import { useGames } from '../hooks/games.hook';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveWords, setLevel } from '../redux/actions';
import { useStyles } from '../styles/pagesStyles/Games.styles';
import { fourKeyCode } from '../utils/constants';
import { originURL } from '../utils/backRoutes';
import { GamesProgressBar } from '../components/GamesProgressBar';

export const MatchPage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { getWords } = useGames();
	const { soundVolume, musicVolume } = useSelector((state) => state.settings);
	const [ endGame, setEndGame ] = useState(false);
	const [ wordsArray, setWordsArray ] = useState([]);
	const [ correctAnswers, setCorrectAnswers ] = useState([]);
	const [ failAnswers, setFailAnswers ] = useState([]);
	const [ currentWord, setCurrentWord ] = useState({});
	const [ currentNumber, setCurrentNumber ] = useState(0);
	const [ fourImages, setFourImages ] = useState([]);
	const [ lifes, setLifes ] = useState(5);
	const [ block, setBlock ] = useState(true);
	const [ currentSeries, setCurrentSeries ] = useState(0);
	const [ allSeries, setAllSeries ] = useState([]);
	const seriesContainer = useRef('');
	const [ fullScreen, setFullScreen ] = useState(false);
	const four = useRef([]);
	const gameBoard = useRef();

	const audioSuccess = useMemo(() => createSound(successSong, soundVolume), [ soundVolume ]);
	const audioFail = useMemo(() => createSound(failSong2, soundVolume), [ soundVolume ]);
	const audioFon = useMemo(() => createSound(fonSong, musicVolume * 0.1, 1, true), [ musicVolume ]);

	const playWords = useCallback(
		async () => {
			const words = await getWords();
			console.log(words);
			setWordsArray(words);
			setTimeout(() => {
				setBlock(false);
			}, 200);
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
		(src) => {
			if (block || !src || endGame) return;
			if (src === currentWord.image) {
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
				const goodOverlay = four.current.find((elem) => elem.dataset.name === currentWord.image);
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
			};
		},
		[ dispatch, answer, endGame ]
	);

	useEffect(
		() => {
			return () => {
				dispatch(setLevel(null));
				dispatch(setActiveWords([]));
			};
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			if (wordsArray.length && currentNumber < wordsArray.length) {
				const arr = wordsArray.filter((word) => word.image !== currentWord.image).sort(shuffleAllElements);
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
			{endGame ? (
				<GameStats
					allSeries={allSeries}
					gameName="match"
					lifes={lifes}
					correctAnswers={correctAnswers}
					failAnswers={failAnswers}
				/>
			) : wordsArray.length && currentWord && fourImages.length === 4 ? (
				<div ref={gameBoard} className={classes.gameContainer}>
					<GamesProgressBar currentNumber={currentNumber} allNumber={wordsArray.length} />
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
								<div key={`${image.image}Match`} className={classes.imageWrap}>
									<div data-name={image.image} ref={(elem) => setFourRef(elem, index)} className={classes.overlay} />
									<img
										className={classes.image}
										onClick={(event) => answer(event.target.dataset.name)}
										data-name={image.image}
										src={`${originURL}/${image.image}`}
										alt={image.image}
									/>
								</div>
							);
						})}
					</div>
					<h3 className={classes.currentWord}>{`${currentWord.word || ''}`}</h3>
					<p className={classes.example}>{`${convertText(currentWord.textExample)}` || ''}</p>
					<div ref={seriesContainer} className={classes.series} />
					<LifesInGames lifes={lifes} />
					<h4 className={classes.progressText}>
						Правильные ответы:&#160;
						<span className={classes.correctText}>{correctAnswers.length || 0}</span>
					</h4>
					<h4 className={classes.progressText}>
						Ошибки:&#160;
						<span className={classes.failText}>{failAnswers.length || 0}</span>
					</h4>
				</div>
			) : (
				<CircularProgress className={classes.loader} />
			)}
		</div>
	);
};
