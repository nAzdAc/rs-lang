import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import successSong from '../sounds/success.mp3';
import failSong from '../sounds/no.wav';
import fonSong from '../sounds/fon.mp3';
import { backRoutes } from '../utils/backRoutes';
import { CircularProgress } from '@material-ui/core';
import { createSound, shuffleAllElements } from '../utils/helpers';
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
    height: '100%',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '60px 0px 40px 0px'
	},
  contentWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
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
	const { request } = useHttp();
	const soundVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.soundVolume) || INIT_CONSTS.soundVolume, []);
	const musicVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.musicVolume) || INIT_CONSTS.musicVolume, []);
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
	const audioFon = useMemo(() => createSound(fonSong, musicVolume * 0.1, 1, true), [ musicVolume ]);

	const fetchWords = useCallback(
		async () => {
			try {
				const data = await request(backRoutes.words, 'GET');
				// console.log(data);
				const arr = [];
				const wordsArr = [];
				data.forEach((item) => {
					// console.log(item);
					const english = item.word;
					const russian = item.wordTranslate;
					const obj = { english, russian };
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
			if (currentNumber && currentNumber >= wordsArray.length) {
				setEndGame(true);
				audioFon.stop();
			}
		},
		[ wordsArray, currentNumber, audioFon ]
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

	return (
		<div className={classes.root}>
			{endGame ? (
				<GameStatsPage correctAnswers={correctAnswers} failAnswers={failAnswers} />
			) : (wordsArray.length && allWordsArray.length && currentWord && fourButtons.length) ? (
				<div className={classes.gameContainer}>
					<Typography variant="h3" >{currentWord.russian}</Typography>
          <div className={classes.contentWrap}>
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
					
				</div>
			) : (
				<CircularProgress className={classes.loader} />
			)}
		</div>
	);
};
