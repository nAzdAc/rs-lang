import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import WordCard from "./WordCard";
import "fontsource-roboto";
import CardIcons from "./CardIcons";
import { backRoutes } from "../utils/backRoutes";
import { regexpForText } from "../utils/initConsts";
import { makeStyles } from "@material-ui/core/styles";
import WordInfo from "./WordInfo";
import Answers from "./Answers";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    display: "Flex",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: "40px",
    marginTop: "40px",
  },
  loader: {
    position: "relative",
    margin: "40px",
    alignSelf: "center",
    justifySelf: "center",
  },
}));

export default function WordsCardList({
  userWords,
  difficulty,
  fetchUrl,
  infoPanel,
  wrong,
  correct,
  curentUserWords,
  activeWordButton,
  token,
  userId,
}) {
  // console.log(curentUserWords)
  const [wordsArr, setWordsArr] = useState([]);
  const { request } = useHttp();
  const classes = useStyles();

  const fetchWords = useCallback(async () => {
    const deleteUserWords = [];
    if (curentUserWords) {
      const data = await request(fetchUrl, "GET");
      curentUserWords.forEach((item) => {
        if (item.optional.deleted) {
          deleteUserWords.push(item.wordId);
        }
      });
      console.log(deleteUserWords)
      // console.log(data)

      setWordsArr(data.filter((item) => !deleteUserWords.includes(item.id)));
    }else{
      const data = await request(fetchUrl, "GET");
      setWordsArr(data);
    }
  }, [curentUserWords, fetchUrl, request]);

  const fetchUserWords = useCallback(async () => {
    const cards = await Promise.all(
      userWords.map(async (item) => {
        const result = await request(backRoutes.getWord(item.wordId), "GET");
        result.correct = item.optional.correct ? item.optional.correct : 123;
        result.wrong = item.optional.wrong ? item.optional.wrong : 10;
        return result;
      })
    );
    setWordsArr(cards);
  }, [userWords, request]);

  useEffect(() => {
    if (userWords) {
      fetchUserWords();
    }else{fetchWords()}
    
  }, [curentUserWords, fetchUserWords, fetchWords, userWords]);


  const addWordToDictionaryDelete = async (wordId) => {
    
    if (
      curentUserWords &&
      !curentUserWords.find((item) => wordId === item.wordId)
    ) {
      await backRoutes.createUserWord({
        userId: userId,
        wordId: wordId,
        word: {
          difficulty: "weak",
          optional: { group: difficulty, deleted: true },
        },
        token: token,
      });
    } else {
      await backRoutes.updateUserWord({
        userId: userId,
        wordId: wordId,
        word: {
          difficulty: "weak",
          optional: { group: difficulty, deleted: true },
        },
        token: token,
      });

      console.log("word is in your dictionary");
      // setWordsArr()
    }
    let newArr = wordsArr
    newArr.splice(newArr.findIndex((item)=>item.id===wordId),1)
    console.log(newArr)
    setWordsArr(newArr)
    // console.log(wordsArr.splice(wordsArr.findIndex((item)=>item.id===wordId),1))

    // console.log(curentUserWords)
    // fetchWords()
    // console.log(curentUserWords)
  };

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
                  clickDelete={()=>{addWordToDictionaryDelete(item.id)}}
                  userWords={curentUserWords?curentUserWords:[]}
                  difficulty={difficulty}
                  wordId={item.id}
                  audioWord={item.audio}
                  audioExample={item.audioExample}
                  audioMeaning={item.audioMeaning}
                ></CardIcons>
              ) : infoPanel === "WordInfo" ? (
                <WordInfo
                  page={item.page}
                  difficulty={difficulty}
                  wordId={item.id}
                  userId={userId}
                  group={item.group}
                  activeWordButton={activeWordButton}
                  token={token}
                ></WordInfo>
              ) : infoPanel === "Answers" ? (
                <Answers
                  page={item.page}
                  group={item.group}
                  difficulty={difficulty}
                  wrong={item.wrong}
                  correct={item.correct}
                  wordId={item.id}
                  userId={userId}
                  token={token}
                ></Answers>
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
