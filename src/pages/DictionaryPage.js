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
import { wordCategories } from '../constants/wordCategories';
import { levels } from '../constants/levels';
import { useMessage } from '../hooks/message.hook';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

import { addWords } from '../store/wordsSlice';
import { useDispatch } from 'react-redux';
import filterDictionary from '../utils/filterDictionary';
import { deleteWords } from '../store/wordsSlice';
import { deleteLevel } from '../store/levelSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  container: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    aligneItems: 'flex-start',
  },
  title: {
    marginRight: '40px',
    fontSize: '60px',
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: '80px',
    textAlign: 'left',
    color: '#000000',
    verticalAlign: 'middle',
  },
  message: {
    // marginRight: "40px",
    fontSize: '30px',
    fontStyle: 'italic',
    fontWeight: '300',
    verticalAlign: 'middle',
  },
  titleBox: {
    height: '72px',
    display: 'flex',
    marginTop: '80px',
    marginRight: 'auto',
    width: '100%',
  },
  typeBox: {
    width: '100%',
    height: '48px',
    display: 'flex',
    marginTop: '40px',
    // backgroundColor:'#6200EE',
    justifyContent: 'space-around',
    // marginRight: "auto",
  },
  typeButton: {
    width: '100%',
    fontSize: '14px',
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#6200EE',
    borderRadius: '0',
  },
  typeButtonActive: {
    borderBottom: '4px solid white',
    margiBottom: '-4px',
    color: 'white',
    backgroundColor: '#6200EE',
  },
  buttonBox: {
    width: '100%',
    display: 'flex',
    marginTop: '40px',
    marginRight: 'auto',
    flexWrap: 'wrap',
  },
  link: {
    textDecoration: 'none',
  },
  pagination: {
    margin: '40px',
    fontSize: '40px',
  },
  titleGames: {
    marginBottom: '24px',
  },
  gamesButtonsWrapper: {
    width: '500px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  gamesWrapper: {
    width: '100%',
    marginTop: '24px',
    textAlign: 'left',
  },
}));

export default function DictionaryPage() {
  const { userId, token } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);
  const [activeWordButton, setActiveWordButton] = useState(0);
  const [activeLevel, setActiveLevel] = useState(null);
  const [listUserWords, setlistUserWords] = useState([]);
  const message = useMessage();
  const classes = useStyles();
  const [wordsArr, setWordsArr] = useState([]);
  const [wordsReady, setWordsReady] = useState(false);
  const dispatch = useDispatch();

  const getUserWords = useCallback(async () => {
    const result = await backRoutes.getUserWordsForDictionary({
      userId,
      token,
    });
    if (!result.dictionaryWords) return message(result.message);
    if (result.dictionaryWords.length) {
      setlistUserWords(result.dictionaryWords);
    }
  }, [message, token, userId]);

  useEffect(() => {
    if (userId && token) {
      getUserWords();
    }
  }, [getUserWords, token, userId]);

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

  useEffect(() => {
    return () => {
      dispatch(deleteWords());
      dispatch(deleteLevel());
    };
  }, [dispatch]);

  useEffect(() => {
    const userWordsArr = filterDictionary(
      activeLevel,
      listUserWords,
      activeWordButton
    );
    const newArr =
      userWordsArr.length > 20
        ? userWordsArr.slice(20 * (page - 1), 20 * page)
        : userWordsArr;
    setWordsArr(newArr);
    if (newArr.length) {
      setWordsReady(true);
    }
    setCount(userWordsArr.length);
  }, [activeLevel, activeWordButton, listUserWords, page]);

  useEffect(() => {
    dispatch(addWords(wordsArr));
  }, [wordsArr, dispatch]);

  return (
    <Container className={classes.container}>
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
              index === activeWordButton
                ? `${classes.typeButton} ${classes.typeButtonActive}`
                : `${classes.typeButton}`
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
      {wordsReady ? (
        <div className={classes.gamesWrapper}>
          <Typography
            className={classes.titleGames}
            variant="h3"
            component="h4"
          >
            Выберите игру
          </Typography>
          <div className={classes.gamesButtonsWrapper}>
            <Link
              to={{
                pathname: '/games/savanna',
              }}
            >
              <Button
                className={classes.button}
                variant="contained"
                size="medium"
              >
                Саванна
              </Button>
            </Link>
            <Link
              to={{
                pathname: '/games/audio',
              }}
            >
              <Button
                className={classes.button}
                variant="contained"
                size="medium"
              >
                Аудиовызов
              </Button>
            </Link>
            <Link
              to={{
                pathname: '/games/sprint',
              }}
            >
              <Button
                className={classes.button}
                variant="contained"
                size="medium"
              >
                Спринт
              </Button>
            </Link>
            <Link
              to={{
                pathname: '/games/match',
              }}
            >
              <Button
                className={classes.button}
                variant="contained"
                size="medium"
              >
                Match
              </Button>
            </Link>
          </div>
        </div>
      ) : null}
      {wordsArr.length ? (
        <WordsCardList
          token={token}
          userId={userId}
          isItBook={false}
          infoPanel={
            activeWordButton === 0
              ? 'DictionaryLearning'
              : activeWordButton === 1
              ? 'DictionaryDifficult'
              : 'DictionaryDelete'
          }
          activeWordButton={activeWordButton}
          activeLevel={activeLevel}
          wordsForDictionari={wordsArr}
        />
      ) : (
        <Typography className={classes.message} variant="h1" component="h2">
          {token
            ? 'Здесь еще нет слов'
            : 'Войдите в приложение чтобы увидеть свой словарь'}
        </Typography>
      )}
      {wordsArr.length
        ? wordsArr.length &&
          Math.ceil(listUserWords.length / 20) > 1 && (
            <Pagination
              page={page}
              className={classes.pagination}
              onChange={handlePaginationChange}
              count={count ? Math.ceil(count / 20) : 30}
              color="primary"
            />
          )
        : ''}
    </Container>
  );
}
