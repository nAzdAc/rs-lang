import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import WordCard from "./WordCard";
import "fontsource-roboto";
import { backRoutes } from "../utils/backRoutes";
import { regexpForText } from "../utils/initConsts";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
// import filterDictionary from "../utils/filterDictionary"
import { useSelector } from "react-redux";
// import { ToastContainer } from "react-toastify";
// import { useMessage } from "../hooks/message.hook";
import CreatePanel from "../components/CreatePanel";

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
  difficulty,
  fetchUrl,
  infoPanel,
  wrong,
  correct,
  activeWordButton,
  activeLevel,
  token,
  userId,
  isItBook,
  wordsForDictionari,
}) {
  const [wordsArr, setWordsArr] = useState([]);
  const { request } = useHttp();
  const classes = useStyles();
  const [wordsReady, setWordsReady] = useState(false);
  const [userWords, setUserWords] = useState([]);
  const [userDifficultWords, setUserDifficultWords] = useState([]);
  // const message = useMessage();
  // console.log(wordsForDictionari)
  
  const translateWordBtn = useSelector(
    (state) => state.settings.TranslateWordBtn
  );
  const translateSentenceWordBtn = useSelector(
    (state) => state.settings.TranslateSentenceBtn
  );

  const fetchWordsForBook = useCallback(async () => {
    const deleteUserWords = [];
    if (userWords && userWords.length) {
      const data = await request(fetchUrl, "GET");
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
    } else {
      const data = await request(fetchUrl, "GET");
      setWordsArr(data);
      setWordsReady(true);
    }
  }, [userWords, request, fetchUrl]);

  const getUserWords = useCallback(async () => {
    const result = await backRoutes.getUserWords({ userId, token });
    // message(result.message, 200);
    
    if (result.userWords && result.userWords.length) {
      setUserWords(result.userWords);
      const arr = result.userWords.map((item) =>
        item.difficult ? item.wordId : null
      );
      setUserDifficultWords(arr);
    } else {
      setUserWords(null);
    }
  }, [token, userId]);

  useEffect(() => {
    if (userId && token) {
      getUserWords();
    }
  }, [getUserWords, token, userId, wordsForDictionari]);

  useEffect(() => {
    if (!isItBook && wordsForDictionari) {
      setWordsArr(wordsForDictionari);
      setWordsReady(true);
      
    }
  }, [ isItBook, wordsForDictionari]);

  useEffect(() => {
    if (isItBook) {
      fetchWordsForBook();
    }
  }, [fetchWordsForBook, token, userId, isItBook]);

  const setGoldStar = async (wordId, group, isItBook = false) => {
    await backRoutes.createUserWord({
      userId: userId,
      wordId: wordId,

      word: {
        difficult: true,
        group: group,
      },
      token: token,
    });
    getUserWords();
    if (isItBook) {
      fetchWordsForBook();
    } else {
      // fetchWordsForDictionary();
    }
  };
  const setBlackStar = async (wordId, group, isItBook = false) => {
    await backRoutes.createUserWord({
      userId: userId,
      wordId: wordId,
      word: {
        difficult: false,
        group: group,
      },
      token: token,
    });
    getUserWords();
    if (isItBook) {
      fetchWordsForBook();
    } else {
      // fetchWordsForDictionary();
    }
  };

  async function addWordToDictionaryDelete(wordId, group, isItBook = false) {
    await backRoutes.createUserWord({
      userId: userId,
      wordId: wordId,
      word: {
        deleted: true,
        group: group,
      },
      token: token,
    });
    getUserWords();
    if (isItBook) {
      fetchWordsForBook();
    } else {
      // fetchWordsForDictionary();
    }
  }
  async function restore(wordId) {
    await backRoutes.createUserWord({
      userId: userId,
      wordId: wordId,
      word: {
        deleted: false,
      },
      token: token,
    });
    getUserWords();
    // fetchWordsForDictionary();
  }

  return (
    <>
      {/* <ToastContainer /> */}
      <ul className={classes.list}>
        {wordsReady ? (
          wordsArr.map((item) => (
            <WordCard
              key={item.id}
              word={item.word}
              image={item.image}
              textExample={item.textExample.replace(regexpForText, "")}
              textExampleTranslate={
                translateSentenceWordBtn ? item.textExampleTranslate : null
              }
              transcription={item.transcription}
              wordTranslate={translateWordBtn ? item.wordTranslate : null}
              textMeaning={item.textMeaning.replace(regexpForText, "")}
              textMeaningTranslate={
                translateSentenceWordBtn ? item.textMeaningTranslate : null
              }
              infoPanel={
                <CreatePanel
                  panel={infoPanel}
                  userWords={userWords}
                  difficult={item.difficult}
                  wordId={item.id}
                  wordAudio={item.audio}
                  wordAudioExample={item.audioExample}
                  WordAudioMeaning={item.audioMeaning}
                  userDifficultWords={userDifficultWords}
                  userId={userId}
                  itemGroup={item.group}
                  activeWordButton={activeWordButton}
                  token={token}
                  fail={item.fail}
                  correct={item.correct}
                  clickDelete={() =>
                    addWordToDictionaryDelete(item.id, item.group, isItBook)
                  }
                  setGoldStar={() => setGoldStar(item.id, item.group, isItBook)}
                  setBlackStar={() =>
                    setBlackStar(item.id, item.group, isItBook)
                  }
                  clickRestore={() => restore(item.id)}
                ></CreatePanel>
              }
            />
          ))
        ) : (
          <CircularProgress className={classes.loader} />
        )}
      </ul>
    </>
  );
}
