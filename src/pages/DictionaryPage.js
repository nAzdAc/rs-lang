import React, { useState, useEffect, useCallback, useContext } from 'react';
import { backRoutes } from '../utils/backRoutes';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import Box from '@material-ui/core/Box';
import WordsCardList from '../components/WordsCardList';
import { AuthContext } from '../context/AuthContext';
import Button from '@material-ui/core/Button';
import LevelButton from '../components/LevelButton';
import { wordCategories } from '../const/wordCategories';
import { levels } from '../const/levels';
import { useMessage } from '../hooks/message.hook';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginTop: theme.spacing(2)
		}
	},
	container: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		aligneItems: 'flex-start'
	},
	title: {
		marginRight: '40px',
		fontSize: '60px',
		fontStyle: 'normal',
		fontWeight: '300',
		lineHeight: '80px',
		textAlign: 'left',
		color: '#000000',
		verticalAlign: 'middle'
	},
	message: {
		// marginRight: "40px",
		fontSize: '30px',
		fontStyle: 'italic',
		fontWeight: '300',
		verticalAlign: 'middle'
	},
	titleBox: {
		height: '72px',
		display: 'flex',
		marginTop: '80px',
		marginRight: 'auto',
		width: '100%'
	},
	typeBox: {
		width: '100%',
		height: '48px',
		display: 'flex',
		marginTop: '40px',
		// backgroundColor:'#6200EE',
		justifyContent: 'space-around'
		// marginRight: "auto",
	},
	typeButton: {
		width: '100%',
		fontSize: '14px',
		fontWeight: '500',
		color: 'white',
		backgroundColor: '#6200EE',
		borderRadius: '0'
	},
	typeButtonActive: {
		borderBottom: '4px solid white',
		margiBottom: '-4px',
		color: 'white',
		backgroundColor: '#6200EE'
	},
	buttonBox: {
		width: '100%',
		display: 'flex',
		marginTop: '40px',
		marginRight: 'auto',
		flexWrap: 'wrap'
	},
	link: {
		textDecoration: 'none'
	},
	pagination: {
		margin: '40px',
		fontSize: '40px'
	}
}));

export default function DictionaryPage() {
	const { userId, token } = useContext(AuthContext);
	const [ page, setPage ] = useState(1);
	const [ activeWordButton, setActiveWordButton ] = useState(0);
	const [ activeLevel, setActiveLevel ] = useState(null);
	const [ data, setData ] = useState([]);
	const [ listUserWords, setlistUserWords ] = useState([]);
	const message = useMessage();
	const classes = useStyles();
	const func = useCallback(
		async () => {
			const result = await backRoutes.getUserWords({ userId, token });
			console.log(result);
			if (!result.userWords) return message(result.message);
			if (result.userWords.length) {
				console.log('попали в if');
				const filteredArr = result.userWords.filter((item) => !item.deleted);
				setData(filteredArr);
				setlistUserWords(result.userWords);
			}
		},
		[ message, token, userId ]
	);

	useEffect(
		() => {
			if (userId && token) {
				func();
			}
		},
		[ func, token, userId ]
	);

	const handlePaginationChange = (e, value) => {
		setPage(value);
	};

	const handleWordsButtonClick = (index) => {
		setActiveWordButton(index);
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
			// console.log(`level: ${activeLevel} ; button:  ${activeWordButton}`);
			let sectionArr = [];
			let levelArr = [];
			if (activeLevel === null) {
				if (activeWordButton === 0) {
					sectionArr = listUserWords.filter((item) => !item.deleted);
				} else if (activeWordButton === 1) {
					sectionArr = listUserWords.filter((item) => item.difficult && !item.deleted);
				} else if (activeWordButton === 2) {
					sectionArr = listUserWords.filter((item) => item.deleted);
				}
				levelArr = sectionArr;
			} else {
				if (activeWordButton === 0) {
					sectionArr = listUserWords.filter((item) => !item.deleted);
				} else if (activeWordButton === 1) {
					sectionArr = listUserWords.filter((item) => item.difficult);
				} else if (activeWordButton === 2) {
					sectionArr = listUserWords.filter((item) => item.deleted);
				}
				levelArr = sectionArr.filter((item) => item.group === activeLevel);
			}
			setData(levelArr);
		},
		[ activeLevel, activeWordButton, listUserWords ]
	);

	return (
		<Container className={classes.container}>
			<ToastContainer />
			<Box className={classes.titleBox}>
				<Typography className={classes.title} variant="h1" component="h2">
					Словарь
				</Typography>
			</Box>
			<ul className={classes.typeBox}>
				{wordCategories.map((item, index) => (
					<Button
						key={index}
						onClick={() => handleWordsButtonClick(index)}
						variant="contained"
						className={
							index === activeWordButton ? `${classes.typeButton} ${classes.typeButtonActive}` : `${classes.typeButton}`
						}
					>
						{item.text}
					</Button>
				))}
			</ul>
			<ul className={classes.buttonBox}>
				{levels.map((item, index) => (
					<LevelButton
						key={index}
						click={() => handleLevelsClick(index)}
						group={item}
						isActive={index === activeLevel ? true : false}
					/>
				))}
			</ul>
			{data.length ? (
				<WordsCardList
					token={token}
					userId={userId}
					userWordsForDictionari={data}
					infoPanel={activeWordButton === 0 ? 'Answers' : 'WordInfo'}
					activeWordButton={activeWordButton}
				/>
			) : (
				<Typography className={classes.message} variant="h1" component="h2">
					Здесь еще нет слов
				</Typography>
			)}
			{data.length ? (
				data.length &&
				Math.ceil(data.length / 20) > 2 && (
					<Pagination
						page={page}
						className={classes.pagination}
						onChange={handlePaginationChange}
						count={data ? Math.ceil(data.length / 20) : 30}
						color="primary"
					/>
				)
			) : (
				''
			)}
		</Container>
	);
}
