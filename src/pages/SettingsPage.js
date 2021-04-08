import React, { useCallback, useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { AuthContext } from '../context/AuthContext';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import { useDispatch } from 'react-redux';
import {
	changeDifficultBtn,
	changeDeleteBtn,
	changeTranslateWordBtn,
	changeTranslateSentenceBtn,
	changeVolume
} from '../store/settingSlice';
import { useSelector } from 'react-redux';
import { useHttp } from '../hooks/http.hook';
import { backRoutes } from '../utils/backRoutes';

const useStyles = makeStyles({
	root: {
		padding: '20px 0px 80px 30px',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap'
	},
	content: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	buttonsContainer: {
		width: '390px',
		height: '208px',
		display: 'flex',
		flexDirection: 'column',
		padding: '20px 0px 0px 20px',
		border: '2px solid #000',
		marginBottom: '40px',
		marginRight: '30px',

		'&:hover': {
			transform: 'translateY(-5px)',
			boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
		}
	},
	buttonsWrapper: {
		width: '210px',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '10px'
	},
	title: {
		marginBottom: '40px'
	},
	subtitle: {
		marginBottom: '20px'
	},
	avatarContainer: {
		width: '234px',
		height: '212px',
		border: '2px solid #000',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		padding: '10px 0px',
		marginRight: '30px',
		marginBottom: '60px',
		'&:hover': {
			transform: 'translateY(-5px)',
			boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
		}
	},
	avatarImage: {
		width: '100px',
		height: '100px',
		borderRadius: '50%',
		margin: '10px'
	},
	upload: {
		width: '134px',
		height: '36px',
		background: '#6200EE',
		color: '#FFFFFF',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: '6px',
		cursor: 'pointer'
	},
	volumeContainer: {
		width: '320px',
		border: '2px solid #000',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginLeft: '60px',
		paddingTop: '10px',
		'&:hover': {
			transform: 'translateY(-5px)',
			boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
		}
	}
});

const PurpleSwitch = withStyles({
	switchBase: {
		color: '#DBB2FF',
		'&$checked': {
			color: '#5600E8'
		},
		'&$checked  + $track': {
			backgroundColor: '#5600E8'
		}
	},
	checked: {},
	track: {}
})(Switch);

const marks = [
	{
		value: 0,
		label: '0'
	},
	{
		value: 25,
		label: '25'
	},
	{
		value: 50,
		label: '50'
	},
	{
		value: 75,
		label: '75'
	},
	{
		value: 100,
		label: '100'
	}
];

const VolumeSlider = withStyles({
	root: {
		width: '200px',
		color: '#5600E8',
		height: '8px'
	},
	thumb: {
		height: '24px',
		width: '24px',
		marginTop: '-8px',
		marginLeft: '-12px'
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 8px)'
	},
	track: {
		height: '8px'
	},
	rail: {
		height: '8px'
	},
	mark: {
		backgroundColor: '#bfbfbf',
		height: 12,
		width: 1
	},
	markActive: {
		opacity: 1,
		backgroundColor: 'currentColor'
	}
})(Slider);

function getStatsPerGame(arr, filterElem) {
	const array = arr;
	const game = filterElem;
	let longestSeries = 0;
	let correctPercent = 0;
	const filteredArray = array.filter((item) => item.gameName === game);
	if (filteredArray.length) {
		longestSeries = Math.max.apply(null, filteredArray.map((item) => item.longestSeries));
		correctPercent = Math.round(
			filteredArray.map((game) => game.correctPercent).reduce((acc, val) => acc + val) / filteredArray.length
		);
	}
	return { gameName: game, longestSeries, correctPercent };
}

function getCorrectPercentToday(arr, filterElem) {
	const array = arr;
	const date = filterElem;
	const filteredArray = array.filter((item) => item.date === date);
	let percentByDay = 0;
	if (filteredArray.length) {
		percentByDay = Math.round(
			filteredArray.map((item) => item.correctPercent).reduce((acc, val) => acc + val) / filteredArray.length
		);
	}
	return { date, percentByDay };
}

function getLearnedWordsPerDate(arr) {
	const dates = [ ...new Set(arr.map((item) => item.date)) ];

	const allDates = dates.map((date, index) => {
		const filteredArr = arr.filter((game) => game.date === date);
		return filteredArr;
	});

	const perDate = allDates.map((arr) => {
		const date = arr.map((game) => game.date)[0];
		const learnedWords = arr.map((game) => game.totalWords).reduce((acc, val) => acc + val);
		return { date, learnedWords };
	});

	return perDate;
}

export const SettingsPage = () => {
	const classes = useStyles();
	const { request } = useHttp();
	const { avatar, uploadAvatar, token } = useContext(AuthContext);
	const [ musicVolume, setMusicVolume ] = useState(
		parseInt(localStorage.getItem(LOCAL_STORAGE_KEY.musicVolume)) || INIT_CONSTS.musicVolume
	);
	const [ soundVolume, setSoundVolume ] = useState(
		parseInt(localStorage.getItem(LOCAL_STORAGE_KEY.soundVolume)) || INIT_CONSTS.soundVolume
	);
	const [ wordVolume, setWordVolume ] = useState(
		parseInt(localStorage.getItem(LOCAL_STORAGE_KEY.wordVolume)) || INIT_CONSTS.wordVolume
	);

	const getStats = useCallback(async () => {
		const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData)).userId;
		const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData)).token;

		const stats = await backRoutes.getStats({ userId, token });
		const allGames = stats.statistics.games;
		console.log(allGames);

		const savannaGameStats = getStatsPerGame(allGames, 'savanna');

		const matchGameStats = getStatsPerGame(allGames, 'match');

		const sprintGameStats = getStatsPerGame(allGames, 'sprint');

		const audioGameStats = getStatsPerGame(allGames, 'audio');

		const percentToday = getCorrectPercentToday(allGames, `${new Date().toLocaleDateString()}`);

		const dates = [ ...new Set(allGames.map((item) => item.date)) ];

		const allDates = dates.map((date, index) => {
			return allGames.filter((game) => game.date === date);
		});

		const perDate = allDates.map((arr) => {
			const date = arr.map((game) => game.date)[0];
			const learnedWords = arr.map((game) => game.totalWords).reduce((acc, val) => acc + val);
			return { date, learnedWords };
		});


		const learnedWordsPerDate = getLearnedWordsPerDate(allGames)
		console.log(perDate);

		console.log(dates);
		console.log(allDates);
		const parsedStats = { learnedWordsPerDate, percentToday, savannaGameStats, matchGameStats, sprintGameStats, audioGameStats };
		console.log(parsedStats);
	}, []);

	useEffect(
		() => {
			getStats();
		},
		[ getStats ]
	);

	function handleMusicVolume(event, newValue) {
		setMusicVolume(newValue);
		localStorage.setItem(LOCAL_STORAGE_KEY.musicVolume, newValue);
	}
	function handleSoundVolume(event, newValue) {
		setSoundVolume(newValue);
		localStorage.setItem(LOCAL_STORAGE_KEY.soundVolume, newValue);
	}
	function handleWordVolume(event, newValue) {
		setWordVolume(newValue);
		localStorage.setItem(LOCAL_STORAGE_KEY.wordVolume, newValue);
	}

	const dispatch = useDispatch();
	const handleDifficulty = (e) => {
		dispatch(changeDifficultBtn(e.target.checked));
	};

	const handleDeleteWord = (e) => {
		dispatch(changeDeleteBtn(e.target.checked));
	};

	const handleTranslateWord = (e) => {
		dispatch(changeTranslateWordBtn(e.target.checked));
	};

	const handleTranslateSentence = (e) => {
		dispatch(changeTranslateSentenceBtn(e.target.checked));
	};

	return (
		<div className={classes.root}>
			<Typography variant="h2" className={classes.title}>
				Настройки
			</Typography>
			<div className={classes.content}>
				<div className={classes.buttonsContainer}>
					<Typography variant="h4" className={classes.subtitle}>
						Отображение кнопок
					</Typography>
					<div className={classes.buttonsWrapper}>
						<Typography variant="subtitle1">Сложное слово</Typography>
						<PurpleSwitch
							onChange={handleDifficulty}
							checked={useSelector((state) => state.settings.DifficultWordBtn)}
						/>
					</div>
					<div className={classes.buttonsWrapper}>
						<Typography variant="subtitle1">Удалить слово</Typography>
						<PurpleSwitch onChange={handleDeleteWord} checked={useSelector((state) => state.settings.DeleteWordBtn)} />
					</div>
				</div>

				<div className={classes.buttonsContainer}>
					<Typography variant="h4" className={classes.subtitle}>
						Отображение перевода
					</Typography>
					<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
						<Typography variant="subtitle1">Перевод слов</Typography>
						<PurpleSwitch
							onChange={handleTranslateWord}
							checked={useSelector((state) => state.settings.TranslateWordBtn)}
						/>
					</div>
					<div className={classes.buttonsWrapper} style={{ width: '250px' }}>
						<Typography variant="subtitle1">Перевод предложений</Typography>
						<PurpleSwitch
							onChange={handleTranslateSentence}
							checked={useSelector((state) => state.settings.TranslateSentenceBtn)}
						/>
					</div>
				</div>

				<div className={classes.avatarContainer}>
					<Typography variant="h4" className={classes.subtitle}>
						Аватар
					</Typography>
					<img
						alt="avatar"
						className={classes.avatarImage}
						src={
							avatar ||
							'http://res.cloudinary.com/nazdac/image/upload/v1616652013/travelAppFolder/dmlfcuvyr79gpkbgg639.jpg'
						}
					/>
					<label htmlFor="file" className={classes.upload}>
						+ ИЗМЕНИТЬ
					</label>
					<input
						style={{ display: 'none' }}
						type="file"
						accept="image/*"
						onChange={(event) => uploadAvatar(event.target.files[0])}
					/>
				</div>
				<div className={classes.volumeContainer}>
					<Typography variant="h6" className={classes.subtitle}>
						Громкость музыки
					</Typography>
					<VolumeSlider
						marks={marks}
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						value={musicVolume}
						onChange={handleMusicVolume}
					/>
					<Typography variant="h6" className={classes.subtitle}>
						Громкость звуков
					</Typography>
					<VolumeSlider
						marks={marks}
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						value={soundVolume}
						onChange={handleSoundVolume}
					/>
					<Typography variant="h6" className={classes.subtitle}>
						Громкость произношения слов
					</Typography>
					<VolumeSlider
						marks={marks}
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						value={wordVolume}
						onChange={handleWordVolume}
					/>
				</div>
			</div>
		</div>
	);
};
