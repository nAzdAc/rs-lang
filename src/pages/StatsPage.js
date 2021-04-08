import React, { useCallback, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import TabPanel from '../components/statsTabs';
import { makeStyles } from '@material-ui/core/styles';
import illustration from '../assets/images/stats.png';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { backRoutes } from '../utils/backRoutes';

const useStyles = makeStyles({
	wrapper: {
		backgroundColor: '#FCFCFF',
		display: 'flex',
		gap: '1rem'
	},
	content: {
		width: '60%',
		paddingTop: '80px',
		paddingLeft: '120px'
	},
	illustration: {
		width: '40%',
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'end',
		paddingBottom: '40px'
	},
	title: {
		marginBottom: '40px'
	}
});

function getStatsPerGame(arr, filterElem) {
	const initArr = arr;
	const game = filterElem;
	let longestSeries = 0;
	let correctPercent = 0;
	let wordsCount = 0;
	const filteredArray = initArr.filter((item) => item.gameName === game);
	if (filteredArray.length) {
		longestSeries = Math.max.apply(null, filteredArray.map((item) => item.longestSeries));
		correctPercent = Math.round(
			filteredArray.map((game) => game.correctPercent).reduce((acc, val) => acc + val) / filteredArray.length
		);
		wordsCount = filteredArray.map((game) => game.totalWords).reduce((acc, val) => acc + val);
	}
	return { longestSeries, correctPercent, wordsCount };
}

function getCorrectPercentToday(arr, filterElem) {
	const initArr = arr;
	const date = filterElem;
	let correctPercentToday = 0;
	const filteredArray = initArr.filter((item) => item.date === date);
	if (filteredArray.length) {
		correctPercentToday = Math.round(
			filteredArray.map((item) => item.correctPercent).reduce((acc, val) => acc + val) / filteredArray.length
		);
	}
	return `${correctPercentToday}%`;
}

function getLearnedWordsPerDate(arr) {
	const initArr = arr;
	const dates = [ ...new Set(initArr.map((item) => item.date)) ];

	const allDates = dates.map((date, index) => {
		const filteredArr = initArr.filter((game) => game.date === date);
		return filteredArr;
	});

	const perDate = allDates.map((arr) => {
		const date = arr.map((game) => game.date)[0];
		const learnedWords = arr.map((game) => game.totalWords).reduce((acc, val) => acc + val);
		return { date, learnedWords };
	});

	return perDate;
}

function getLearnedWordsToday(arr, date) {
	const initArr = arr;
	const todayDate = date;
	let learnedWordsToday = 0;
	const filteredArray = initArr.filter((item) => item.date === todayDate);
	if (filteredArray.length) {
		learnedWordsToday = filteredArray.map((item) => item.totalWords).reduce((acc, val) => acc + val);
	}
	return learnedWordsToday;
}

function getLearnedWordsTotal(data) {
	const amount = data.reduce(function(acc, value, i) {
		if (i === 0) {
			acc.push({
				name: value.date,
				words: value.learnedWords
			});
		} else if (i > 0) {
			acc.push({
				name: value.date,
				words: value.learnedWords + acc[i - 1].words
			});
		}
		return acc;
	}, []);
	return amount;
}

export const StatsPage = () => {
	const classes = useStyles();

	const getStats = useCallback(async () => {
		const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData)).userId;
		const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData)).token;

		const stats = await backRoutes.getStats({ userId, token });
		const allGames = stats.statistics.games;
    const PARSED_STATS_ON_BACK = stats.parsedStats
		// console.log(allGames);

		const todayDate = new Date().toLocaleDateString();
		const savannaGameStats = getStatsPerGame(allGames, 'savanna');

		const matchGameStats = getStatsPerGame(allGames, 'match');

		const sprintGameStats = getStatsPerGame(allGames, 'sprint');

		const audioGameStats = getStatsPerGame(allGames, 'audio');

		const percentToday = getCorrectPercentToday(allGames, `${todayDate}`);

		const learnedWordsPerDate = getLearnedWordsPerDate(allGames);

		const learnedWordsToday = getLearnedWordsToday(allGames, `${todayDate}`);

		const learnedWordsTotal = getLearnedWordsTotal(learnedWordsPerDate);

		const parsedStats = {
			learnedWordsTotal,
			learnedWordsToday,
			learnedWordsPerDate,
			percentToday,
			savannaGameStats,
			matchGameStats,
			sprintGameStats,
			audioGameStats
		};

    // console.log(parsedStatsOnFront)
    console.log(PARSED_STATS_ON_BACK)
	}, []);

	useEffect(
		() => {
			getStats();
		},
		[ getStats ]
	);

	return (
		<div className={classes.wrapper}>
			<div className={classes.content}>
				<Typography variant="h2" className={classes.title}>
					Статистика
				</Typography>
				<TabPanel />
			</div>
			<div className={classes.illustration}>
				<img src={illustration} alt="a man looking at chart" />
			</div>
		</div>
	);
};
