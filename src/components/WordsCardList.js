import React, { useState, useEffect, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import WordCard from './WordCard';
import 'fontsource-roboto';
import CardIcons from './CardIcons';
import { backRoutes } from '../utils/backRoutes';
import { regexpForText } from '../utils/initConsts';
import { makeStyles } from '@material-ui/core/styles';
import WordInfo from './WordInfo';
import Answers from './Answers';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	list: {
		display: 'Flex',
		justifyContent: 'center',
		flexDirection: 'column',
		marginBottom: '40px',
		marginTop: '40px'
	},
	loader: {
		position: 'relative',
		margin: '40px',
		alignSelf: 'center',
		justifySelf: 'center'
	}
}));

export default function WordsCardList({
	difficulty,
	fetchUrl,
	infoPanel,
	wrong,
	correct,
	activeWordButton,
	token,
	userId,
	userWordsForDictionari,

}) {
	const [ wordsArr, setWordsArr ] = useState([]);
	const { request } = useHttp();
	const classes = useStyles();
	const [wordsReady,setWordsReady]= useState(false);
	const [ userWords, setUserWords ] = useState([]);
	const [ userDifficultWords, setUserDifficultWords ] = useState([]);

	const fetchWordsForBook = useCallback(
		async () => {
			console.log('Book')
			console.log(userWords)
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
				setWordsReady(true)
			} else if(!userWords) {
				const data = await request(fetchUrl, 'GET');
				setWordsArr(data);
				setWordsReady(true)
				console.log(data)
			}
		},
		[ userWords, fetchUrl, request ]
	);

	const fetchWordsForDictionary = useCallback(
		async () => {
			console.log('dictionary')
			const cards = await Promise.all(
				userWordsForDictionari.map(async (item) => {
					const result = await request(backRoutes.getWord(item.wordId), 'GET');
					result.correct = item.correct;
					result.fail = item.fail;
					return result;
				})
			);
			setWordsArr(cards);
			setWordsReady(true)
		},
		[ userWordsForDictionari, request ]
	);

	const getUserWords = useCallback(
		
		async () => {
			console.log('func')
			const result = await backRoutes.getUserWords({ userId, token });
			console.log(result)
			if (result.userWords.length) {
				setUserWords(result.userWords);
				const arr = result.userWords.map((item)=> item.difficult? item.wordId:null)
				setUserDifficultWords(arr)
			}
			else{
				setUserWords(null)
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
		
			if (userWordsForDictionari) {
				fetchWordsForDictionary();
			} else {
				fetchWordsForBook();
			}
		},
		[fetchWordsForBook, fetchWordsForDictionary, token, userId, userWordsForDictionari]
	);


	const setGoldStar = async (wordId) => {
    await backRoutes.createUserWord({
      userId: userId,
      wordId: wordId,
      word: {
        difficult: true,
      },
      token: token,
    });
    getUserWords()
		fetchWordsForBook()
  };
  const setBlackStar = async (wordId) => {
    await backRoutes.createUserWord({
      userId: userId,
      wordId: wordId,
      word: {
        difficult: false,
      },
      token: token,
    });
    getUserWords()
		fetchWordsForBook()
  };


	async function addWordToDictionaryDelete(wordId) {
		console.log('in delete')
    await backRoutes.createUserWord({
			userId: userId,
			wordId: wordId,
			word: {
				deleted: true,
			},
			token: token,
		});
		getUserWords()
		fetchWordsForBook()
	}

	return (
		<ul className={classes.list}>
			{wordsReady ? (
				wordsArr.map((item) => (
					<WordCard
						key={item.id}
						word={item.word}
						image={item.image}
						textExample={item.textExample.replace(regexpForText, '')}
						textExampleTranslate={item.textExampleTranslate}
						transcription={item.transcription}
						wordTranslate={item.wordTranslate}
						textMeaning={item.textMeaning.replace(regexpForText, '')}
						textMeaningTranslate={item.textMeaningTranslate}
						infoPanel={
							infoPanel === 'CardIcons' ? (
								<CardIcons
									userWords={userWords ? userWords : []}
									difficulty={difficulty}
									wordId={item.id}
									audioWord={item.audio}
									audioExample={item.audioExample}
									audioMeaning={item.audioMeaning}
									userDifficultWords={userDifficultWords}
									clickDelete={()=>addWordToDictionaryDelete(item.id)}
									setGoldStar={()=>setGoldStar(item.id)}
									setBlackStar={()=>setBlackStar(item.id)}
									
								/>
							) : infoPanel === 'WordInfo' ? (
								<WordInfo
									difficulty={difficulty}
									wordId={item.id}
									userId={userId}
									group={item.group}
									activeWordButton={activeWordButton}
									token={token}
								/>
							) : infoPanel === 'Answers' ? (
								<Answers fail={item.fail} correct={item.correct} wordId={item.id} userId={userId} token={token} />
							) : null
						}
					/>
				))
			) : (
				<CircularProgress className={classes.loader} />
			)}
		</ul>
	);
}
