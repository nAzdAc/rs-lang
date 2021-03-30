import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import { backRoutes, origin } from "../utils/backRoutes";
import WordCard from "../components/WordCard";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { ListItemAvatar } from "@material-ui/core";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:'center',
  },
  pagination: {
    margin: '40px',
    fontSize:'40px', 
  },
 
}));

export default function WordsPage() {
  const classes = useStyles();
  let match = useRouteMatch().path;
  let group = match[match.length - 1];
  const [wordsArr, setWordsArr] = useState([]);
  const { loading, error, request, clearError } = useHttp();

  const fetchWords = useCallback(async () => {
    console.log(backRoutes.wordsPage);
    const data = await request(backRoutes.wordsPage, "GET");
    console.log(data);
    setWordsArr(data);
  }, [request]);
  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  const cards = wordsArr.map((item) => (
    <WordCard
      key={item.id}
      word={item.word}
      image={item.image}
      textExample={item.textExample}
      textExampleTranslate={item.textExampleTranslate}
      transcription={item.transcription}
      wordTranslate={item.wordTranslate}
      textMeaning={item.textMeaning}
      textMeaningTranslate={item.textMeaningTranslate}
    >
    </WordCard>
  ))
  const paginationClick = (e) => {
    console.log(e.target.textContent)
  }

  return (
    <Container className={classes.container}>
      <ul>{cards}</ul>
      <Pagination className={classes.pagination} onClick={paginationClick} count={20} color="primary"/>
    </Container>
    
    
    
  )
 
}
