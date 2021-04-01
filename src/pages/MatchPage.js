import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import fonSong from '../sounds/fon.mp3';
import successSong from '../sounds/success.mp3';
import failSong from '../sounds/no.wav';
import { backRoutes } from '../utils/backRoutes';
import { CircularProgress } from '@material-ui/core';
import { createSound, shuffleAllElements } from '../utils/helpers';
import { originURL } from '../utils/backRoutes';
import { GameStatsPage } from './GameStatsPage';
import { useHttp } from '../hooks/http.hook';

const regexpForText = /<\b>|<\/\b>|<i>|<\/i>/gi;

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
	imageWrap: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '50px'
	},
	image: {
		cursor: 'pointer',
		width: '20%',
		maxWidth: '250px',
		minWidth: '150px',
		height: 'auto'
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

export const MatchPage = () => {
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
	const [ allImagesArray, setAllImagesArray ] = useState([]);
	const [ fourImages, setFourImages ] = useState([]);

	const audioSuccess = useMemo(() => createSound(successSong, soundVolume), [ soundVolume ]);
	const audioFail = useMemo(() => createSound(failSong, soundVolume), [ soundVolume ]);
	const audioFon = useMemo(() => createSound(fonSong, musicVolume * 0.1, 1, true), [ musicVolume ]);

	const fetchWords = useCallback(
		async () => {
			try {
				const data = await request(backRoutes.words, 'GET');
				console.log(data);
				const arr = [];
				const imagesArr = [];
				data.forEach((item) => {
					// console.log(item);
					const english = item.word;
					const russian = item.wordTranslate;
					const meaning = item.textMeaning.replace(regexpForText, '');
					const src = `${originURL}/${item.image}`;
					const obj = { english, russian, meaning, src };
					arr.push(obj);
					imagesArr.push(src);
				});
				arr.sort(shuffleAllElements);
				imagesArr.sort(shuffleAllElements);
				setWordsArray(arr);
				setAllImagesArray(imagesArr);
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
		[ endGame, musicVolume, audioFon ]
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
			if (wordsArray.length && allImagesArray.length && currentNumber < wordsArray.length) {
				setCurrentWord(wordsArray[currentNumber]);
			}
		},
		[ currentNumber, wordsArray, fourImages, allImagesArray.length ]
	);

	useEffect(
		() => {
			if (wordsArray.length && allImagesArray.length && currentNumber < wordsArray.length) {
				const arr = allImagesArray.filter((src) => src !== currentWord.src).sort(shuffleAllElements);
				arr.unshift(currentWord.src);
				const fourArr = arr.slice(0, 4);
				fourArr.sort(shuffleAllElements);
				fourArr.sort(shuffleAllElements);
				setFourImages(fourArr);
			}
		},
		[ currentWord, wordsArray, allImagesArray, currentNumber ]
	);

	function answer(event) {
		const obj = { ...currentWord };
		setCurrentNumber((prev) => prev + 1);
		if (event.target.alt === currentWord.src) {
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
			) : wordsArray && allImagesArray ? (
				<div className={classes.gameContainer}>
					<div className={classes.imageWrap}>
						{fourImages.length &&
							fourImages.map((image, index) => {
								return <img key={index} onClick={answer} className={classes.image} src={image} alt={image} />;
							})}
					</div>
					<Typography className={classes.word} variant="h4">{`${currentWord.english || ''}`}</Typography>
					<Typography className={classes.meaning} variant="h5">{`${currentWord.meaning || ''}`}</Typography>
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
