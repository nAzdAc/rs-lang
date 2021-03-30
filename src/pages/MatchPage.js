import React, { useCallback, useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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
import { originURL } from '../utils/backRoutes';

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
	const volume = localStorage.getItem(LOCAL_STORAGE_KEY.volume) || INIT_CONSTS.volume;
	const [ endGame, setEndGame ] = useState(false);
	const [ fail, setFail ] = useState(0);
	const [ correct, setCorrect ] = useState(0);
	const [ currentNumber, setCurrentNumber ] = useState(0);
	const [ currentWord, setCurrentWord ] = useState({});
	const [ wordsArray, setWordsArray ] = useState([]);
	const [ allImagesArray, setAllImagesArray ] = useState([]);
	const [ fourImages, setFourImages ] = useState([]);

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
			const result = await fetch(`${backRoutes.words}?group=1`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await result.json();
			console.log(data);
			const arr = [];
			const imagesArr = [];
			data.map((item) => {
				// console.log(item);
				const english = item.word;
				const russian = item.wordTranslate;
				const meaning = item.textMeaning.replace(regexpForText, '');
				const src = `../../${item.image}`;
				const obj = { english, russian, meaning, src };
				arr.push(obj);
				imagesArr.push(src);
			});
			const shuffledArr = arr.sort(shuffleAllElements);
			const shuffledImagesArr = imagesArr.sort(shuffleAllElements);
			setWordsArray(shuffledArr);
			setAllImagesArray(shuffledImagesArr);
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
			if (!endGame && volume) {
				fonSound.play();
			}
			return () => {
				fonSound.stop();
			};
		},
		[ endGame, volume ]
	);

	useEffect(
		() => {
			if (currentNumber && currentNumber >= wordsArray.length) {
				setEndGame(true);
				fonSound.stop();
			}
		},
		[ wordsArray, currentNumber ]
	);

	useEffect(
		() => {
			if (wordsArray.length > 1 && allImagesArray.length > 1 && currentNumber < wordsArray.length) {
				setCurrentWord((prev) => (prev = wordsArray[currentNumber]));
			}
		},
		[ currentNumber, wordsArray, fourImages ]
	);

	useEffect(
		() => {
			if (wordsArray.length > 1 && allImagesArray.length > 1 && currentNumber < wordsArray.length) {
				const arr = allImagesArray.filter((src) => src !== currentWord.src).sort(shuffleAllElements);
				arr.unshift(currentWord.src);
				arr.length = 4;
				arr.sort(shuffleAllElements)
				arr.sort(shuffleAllElements)
				console.log(arr);
				setFourImages((prev) => (prev = arr));
			}
		},
		[ currentWord, wordsArray, allImagesArray ]
	);

	function answer(event) {
		setCurrentNumber((prev) => prev + 1);
		const value = event.target.alt;
		if (value === currentWord.src) {
			playSuccess();
			setCorrect((prev) => prev + 1)
		} else {
			playFail();
			setFail((prev) => prev + 1)
		}
		console.log(value);
	}

	return (
		<div className={classes.root}>
			{wordsArray && allImagesArray ? (
				<div className={classes.gameContainer}>
					<div className={classes.imageWrap}>
						{fourImages.length && (
							fourImages.map((image, index) => {
								return (
									<img
										key={index}
										onClick={answer}
										className={classes.image}
										src={`${originURL}/${image}`}
										alt={image}
									/>
								);
							}))}
					</div>
					<Typography className={classes.word} variant="h4">{`${currentWord.english || ''}`}</Typography>
					<Typography className={classes.meaning} variant="h5">{`${currentWord.meaning || ''}`}</Typography>
					<Typography variant="subtitle1" className={classes.correct}>{`Правильные ответы: ${correct}`}</Typography>
					<Typography color="secondary" variant="subtitle1" className={classes.fail}>{`Ошибки: ${fail}`}</Typography>
					{endGame && <TransitionsModal correct={correct} fail={fail} />}
				</div>
			) : (
				<CircularProgress className={classes.loader} />
			)}
		</div>
	);
};
