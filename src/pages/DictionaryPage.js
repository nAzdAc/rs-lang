import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { LevelButton } from '../components/LevelButton';
import { wordCategories } from '../utils/constants';
import { levels } from '../utils/constants';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import filterDictionary from '../utils/filterDictionary';
import { useStyles } from '../styles/pagesStyles/WordList.styles';
import { gameCardsContent } from '../utils/constants';
import { setActiveWords } from '../redux/actions';
import { WordCard } from '../components/WordCard';

export const DictionaryPage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.userData);
	const { userWords, activeWords } = useSelector((state) => state);
	const [ page, setPage ] = useState(1);
	const [ count, setCount ] = useState(null);
	const [ activeSection, setActiveSection ] = useState(0);
	const [ activeLevel, setActiveLevel ] = useState(null);

	const handlePaginationChange = (e, value) => {
		setPage(value);
	};

	const handleWordsButtonClick = (index) => {
		setActiveSection(index);
	};

	const handleLevelsClick = (index) => {
		if (index === activeLevel) {
			setActiveLevel(null);
		} else {
			setActiveLevel(index);
		}
	};

	useEffect(
		() => {
			const filteredWords = filterDictionary(userWords, activeLevel, activeSection);
			const slisedWords = filteredWords.length > 20 ? filteredWords.slice(20 * (page - 1), 20 * page) : filteredWords;
			dispatch(setActiveWords(slisedWords));
			setCount(filteredWords.length);
		},
		[ activeLevel, activeSection, dispatch, page, userWords ]
	);

	return (
		<Container className={classes.root}>
			<Typography className={classes.title} variant="h1">
				Словарь
			</Typography>
			<Box className={classes.buttonBox}>
				{levels.map((item, index) => (
					<LevelButton
						key={index}
						click={() => handleLevelsClick(index)}
						group={item}
						isActive={index === activeLevel ? true : false}
					/>
				))}
			</Box>
			<ul className={classes.typeBox}>
				{wordCategories.map((item, index) => (
					<Button
						key={index}
						onClick={() => handleWordsButtonClick(index)}
						variant="contained"
						className={
							index === activeSection ? `${classes.typeButton} ${classes.typeButtonActive}` : `${classes.typeButton}`
						}
					>
						{item.text}
					</Button>
				))}
			</ul>
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
					{Math.ceil(userWords.length / 20) > 1 && (
						<Pagination
							page={page}
							className={classes.pagination}
							onChange={handlePaginationChange}
							count={Math.ceil(count / 20)}
							color="primary"
						/>
					)}
					<ul className={classes.wordList}>
						{activeWords.map((word) => {
							return <WordCard key={`${word._id}${word.word}`} word={word} />;
						})}
					</ul>
					{Math.ceil(userWords.length / 20) > 1 && (
						<Pagination
							page={page}
							className={classes.pagination}
							onChange={handlePaginationChange}
							count={Math.ceil(count / 20)}
							color="primary"
						/>
					)}
				</React.Fragment>
			) : (
				<Typography className={classes.message} variant="h3">
					{token ? 'Здесь нет слов' : 'Войдите в приложение чтобы увидеть свой словарь'}
				</Typography>
			)}
		</Container>
	);
};
