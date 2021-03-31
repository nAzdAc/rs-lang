import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import { backRoutes} from "../utils/backRoutes";
import WordCard from "../components/WordCard";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {useRouteMatch} from "react-router-dom";
// import { ListItemAvatar } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import Box from "@material-ui/core/Box";
import LevelButton from '../components/LevelButton'


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
  title: {
    marginRight: '40px',
    fontSize: '60px',
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: '80px',
    // letterSpacing: '-0.5px',
    textAlign: 'left',
    color:'#BB86FC',
    verticalAlign:'middle',
  },
  titleBox: {
    display: 'flex',
    marginTop: '160px',
    marginRight: 'auto',
  },
  pagination: {
    margin: '40px',
    fontSize:'40px', 
  },
 
}));

export default function WordsPage() {
  const classes = useStyles();
  let match = useRouteMatch().path;
  let group = match[match.length - 1]-1;
  const [page, setPage] = useState(1)
  const [wordsArr, setWordsArr] = useState([]);
  const {request} = useHttp();

  const fetchWords = useCallback(async () => {
    console.log(backRoutes.getWordsPage(group,page));
    const data = await request(backRoutes.getWordsPage(group,page), "GET");
    setWordsArr(data);
  }, [request,group,page]);
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
  const handlePaginationChange = (e,value) => {
    setPage(value)
  }

  return (
    <Container  className={classes.container}>
    <Box className={classes.titleBox}>
      <Typography  className={classes.title} variant="h1" component="h2">
        Difficulty level 
      </Typography>
      <LevelButton group={group+1}></LevelButton>

    </Box>
    
      <ul>{cards}</ul>
      <Pagination page={page} className={classes.pagination} onChange={handlePaginationChange} count={20} color="primary"/>
    </Container>
    
    
    
  )
 
}
