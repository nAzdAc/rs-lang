import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import successSong from '../assets/sounds/success.mp3';
import failSong2 from '../assets/sounds/fail.mp3';
import fonSong from '../assets/sounds/fon.mp3';
import { CircularProgress } from '@material-ui/core';
import { createSound, shuffleAllElements } from '../utils/helpers';
import { GameStats } from '../components/GameStats';
import { Transition } from 'react-transition-group';
import { toggleScreen } from '../utils/fullScreen';
import { LifesInGames } from '../components/LifesInGames';
import { useGames } from '../hooks/games.hook';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveWords, setLevel } from '../redux/actions';
import { useStyles } from '../styles/pagesStyles/Games.styles';
import { fourKeyCode } from '../utils/constants';
import { GamesProgressBar } from '../components/GamesProgressBar';
import { Howler } from 'howler';

export const SavannaPage = (props) => {
	const { soundVolume, musicVolume, theme } = useSelector((state) => state.settings);
	const classes = useStyles({ theme });
	const dispatch = useDispatch();
	const { getWords } = useGames();
	const [ endGame, setEndGame ] = useState(false);
	const [ wordsArray, setWordsArray ] = useState([]);
	const [ correctAnswers, setCorrectAnswers ] = useState([]);
	const [ failAnswers, setFailAnswers ] = useState([]);
	const [ currentNumber, setCurrentNumber ] = useState(0);
	const [ currentWord, setCurrentWord ] = useState({});
	const [ fourButtons, setFourButtons ] = useState([]);
	const [ lifes, setLifes ] = useState(5);
	const [ block, setBlock ] = useState(true);
	const four = useRef([]);
	const [ fullScreen, setFullScreen ] = useState(false);
	const [ currentSeries, setCurrentSeries ] = useState(0);
	const [ allSeries, setAllSeries ] = useState([]);
	const gameBoard = useRef();
	const seriesContainer = useRef('');

	const audioSuccess = useMemo(() => createSound(successSong, soundVolume), [ soundVolume ]);
	const audioFail2 = useMemo(() => createSound(failSong2, soundVolume), [ soundVolume ]);
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
		(value, click) => {
			if (block || endGame || !value) return;
			if (click) {
				if (value === currentWord.word) {
					seriesContainer.current.innerHTML +=
						' <img src="https://img.icons8.com/color/48/000000/hand-drawn-star.png"/>';
					setCurrentSeries((prev) => prev + 1);
					setCorrectAnswers((prev) => [ ...prev, currentWord ]);
					audioSuccess.play();
					const correctButton = four.current.find((button) => button.value === value);
					correctButton.className = classes.correctButton;
					setBlock(true);
					setTimeout(() => {
						correctButton.className = classes.button;
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
					const correctButton = four.current.find((button) => button.value === currentWord.word);
					const failButton = four.current.find((button) => button.value === value);
					correctButton.className = classes.correctButton;
					failButton.className = classes.failButton;
					setBlock(true);
					setTimeout(() => {
						correctButton.className = classes.button;
						failButton.className = classes.button;
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
				const correctButton = four.current.find((button) => button.value === value);
				correctButton.className = classes.correctButton;
				setBlock(true);
				setTimeout(() => {
					correctButton.className = classes.button;
					setCurrentNumber((prev) => prev + 1);
					setBlock(false);
				}, 2000);
			}
		},
		[
			classes.correctButton,
			classes.failButton,
			classes.button,
			block,
			endGame,
			currentWord,
			audioSuccess,
			audioFail2,
			currentSeries
		]
	);

	useEffect(
		() => {
			if (!endGame && musicVolume) {
				audioFon.play();
			}
			return () => {
				Howler.stop();
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
				const arr = wordsArray.filter((word) => word.word !== currentWord.word).sort(shuffleAllElements);
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
				answer(elem.value, true);
			};
			document.addEventListener('keydown', keyboardClick);
			return () => {
				document.removeEventListener('keydown', keyboardClick);
			};
		},
		[ dispatch, answer, endGame ]
	);

	const setFourRef = (btn, index) => {
		if (!btn) return;
		four.current[index] = btn;
	};

	useEffect(
		() => {
			return () => {
				dispatch(setLevel(null));
				dispatch(setActiveWords([]));
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
			{endGame ? (
				<GameStats
					allSeries={allSeries}
					gameName="savanna"
					lifes={lifes}
					correctAnswers={correctAnswers}
					failAnswers={failAnswers}
				/>
			) : wordsArray.length && fourButtons.length ? (
				<div ref={gameBoard} className={classes.gameContainer}>
					<GamesProgressBar currentNumber={currentNumber} allNumber={wordsArray.length} />
					<button onClick={() => goFullScreen(gameBoard.current)} className={classes.fullScreenBtn}>
						{fullScreen ? (
							<FullscreenExitIcon className={classes.fullScreenIcon} />
						) : (
							<FullscreenIcon className={classes.fullScreenIcon} />
						)}
					</button>
					<Transition in={!block} timeout={5000} onEntered={(event) => answer(event.dataset.name, false)}>
						{(state) => (
							<h3 data-name={currentWord.word} className={`${classes.savannaWord} ${state}`}>
								{currentWord.wordTranslate}
							</h3>
						)}
					</Transition>
					<hr className={classes.finishLine} />
					<div className={classes.buttonsWrap}>
						{fourButtons.map((item, index) => {
							return (
								<button
									ref={(btn) => setFourRef(btn, index)}
									disabled={block}
									key={`${item.word}Savanna`}
									onClick={(event) => answer(event.target.value, true)}
									value={item.word}
									className={classes.button}
								>
									{item.word}
								</button>
							);
						})}
					</div>
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
