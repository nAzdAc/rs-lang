import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import successSong from '../assets/sounds/success.mp3';
import failSong from '../assets/sounds/no.wav';
import failSong2 from '../assets/sounds/fail.mp3';
import failSong3 from '../assets/sounds/fail2.wav';
import fonSong from '../assets/sounds/fon.mp3';
import { backRoutes } from '../utils/backRoutes';
import { Box, CircularProgress } from '@material-ui/core';
import { createSound, shuffleAllElements } from '../utils/helpers';
import { GameStatsPage } from './GameStatsPage';
import { useHttp } from '../hooks/http.hook';
import classNames from 'classnames/bind';
import { Transition } from 'react-transition-group';

const StyledRating = withStyles({
	iconFilled: {
		color: '#ff6d75'
	}
})(Rating);

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
		padding: '60px 0px 40px 0px'
	},
	heart: {
		fontSize: '2.5rem'
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
		marginBottom: '50px'
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
	}
});

export const SavannaPage = () => {
	const classes = useStyles();
	const styles = classNames.bind(classes);
	const { request } = useHttp();
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
	const [ fail, setFail ] = useState(false);
	const [ correct, setCorrect ] = useState(false);
	const [ slide, setSlide ] = useState(false);
	const [ block, setBlock ] = useState(true);
	const buttonStyles = styles('button');
	const audioSuccess = useMemo(() => createSound(successSong, soundVolume), [ soundVolume ]);
	const audioFail = useMemo(() => createSound(failSong, soundVolume), [ soundVolume ]);
	const audioFail2 = useMemo(() => createSound(failSong2, soundVolume), [ soundVolume ]);
	const audioFail3 = useMemo(() => createSound(failSong3, soundVolume), [ soundVolume ]);
	const audioFon = useMemo(() => createSound(fonSong, musicVolume * 0.1, 1, true), [ musicVolume ]);
	const four = useRef([]);

	const fetchWords = useCallback(
		async () => {
			try {
				const data = await request(backRoutes.words, 'GET');
				const arr = data.map((item) => {
					return { english: item.word, russian: item.wordTranslate };
				});
				arr.sort(shuffleAllElements);
				setWordsArray(arr);
				setTimeout(() => {
					setBlock(false);
				}, 500);
			} catch (e) {
				console.log(e);
			}
		},
		[ request ]
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
			if (wordsArray.length && currentNumber < wordsArray.length) {
				const arr = wordsArray.filter((item) => item.english !== currentWord.english).sort(shuffleAllElements);
				arr.unshift(currentWord);
				const fourArr = arr.slice(0, 4);
				fourArr.sort(shuffleAllElements);
				fourArr.sort(shuffleAllElements);

				setFourButtons(fourArr);
			}
		},
		[ currentWord, wordsArray, currentNumber ]
	);

	function answer(event) {
		// console.log(four.current)
		const obj = { ...currentWord };
		if (event.target) {
			console.log(event.target.innerHTML);
			next();
			if (event.target.innerHTML === currentWord.english) {
				const goodButton = four.current.find((button) => button.innerHTML === event.target.innerHTML);
				goodButton.classList.add(classes.goodButton);
				setBlock(true);
				setTimeout(() => {
					goodButton.classList.remove(classes.goodButton);
					setCurrentNumber((prev) => prev + 1);
					setBlock(false);
				}, 2000);
				audioSuccess.play();
				setCorrectAnswers((prev) => [ ...prev, obj ]);
			} else {
				const goodButton = four.current.find((button) => button.innerHTML === currentWord.english);
				const badButton = four.current.find((button) => button.innerHTML === event.target.innerHTML);
				goodButton.classList.add(classes.goodButton);
				badButton.classList.add(classes.badButton);
				setTimeout(() => {
					goodButton.classList.remove(classes.goodButton);
					badButton.classList.remove(classes.badButton);
					setCurrentNumber((prev) => prev + 1);
					setBlock(false);
				}, 2000);
				audioFail2.play();
				setFailAnswers((prev) => [ ...prev, obj ]);
				setLifes((prev) => prev - 1);
			}
		} else {
			console.log(event.innerHTML);
			const goodButton = four.current.find((button) => button.value === event.innerHTML);
			goodButton.classList.add(classes.goodButton);
			console.log(goodButton);
			setBlock(true);
			setTimeout(() => {
				goodButton.classList.remove(classes.goodButton);
				setCurrentNumber((prev) => prev + 1);
				setBlock(false);
			}, 2000);
			audioFail2.play();
			setFailAnswers((prev) => [ ...prev, obj ]);
			setLifes((prev) => prev - 1);
		}
	}

	function next() {
		setBlock(true);
		setTimeout(() => {
			setCurrentNumber((prev) => prev + 1);
			setBlock(false);
		}, 2000);
	}

	const setFourRef = (btn, index) => {
		if (!btn) return;
		four.current[index] = btn;
	};

	return (
		<div className={classes.root}>
			{endGame ? (
				<GameStatsPage lifes={lifes} correctAnswers={correctAnswers} failAnswers={failAnswers} />
			) : wordsArray.length && currentWord && fourButtons.length === 4 ? (
				<div className={classes.gameContainer}>
					<Transition
						in={!block}
						timeout={5000}
						// onEnter={() => console.log('onEnter')}
						// onEntering={() => console.log('onEntering')}
						onEntered={answer}
						// onExiting={() => console.log('onExiting')}
						// onExited={() => console.log('onExited')}
						// onExit={() => console.log('onExit')}
					>
						{(state) => (
							<Typography value={currentWord.russian} className={`slide-word ${state}`} variant="h3">
								{currentWord.russian}
							</Typography>
						)}
					</Transition>
					<div className={classes.contentWrap}>
						<div className={classes.buttonsWrap}>
							{fourButtons.length &&
								fourButtons.map((item, index) => {
									return (
										<button
											ref={(btn) => setFourRef(btn, index)}
											disabled={block}
											key={index}
											onClick={answer}
											value={item.russian}
											className={buttonStyles}
										>
											{item.english}
										</button>
									);
								})}
						</div>
						<Box component="fieldset" mb={3} borderColor="transparent">
							<StyledRating
								name="customized-color"
								readOnly={true}
								value={lifes || 0}
								icon={<FavoriteIcon className={classes.heart} />}
							/>
						</Box>
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
