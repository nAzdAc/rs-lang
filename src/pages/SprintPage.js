import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import fonSong from '../assets/sounds/fon.mp3';
import successSong from '../assets/sounds/success.mp3';
import failSong from '../assets/sounds/no.wav';
import { backRoutes } from '../utils/backRoutes';
import { CircularProgress } from '@material-ui/core';
import { createSound, shuffleAllElements, getRandomInt } from '../utils/helpers';
import { GameStatsPage } from './GameStatsPage';
import { useHttp } from '../hooks/http.hook';

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
	const { request } = useHttp();
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

	const audioSuccess = useMemo(() => createSound(successSong, soundVolume), [ soundVolume ]);
	const audioFail = useMemo(() => createSound(failSong, soundVolume), [ soundVolume ]);
	const audioFon = useMemo(() => createSound(fonSong, musicVolume * 0.1, 1, true), [ musicVolume ]);

	const fetchWords = useCallback(async () => {
		try {
			const data = await request(backRoutes.words, 'GET');
			console.log(data);
			const arr = [];
			data.forEach((item) => {
				const english = item.word;
				const russian = item.wordTranslate;
				const obj = { english, russian };
				arr.push(obj);
			});
			arr.sort(shuffleAllElements);
			setWordsArray(arr);
		} catch (e) {
			console.log(e);
		}
	}, [request]);

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
					// console.log(num);
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

	function answer(value) {
		const obj = { ...currentWord };
		setCurrentNumber((prev) => prev + 1);
		if (
			(value === 'true' && currentWord.russian === currentRussianhWord) ||
			(value === 'false' && currentWord.russian !== currentRussianhWord)
		) {
			audioSuccess.play();
      setCorrectAnswers((prev) => [ ...prev, obj ]);
		} else {
			audioFail.play();
      setFailAnswers((prev) => [ ...prev, obj ]);
		}
	}

	useEffect(
		() => {
			if (!endGame) {
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
		[ endGame, audioFon ]
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

	return (
		<div className={classes.root}>
			{endGame ? <GameStatsPage correctAnswers={correctAnswers} failAnswers={failAnswers} /> : (
				(wordsArray.length && currentWord) ? (
					<div className={classes.gameContainer}>
						<Typography variant="h5">Осталось: </Typography>
						<Typography variant="h2">{seconds}</Typography>
						<Typography variant="h4">{`${currentWord.english || ''} = ${currentRussianhWord || ''}`}</Typography>
						<div className={classes.buttonsWrap}>
							<button className={classes.badButton} onClick={(event) => answer(event.target.value)} value={false}>
								НЕ ВЕРНО
							</button>
							<button className={classes.goodButton} onClick={(event) => answer(event.target.value)} value={true}>
								ВЕРНО
							</button>
						</div>
						<Typography variant="subtitle1" className={classes.answer}>{`Правильные ответы: ${correctAnswers.length}`}</Typography>
						<Typography color='secondary' variant="subtitle1" className={classes.answer}>{`Ошибки: ${failAnswers.length}`}</Typography>
					</div>
				) : (
					<CircularProgress className={classes.loader} />
				)
			)}
		</div>
	);
};