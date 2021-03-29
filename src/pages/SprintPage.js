import React, { useCallback, useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import { Button } from '@material-ui/core';
import TransitionsModal from '../components/EndGameModal';
import useSound from 'use-sound';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import fonSong from '../sounds/fon.mp3';
import successSong from '../sounds/success.mp3';
import failSong from '../sounds/no.wav';
import { Howl } from 'howler';
import { backRoutes } from '../utils/backRoutes';
import { CircularProgress } from '@material-ui/core';
import { shuffleAllElements, getRandomInt } from '../utils/helpers';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	gameContainer: {
		width: '90%',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: '20px'
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
	}
});

export const SprintPage = () => {
	const classes = useStyles();
	const volume = localStorage.getItem(LOCAL_STORAGE_KEY.volume) || INIT_CONSTS.volume;
	const [ endGame, setEndGame ] = useState(false);
	const [ fail, setFail ] = useState(0);
	const [ correct, setCorrect ] = useState(0);
	const [ seconds, setSeconds ] = useState(60);
	const [ wordsArray, setWordsArray ] = useState([]);
	const [ currentEnglishWord, setCurrentEnglishWord ] = useState('');
	const [ currentRussianhWord, setCurrentRussianhWord ] = useState('');
	const [ currentNumber, setCurrentNumber ] = useState(0);
	const timer = useRef();

	const [ playSuccess ] = useSound(successSong, {
		volume: 0.01 * volume
	});
	const [ playFail ] = useSound(failSong, {
		volume: 0.01 * volume
	});
	const fonSound = new Howl({
		src: [ fonSong ],
		loop: true,
		volume: 0.001 * volume
	});

	const fetchWords = useCallback(async () => {
		try {
			const result = await fetch(backRoutes.words, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await result.json();
			console.log(data);
			const arr = [];
			data.map((item) => {
				// console.log(item);
				const english = item.word;
				const russian = item.wordTranslate;
				const obj = { english, russian };
				arr.push(obj);
			});
			const shuffledArr = arr.sort(shuffleAllElements);
			setWordsArray(shuffledArr);
			console.log(shuffledArr);
			// console.log(arr[0].english);
		} catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(
		() => {
			fetchWords();
		},
		[ fetchWords ]
	);

	useEffect(
		() => {
			if (wordsArray.length > 1 && currentNumber < wordsArray.length) {
				setCurrentEnglishWord((prev) => (prev = wordsArray[currentNumber].english));
				setCurrentRussianhWord((prev) => {
					const num = Math.random();
					// console.log(num);
					if (num > 0.5) {
						prev = wordsArray[currentNumber].russian;
					} else {
						const number = getRandomInt(0, wordsArray.length);
						prev = wordsArray[number].russian;
					}
					return prev;
				});
			}
		},
		[ currentNumber, wordsArray ]
	);

	function answer(value) {
		// console.log(value);
		// const english = wordsArray[currentNumber].english;
		const russian = wordsArray[currentNumber].russian;
		setCurrentNumber((prev) => prev + 1);
		console.log(russian === currentRussianhWord);
		console.log(`original: ${russian}   current : ${currentRussianhWord}`);
		if (
			(value === 'true' && russian === currentRussianhWord) ||
			(value === 'false' && russian !== currentRussianhWord)
		) {
			playSuccess();
			setCorrect((prev) => prev + 1);
		} else {
			playFail();
			setFail((prev) => prev + 1);
		}
	}

	useEffect(
		() => {
			if (!endGame) {
				fonSound.play();
				timer.current = setInterval(() => {
					setSeconds((prev) => prev - 1);
				}, 1000);
			}
			return () => {
				clearInterval(timer.current);
				fonSound.stop();
			};
		},
		[ endGame, volume ]
	);

	useEffect(
		() => {
			if (seconds === 0 || (currentNumber && currentNumber >= wordsArray.length)) {
				setEndGame(true);
				clearInterval(timer.current);
				fonSound.stop();
			}
		},
		[ seconds, wordsArray, currentNumber ]
	);

	return (
		<div className={classes.root}>
			{wordsArray ? (
				<div className={classes.gameContainer}>
					<Typography variant="h5">Осталось: </Typography>
					<Typography variant="h2">{seconds}</Typography>
					<Typography variant="h5">{`${currentEnglishWord || ''} = ${currentRussianhWord || ''}`}</Typography>
					<div className={classes.buttonsWrap}>
						<button className={classes.badButton} onClick={(event) => answer(event.target.value)} value={false}>
							НЕ ВЕРНО
						</button>
						<button className={classes.goodButton} onClick={(event) => answer(event.target.value)} value={true}>
							ВЕРНО
						</button>
					</div>
					<Typography variant="subtitle1" className={classes.question}>{`Правильные ответы: ${correct}`}</Typography>
					<Typography variant="subtitle1" className={classes.question}>{`Ошибки: ${fail}`}</Typography>
					{endGame && <TransitionsModal correct={correct} fail={fail} />}
				</div>
			) : (
				<CircularProgress className={classes.loader} />
			)}
		</div>
	);
};

// <Button key={false} disableElevation onClick={(event) => (answer(event.target))} defaultValue={false} variant="contained" size="medium" className={classes.badButton}>
// 				НЕ ВЕРНО
// 			</Button>
// 			<Button key={true} onClick={(event) => (answer(event.target.key))} defaultValue={true} variant="contained" size="medium" className={classes.goodButton}>
// 				ВЕРНО
// 			</Button>
