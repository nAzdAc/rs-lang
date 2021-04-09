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

const wordsButtons = [ { text: 'Изучаемые слова' }, { text: 'Сложные слова' }, { text: 'Удаленные слова' } ];
	const levels = [ 1, 2, 3, 4, 5, 6 ];

export default function DictionaryPage() {
	const { userId, token } = useContext(AuthContext);
	const [ page, setPage ] = useState(1);
	const [ activeWordButton, setActiveWordButton ] = useState(0);
	const [ activeLevel, setActiveLevel ] = useState(null);
	const [ data, setData ] = useState([]);
	const [ listUserWords, setlistUserWords ] = useState([]);
	const classes = useStyles();
	// console.log(userId);

	// const fetchUrl = backRoutes.words
	const func = useCallback(
		async () => {
			const result = await backRoutes.getUserWords({ userId, token });
			if (result.length) {
				setData(result.filter((item) => !item.optional.deleted));
				setlistUserWords(result);
			}
		},
		[ token, userId ]
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
    setActiveLevel(null);
    let filteredArr = [];
		if (index === 0) {
			filteredArr = listUserWords.filter((item) => !item.optional.deleted)
		} else if (index === 1) {
      filteredArr = listUserWords.filter((item) => item.difficulty === 'difficult')
		} else if (index === 2) {
      filteredArr = listUserWords.filter((item) => item.optional.deleted)
		}
    setData(filteredArr)
	};

	const handleLevelsClick = (index) => {
		let filteredArr;
    if (index === activeLevel) {
        setActiveLevel(null);
      filteredArr = listUserWords.filter((item) => !item.optional.deleted);
		}
    else{
      setActiveLevel(index);
      filteredArr = listUserWords.filter((item) => item.optional.group === index);
    }
    setData(filteredArr);
	};

	return (
		<Container className={classes.container}>
			<Box className={classes.titleBox}>
				<Typography className={classes.title} variant="h1" component="h2">
					Словарь
				</Typography>
			</Box>
			<ul className={classes.typeBox}>
				{wordsButtons.map((item, index) => (
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
			<WordsCardList userWords={data} infoPanel="WordInfo" />
			{data.length &&
			Math.ceil(data.length / 20) > 2 && (
				<Pagination
					page={page}
					className={classes.pagination}
					onChange={handlePaginationChange}
					count={data ? Math.ceil(data.length / 20) : 30}
					color="primary"
				/>
			)}
		</Container>
	);
}
