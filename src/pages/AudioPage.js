import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import successSong from '../sounds/success.mp3';
import failSong from '../sounds/no.wav';
import { backRoutes } from '../utils/backRoutes';
import { CircularProgress } from '@material-ui/core';
import SpeakerIcon from '@material-ui/icons/Speaker';
import { createSound, shuffleAllElements } from '../utils/helpers';
import { originURL } from '../utils/backRoutes';
import { GameStatsPage } from './GameStatsPage';
import { Howl } from 'howler';

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
	const soundVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.soundVolume) || INIT_CONSTS.soundVolume, []);
	const wordVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.wordVolume) || INIT_CONSTS.wordVolume, []);
	const [ endGame, setEndGame ] = useState(false);
	const [ allCorrectArray, setAllCorrectArray ] = useState([]);
	const [ allFailArray, setAllFailArray ] = useState([]);
	const [ currentNumber, setCurrentNumber ] = useState(0);
	const [ currentWord, setCurrentWord ] = useState({});
	const [ wordsArray, setWordsArray ] = useState([]);
	const [ allWordsArray, setAllWordsArray ] = useState([]);
	const [ fourButtons, setFourButtons ] = useState([]);

	const audioSuccess = useMemo(() => createSound(successSong, soundVolume), [ soundVolume ]);
	const audioFail = useMemo(() => createSound(failSong, soundVolume), [ soundVolume ]);
	const audioWord = new Howl({
    src: `${originURL}/${currentWord.audio}`,
    volume: 0.01 * wordVolume
  });

	const fetchWords = useCallback(async () => {
		try {
			const result = await fetch(`${backRoutes.words}?group=1`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await result.json();
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
			arr.sort(shuffleAllElements);
			wordsArr.sort(shuffleAllElements);
			setWordsArray(arr);
			setAllWordsArray(wordsArr);
			console.log(arr);
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
			if (currentNumber && currentNumber >= wordsArray.length) {
				setEndGame(true);
			}
		},
		[ wordsArray, currentNumber ]
	);

	useEffect(
		() => {
			if (wordsArray.length > 1 && allWordsArray.length > 1 && currentNumber < wordsArray.length) {
				setCurrentWord(wordsArray[currentNumber]);
			}
		},
		[ currentNumber, wordsArray, allWordsArray ]
	);

	useEffect(
		() => {
			if (currentWord) {
				console.log(currentWord)
				setTimeout(() => {
					audioWord.play();
				}, 1000);
			}
			return () => {
				clearTimeout();
			};
		},
		[ currentWord ]
	);

	useEffect(
		() => {
			if (wordsArray.length > 1 && allWordsArray.length > 1 && currentNumber < wordsArray.length) {
				const arr = allWordsArray.filter((english) => english !== currentWord.english).sort(shuffleAllElements);
				arr.unshift(currentWord.english);
				const fourArr = arr.slice(0, 4);
				fourArr.sort(shuffleAllElements);
				fourArr.sort(shuffleAllElements);
				console.log(fourArr);
				setFourButtons(fourArr);
			}
		},
		[ currentWord, wordsArray, allWordsArray, currentNumber ]
	);

	function answer(event) {
		const obj = { ...currentWord };
		setCurrentNumber((prev) => prev + 1);
		const value = event.target.value;
		if (value === currentWord.english) {
			audioSuccess.play();
			setAllCorrectArray((prev) => [ ...prev, obj ]);
		} else {
			audioFail.play();
			setAllFailArray((prev) => [ ...prev, obj ]);
		}
	}

	function repeat() {
		audioWord.play();
	}

	return (
		<div className={classes.root}>
			{wordsArray && allWordsArray ? (
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
					<Typography variant="subtitle1" className={classes.correct}>{`Правильные ответы: ${allCorrectArray.length ||
						0}`}</Typography>
					<Typography color="secondary" variant="subtitle1" className={classes.fail}>{`Ошибки: ${allFailArray.length ||
						0}`}</Typography>
					{endGame && <GameStatsPage allCorrectArray={allCorrectArray} allFailArray={allFailArray} />}
				</div>
			) : (
				<CircularProgress className={classes.loader} />
			)}
		</div>
	);
};
