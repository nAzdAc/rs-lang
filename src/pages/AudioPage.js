import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import successSong from '../assets/sounds/success.mp3';
import failSong from '../assets/sounds/no.wav';
import failSong2 from '../assets/sounds/fail.mp3';
import failSong3 from '../assets/sounds/fail2.wav';
import { backRoutes } from '../utils/backRoutes';
import { CircularProgress } from '@material-ui/core';
import SpeakerIcon from '@material-ui/icons/Speaker';
import { createSound, shuffleAllElements } from '../utils/helpers';
import { originURL } from '../utils/backRoutes';
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
		justifyContent: 'space-between',
		padding: '40px 20px 20px 20px'
	},
	speaker: {
		width: '150px',
		height: '120px',
		marginBottom: '100px',
		cursor: 'pointer'
	},
	buttonsWrap: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: '100px'
	},
	badButton: {
		borderRadius: '5px',
		border: 'none',
		cursor: 'pointer',
		marginRight: '10px',
		fontWeight: 'bold',
		width: '109px',
		maxWidth: '150px',
		height: '50px',
		background: '#B00020',
		color: '#FFF',
		'&:hover': {
			background: '#E6002A'
		}
	},
	goodButton: {
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
	word: {
		marginBottom: '10px'
	},
	meaning: {
		marginBottom: '110px'
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

export const AudioPage = () => {
	const classes = useStyles();
	const { request } = useHttp();
	const soundVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.soundVolume) || INIT_CONSTS.soundVolume, []);
	const wordVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.wordVolume) || INIT_CONSTS.wordVolume, []);
	const [ endGame, setEndGame ] = useState(false);
	const [ correctAnswers, setCorrectAnswers ] = useState([]);
	const [ failAnswers, setFailAnswers ] = useState([]);
	const [ currentNumber, setCurrentNumber ] = useState(0);
	const [ currentWord, setCurrentWord ] = useState({});
	const [ wordsArray, setWordsArray ] = useState([]);
	const [ allWordsArray, setAllWordsArray ] = useState([]);
	const [ fourButtons, setFourButtons ] = useState([]);

	const audioSuccess = useMemo(() => createSound(successSong, soundVolume), [ soundVolume ]);
	const audioFail = useMemo(() => createSound(failSong, soundVolume), [ soundVolume ]);
	const audioFail2 = useMemo(() => createSound(failSong2, soundVolume), [ soundVolume ]);
	const audioFail3 = useMemo(() => createSound(failSong3, soundVolume), [ soundVolume ]);
	const audioWord = useMemo(() => createSound(`${currentWord.audio}`, wordVolume), [ wordVolume, currentWord ]);

	const fetchWords = useCallback(
		async () => {
			try {
				const data = await request(backRoutes.words, 'GET');
				console.log(data);
				const arr = [];
				const wordsArr = [];
				data.forEach((item) => {
					// console.log(item);
					const audio = `${originURL}/${item.audio}`;
					const english = item.word;
					const transcription = item.transcription;
					const russian = item.wordTranslate;
					const obj = { audio, english, transcription, russian };
					arr.push(obj);
					wordsArr.push(english);
				});
				setWordsArray(arr.sort(shuffleAllElements));
				setAllWordsArray(wordsArr.sort(shuffleAllElements));
				console.log(arr);
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
			if (currentNumber && currentNumber >= wordsArray.length) {
				setEndGame(true);
			}
		},
		[ wordsArray, currentNumber ]
	);

	useEffect(
		() => {
			if (wordsArray.length && allWordsArray.length && currentNumber < wordsArray.length) {
				setCurrentWord(wordsArray[currentNumber]);
			}
		},
		[ currentNumber, wordsArray, allWordsArray ]
	);

	useEffect(
		() => {
			if (currentWord) {
				console.log(currentWord);
				setTimeout(() => {
					audioWord.play();
				}, 1000);
			}
			return () => {
				clearTimeout();
				audioWord.stop();
			};
		},
		[ currentWord, audioWord ]
	);

	useEffect(
		() => {
			if (wordsArray.length && allWordsArray.length && currentNumber < wordsArray.length) {
				const arr = allWordsArray.filter((english) => english !== currentWord.english).sort(shuffleAllElements);
				arr.unshift(currentWord.english);
				const fourArr = arr.slice(0, 4);
				fourArr.sort(shuffleAllElements);
				fourArr.sort(shuffleAllElements);
				console.log(fourArr);
				setFourButtons(fourArr.sort(shuffleAllElements));
			}
		},
		[ currentWord, wordsArray, allWordsArray, currentNumber ]
	);

	function answer(event) {
		const obj = { ...currentWord };
		setCurrentNumber((prev) => prev + 1);
		if (event.target.value === currentWord.english) {
			audioSuccess.play();
			setCorrectAnswers((prev) => [ ...prev, obj ]);
		} else {
			audioFail.play();
			setFailAnswers((prev) => [ ...prev, obj ]);
		}
	}

	function repeat() {
		audioWord.play();
	}

	return (
		<div className={classes.root}>
			{endGame ? <GameStatsPage correctAnswers={correctAnswers} failAnswers={failAnswers} /> : (
				(wordsArray.length && allWordsArray.length && fourButtons.length && currentWord) ? (
					<div className={classes.gameContainer}>
						<SpeakerIcon onClick={repeat} className={classes.speaker} />
						<div className={classes.buttonsWrap}>
							{fourButtons.length &&
								fourButtons.map((english, index) => {
									return (
										<button key={index} onClick={answer} value={english} className={classes.goodButton}>
											{english}
										</button>
									);
								})}
						</div>
						<Typography variant="subtitle1" className={classes.correct}>{`Правильные ответы: ${correctAnswers.length ||
							0}`}</Typography>
						<Typography color="secondary" variant="subtitle1" className={classes.fail}>{`Ошибки: ${failAnswers.length ||
							0}`}</Typography>
					</div>
				) : (
					<CircularProgress className={classes.loader} />
				)
			)}
		</div>
	);
};
