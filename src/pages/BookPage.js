import React, { useState, useContext, useEffect, useCallback } from 'react';
import { backRoutes } from '../utils/backRoutes';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import { WordsCardList } from '../components/WordsCardList';
import { useRouteMatch } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { addWords } from '../store/wordsSlice';
import { useDispatch } from 'react-redux';
import { GamesCaller } from '../components/GamesCaller';
import { Loader } from '../components/Loader';
import { useStyles } from '../styles/pagesStyles/BookPage.styles';

export const BookPage = () => {
	const { userId, token } = useContext(AuthContext);
	let match = useRouteMatch().path;
	let group = match[match.length - 1] - 1;
	const [ page, setPage ] = useState(1);
	const fetchUrl = backRoutes.getWordsPage(group, page - 1);
	const [ wordsArr, setWordsArr ] = useState([]);
	const { request } = useHttp();
	const [ wordsReady, setWordsReady ] = useState(false);
	const [ userWords, setUserWords ] = useState([]);
	const dispatch = useDispatch();
	const classes = useStyles(group);

	// const fetchWords = useCallback(
	// 	async () => {
	// 		const userWords = (await backRoutes.getUserWords({ userId, token })).userWords;
	// 		console.log(userWords);
	// 	},
	// 	[ token, userId ]
	// );

	// useEffect(
	// 	() => {
	// 		fetchWords();
	// 	},
	// 	[ userId, token, page, fetchWords ]
	// );

	const fetchWordsForBook = useCallback(
		async () => {
			const deleteUserWords = [];
			if (userWords && userWords.length) {
				const data = await request(fetchUrl, 'GET');
				userWords.forEach((item) => {
					if (item.deleted) {
						deleteUserWords.push(item.wordId);
					}
				});
				const filteredArr = data.filter((item) => !deleteUserWords.includes(item.id));
				setWordsArr(filteredArr);
				setWordsReady(true);
			} else if (!userWords) {
				const data = await request(fetchUrl, 'GET');
				setWordsArr(data);
				setWordsReady(true);
			}
		},
		[ userWords, fetchUrl, request ]
	);

	const getUserWords = useCallback(
		async () => {
			const result = await backRoutes.getUserWords({ userId, token });
			if (result.userWords.length) {
				setUserWords(result.userWords);
			} else {
				setUserWords(null);
			}
		},
		[ token, userId ]
	);

	useEffect(
		() => {
			if (userId && token) {
				getUserWords();
			}
		},
		[ getUserWords, token, userId ]
	);

	useEffect(
		() => {
			fetchWordsForBook();
		},
		[ fetchWordsForBook, token, userId ]
	);

	useEffect(
		() => {
			dispatch(addWords(wordsArr));
		},
		[ wordsArr, dispatch ]
	);

	const handlePaginationChange = (e, value) => {
		setPage(value);
	};

	return (
		<React.Fragment>
			<Typography className={classes.levelTitle} variant="h2">
				{`Уровень сложности ${group + 1}`}
			</Typography>
			{wordsReady ? (
				<React.Fragment>
					<GamesCaller />
					<Pagination
						page={page}
						className={classes.pagination}
						onChange={handlePaginationChange}
						count={30}
						color="primary"
					/>
					<WordsCardList
						userId={userId}
						token={token}
						page={page}
						difficulty={group}
						fetchUrl={fetchUrl}
						isItBook={true}
						infoPanel="BookPage"
					/>
					<Pagination
						page={page}
						className={classes.pagination}
						onChange={handlePaginationChange}
						count={30}
						color="primary"
					/>
				</React.Fragment>
			) : (
				<Loader />
			)}
		</React.Fragment>
	);
};
