import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import WordCard from "./WordCard";
import "fontsource-roboto";
import CardIcons from "./CardIcons";
import { backRoutes } from "../utils/backRoutes";
import { regexpForText } from "../utils/initConsts";
import { makeStyles } from "@material-ui/core/styles";
import WordInfo from "./WordInfo";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    display:'Flex',
    justifyContent:"center",
    flexDirection:"column",
    marginBottom: "40px",
    marginTop: "40px",
  },
  loader: {
		position: 'relative',
    margin: '40px',
		alignSelf:"center",
    justifySelf:"center",
  
	},
}));

export default function WordsCardList({
  userWords,
  difficulty,
  fetchUrl,
  infoPanel,
}) {
  const [wordsArr, setWordsArr] = useState([]);
  const { request } = useHttp();
  const classes = useStyles();

  const fetchWords = useCallback(async () => {
    const data = await request(fetchUrl, "GET");
    setWordsArr(data);
  }, [fetchUrl, request]);

  const fetchUserWords = useCallback(async () => {
    const cards = await Promise.all(
      userWords.map(async (item) => {
        // console.log(backRoutes.getWord(item.wordId))
        const result = await request(backRoutes.getWord(item.wordId), "GET");
        return result;
      })
    );
    setWordsArr(cards);
    // console.log('cards ',cards)
  }, [userWords, request]);

  useEffect(() => {
    if (userWords) {
      fetchUserWords();
    } else {
      fetchWords();
    }
  }, [fetchUserWords, fetchWords, userWords]);

  return (
    
    <ul className={classes.list}>
      {wordsArr.length ? (
        wordsArr.map((item) => (
          <WordCard
            key={item.id}
            word={item.word}
            image={item.image}
            textExample={item.textExample.replace(regexpForText, "")}
            textExampleTranslate={item.textExampleTranslate}
            transcription={item.transcription}
            wordTranslate={item.wordTranslate}
            textMeaning={item.textMeaning.replace(regexpForText, "")}
            textMeaningTranslate={item.textMeaningTranslate}
            infoPanel={
              infoPanel === "CardIcons" ? (
                <CardIcons
                  difficulty={difficulty}
                  wordId={item.id}
                  audio={item.audio}
                  audioExample={item.audioExample}
                  audioMeaning={item.audioMeaning}
                ></CardIcons>
              ) : infoPanel === "WordInfo" ? (
                <WordInfo
                  difficulty={difficulty}
                  wordId={item.id}
                  group={item.group}
                ></WordInfo>
              ) : null
            }
          ></WordCard>
        ))
      ) : (
        <CircularProgress className={classes.loader} />
      )}
    </ul>
  );
}
