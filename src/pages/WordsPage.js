import React, { useState, useContext, useEffect, useCallback } from 'react';
import { backRoutes } from '../utils/backRoutes';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import Box from '@material-ui/core/Box';
import LevelButton from '../components/LevelButton';
import WordsCardList from '../components/WordsCardList';
import { Link, useRouteMatch } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@material-ui/core';
import { useHttp } from '../hooks/http.hook';
import { addWords } from '../store/wordsSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    marginRight: '40px',
    fontSize: '60px',
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: '80px',
    textAlign: 'left',
    color: (group) =>
      group === 0
        ? '#BB86FC'
        : group === 1
        ? '#985EFF'
        : group === 2
        ? '#7F39FB'
        : group === 3
        ? '#6200EE'
        : group === 4
        ? '#5600E8'
        : group === 5
        ? '#3700B3'
        : '#3700B3',
    verticalAlign: 'middle',
  },
  titleBox: {
    display: 'flex',
    marginTop: '160px',
    marginRight: 'auto',
    marginBottom: '24px',
  },
  pagination: {
    margin: '40px',
    fontSize: '40px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleGames: {
    marginBottom: '24px',
  },
  gamesButtonsWrapper: {
    width: '500px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function WordsPage() {
  const { userId, token } = useContext(AuthContext);
  let match = useRouteMatch().path;
  let group = match[match.length - 1] - 1;
  const [page, setPage] = useState(1);
  const classes = useStyles(group);
  const fetchUrl = backRoutes.getWordsPage(group, page - 1);
  const [wordsArr, setWordsArr] = useState([]);
  const { request } = useHttp();
  const [wordsReady, setWordsReady] = useState(false);
  const [userWords, setUserWords] = useState([]);
  const dispatch = useDispatch();

  const fetchWordsForBook = useCallback(async () => {
    const deleteUserWords = [];
    if (userWords && userWords.length) {
      const data = await request(fetchUrl, 'GET');
      userWords.forEach((item) => {
        if (item.deleted) {
          deleteUserWords.push(item.wordId);
        }
      });
      const filteredArr = data.filter(
        (item) => !deleteUserWords.includes(item.id)
      );
      setWordsArr(filteredArr);
      setWordsReady(true);
    } else if (!userWords) {
      const data = await request(fetchUrl, 'GET');
      setWordsArr(data);
      setWordsReady(true);
    }
  }, [userWords, fetchUrl, request]);

  const getUserWords = useCallback(async () => {
    const result = await backRoutes.getUserWords({ userId, token });
    if (result.userWords.length) {
      setUserWords(result.userWords);
    } else {
      setUserWords(null);
    }
  }, [token, userId]);

  useEffect(() => {
    if (userId && token) {
      getUserWords();
    }
  }, [getUserWords, token, userId]);

  useEffect(() => {
    fetchWordsForBook();
  }, [fetchWordsForBook, token, userId]);

  useEffect(() => {
    dispatch(addWords(wordsArr));
  }, [wordsArr, dispatch]);

  const handlePaginationChange = (e, value) => {
    setPage(value);
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.titleBox}>
        <Typography className={classes.title} variant="h1" component="h2">
          Уровень сложности
        </Typography>
        <LevelButton group={group + 1} />
      </Box>
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
      ></Pagination>
    </Container>
  );
}
