import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TransitionsModal from '../components/EndGameModal';
import useSound from 'use-sound';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import successSong from '../sounds/success.mp3';
import failSong from '../sounds/no.wav';
import { Howl } from 'howler';
import { backRoutes } from '../utils/backRoutes';
import { CircularProgress } from '@material-ui/core';
import SpeakerIcon from '@material-ui/icons/Speaker';
import { shuffleAllElements, getRandomInt } from '../utils/helpers';
import { originURL } from '../utils/backRoutes';

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
    cursor: 'pointer',
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
	const volume = localStorage.getItem(LOCAL_STORAGE_KEY.volume) || INIT_CONSTS.volume;
	const [ endGame, setEndGame ] = useState(false);
	const [ fail, setFail ] = useState(0);
	const [ correct, setCorrect ] = useState(0);
	const [ currentNumber, setCurrentNumber ] = useState(0);
	const [ currentWord, setCurrentWord ] = useState({});
	const [ wordsArray, setWordsArray ] = useState([]);
	const [ allWordsArray, setAllWordsArray ] = useState([]);
	const [ fourButtons, setFourImages ] = useState([]);

	const [ playSuccess ] = useSound(successSong, {
		volume: 0.01 * volume
	});
	const [ playFail ] = useSound(failSong, {
		volume: 0.01 * volume
	});

  const sound = new Howl({
    src: `${originURL}/${currentWord.audio}`,
    volume: 0.01 * volume
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
			data.map((item) => {
				// console.log(item);
				const english = item.word;
				const audio = item.audio;
				const obj = { english, audio };
				arr.push(obj);
				wordsArr.push(english);
			});
			const shuffledArr = arr.sort(shuffleAllElements);
			const shuffledWordsArr = wordsArr.sort(shuffleAllElements);
			setWordsArray(shuffledArr);
			setAllWordsArray(shuffledWordsArr);
			console.log(shuffledArr);
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
				setCurrentWord((prev) => (prev = wordsArray[currentNumber]));
			}
		},
		[ currentNumber, wordsArray, allWordsArray ]
	);

	useEffect(() => {
    setTimeout(() => {
      sound.play();
    }, 1000)
  }, [currentWord])

	useEffect(
		() => {
			if (wordsArray.length > 1 && allWordsArray.length > 1 && currentNumber < wordsArray.length) {
				const arr = allWordsArray.filter((english) => english !== currentWord.english).sort(shuffleAllElements);
				arr.unshift(currentWord.english);
				arr.length = 4;
				arr.sort(shuffleAllElements);
				arr.sort(shuffleAllElements);
				console.log(arr);
				setFourImages((prev) => (prev = arr));
			}
		},
		[ currentWord, wordsArray, allWordsArray, currentNumber ]
	);

	function answer(event) {
		setCurrentNumber((prev) => prev + 1);
		const value = event.target.value;
		if (value === currentWord.english) {
			playSuccess();
			setCorrect((prev) => prev + 1);
		} else {
			playFail();
			setFail((prev) => prev + 1);
		}
	}

	function repeat() {
		sound.play();
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
