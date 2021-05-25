import React, { useState, useEffect, useCallback } from 'react';
import { backRoutes } from '../utils/backRoutes';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import { gameCardsContent } from '../utils/constants';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../styles/pagesStyles/WordList.styles';
import { setActiveWords } from '../redux/actions';
import { Button } from '@material-ui/core';
import { WordCard } from '../components/WordCard';

export const BookPage = () => {
	const { token } = useSelector((state) => state.userData);
	const { userWords, activeWords } = useSelector((state) => state);
	let match = useRouteMatch().path;
	let group = match[match.length - 1] - 1;
	const [ page, setPage ] = useState(1);
	const dispatch = useDispatch();
	const classes = useStyles(group);

	const fetchWords = useCallback(
		async () => {
			try {
				const res = await fetch(backRoutes.getWordsPage(group, page - 1), {
					method: 'GET',
					withCredentials: true,
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					}
				});
				const bookWords = await res.json();
				console.log(bookWords);
				const wordsArrWithAnswers = bookWords.map((item) => {
					const foundWord = userWords.find((word) => `${word._id}` === `${item._id}`);
					if (foundWord) {
						item = {
							...item,
							deleted: foundWord.deleted,
							difficult: foundWord.difficult,
							correct: foundWord.correct,
							fail: foundWord.fail
						};
					}
					return item;
				});
				console.log(wordsArrWithAnswers);
				const filteredArr = wordsArrWithAnswers.filter((item) => !item.deleted);
				console.log(filteredArr);
				dispatch(setActiveWords(filteredArr));
			} catch (e) {
				console.log(e);
			}
		},
		[ dispatch, group, page, userWords ]
	);

	useEffect(
		() => {
			fetchWords();
		},
		[ fetchWords ]
	);

	const handlePaginationChange = (e, value) => {
		setPage(value);
	};

	return (
		<React.Fragment>
			<Typography className={classes.levelTitle} variant="h2">
				{`Уровень сложности ${group + 1}`}
			</Typography>
			{activeWords.length ? (
				<React.Fragment>
					<Typography className={classes.subtitle} variant="h4">
						Можешь запустить игру с этими словами
					</Typography>
					<ul className={classes.typeBox}>
						{gameCardsContent.map((game) => {
							return (
								<Button className={classes.typeButton} variant="contained" size="medium">
									<Link
										className={classes.link}
										key={game.name}
										to={{
											pathname: game.to
										}}
									>
										{game.name}
									</Link>
								</Button>
							);
						})}
					</ul>
					<Pagination
						page={page}
						className={classes.pagination}
						onChange={handlePaginationChange}
						count={30}
						color="primary"
					/>
					<ul className={classes.wordList}>
						{activeWords.map((word) => {
							return <WordCard key={`${word._id}${word.word}`} word={word} />;
						})}
					</ul>
					<Pagination
						page={page}
						className={classes.pagination}
						onChange={handlePaginationChange}
						count={30}
						color="primary"
					/>
				</React.Fragment>
			) : (
				<Typography className={classes.message} variant="h3">
					{token ? 'Здесь нет слов' : 'Войдите в приложение чтобы увидеть свой словарь'}
				</Typography>
			)}
		</React.Fragment>
	);
};
