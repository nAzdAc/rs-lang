import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import successSong from '../assets/sounds/success.mp3';
import failSong2 from '../assets/sounds/fail.mp3';
import { CircularProgress } from '@material-ui/core';
import SpeakerIcon from '@material-ui/icons/Speaker';
import { createSound, shuffleAllElements } from '../utils/helpers';
import { GameStats } from '../components/GameStats';
import { toggleScreen } from '../utils/fullScreen';
import { LifesInGames } from '../components/LifesInGames';
import { Howler } from 'howler';
import { useGames } from '../hooks/games.hook';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useStyles } from '../styles/pagesStyles/Games.styles';
import { fourKeyCode } from '../utils/keyCode';
import { originURL } from '../utils/backRoutes';
import { deleteLevel } from '../redux/actions';

export const AudioPage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { getWords } = useGames();
	const { soundVolume, wordVolume } = useSelector((state) => state.settings);
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
	const audioWord = useMemo(() => createSound(`${originURL}/${currentWord.audio}`, wordVolume), [
		wordVolume,
		currentWord
	]);

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
		(word) => {
			console.log(word);
			if (block || !word || endGame) return;
			if (word === currentWord.word) {
				setCorrectAnswers((prev) => [ ...prev, currentWord ]);
				seriesContainer.current.innerHTML += ' <img src="https://img.icons8.com/color/48/000000/hand-drawn-star.png"/>';
				setCurrentSeries((prev) => prev + 1);
				const goodButton = four.current.find((button) => button.value === word);
				goodButton.classList.add(classes.goodButton);
				setBlock(true);
				setTimeout(() => {
					goodButton.classList.remove(classes.goodButton);
					setCurrentNumber((prev) => prev + 1);
					setBlock(false);
				}, 2000);
				audioSuccess.play();
			} else {
				setFailAnswers((prev) => [ ...prev, currentWord ]);
				setAllSeries((prev) => [ ...prev, currentSeries ]);
				setCurrentSeries(0);
				seriesContainer.current.innerHTML = '';
				const goodButton = four.current.find((button) => button.value === currentWord.word);
				const badButton = four.current.find((button) => button.value === word);
				goodButton.classList.add(classes.goodButton);
				badButton.classList.add(classes.badButton);
				setBlock(true);
				setTimeout(() => {
					goodButton.classList.remove(classes.goodButton);
					badButton.classList.remove(classes.badButton);
					setCurrentNumber((prev) => prev + 1);
					setBlock(false);
				}, 2000);
				audioFail2.play();
				setLifes((prev) => prev - 1);
			}
		},
		[ audioFail2, audioSuccess, block, classes.badButton, classes.goodButton, currentSeries, currentWord, endGame ]
	);

	useEffect(
		() => {
			if ((currentNumber && currentNumber >= wordsArray.length) || !lifes) {
				setBlock(true);
				setTimeout(() => {
					setEndGame(true);
				}, 2000);
			}
		},
		[ wordsArray, currentNumber, lifes, correctAnswers, allSeries, failAnswers ]
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
			if (currentWord && !block) {
				Howler.stop();
				setTimeout(() => {
					audioWord.play();
				}, 200);
			}
			return () => {
				clearTimeout();
			};
		},
		[ currentWord, audioWord, block, endGame ]
	);

	useEffect(
		() => {
			if (wordsArray.length && currentNumber < wordsArray.length) {
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
				answer(elem.value);
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

	function repeat() {
		Howler.stop();
		audioWord.play();
	}

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
				<GameStats
					allSeries={allSeries}
					gameName="audio"
					lifes={lifes}
					correctAnswers={correctAnswers}
					failAnswers={failAnswers}
				/>
			) : wordsArray.length && fourButtons.length === 4 && currentWord ? (
				<div ref={gameBoard} className={classes.gameContainer}>
					<button onClick={() => goFullScreen(gameBoard.current)} className={classes.fullScreenBtn}>
						{fullScreen ? (
							<FullscreenExitIcon className={classes.fullScreenIcon} />
						) : (
							<FullscreenIcon className={classes.fullScreenIcon} />
						)}
					</button>
					<SpeakerIcon onClick={repeat} className={classes.speaker} />
					<div ref={seriesContainer} className={classes.series} />
					<div className={classes.buttonsWrap}>
						{fourButtons.map((item, index) => {
							return (
								<button
									disabled={block}
									ref={(btn) => setFourRef(btn, index)}
									key={index}
									onClick={(event) => answer(event.target.value)}
									value={item.word}
									className={classes.button}
								>
									{item.wordTranslate}
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
			) : (
				<CircularProgress className={classes.loader} />
			)}
		</div>
	);
};
