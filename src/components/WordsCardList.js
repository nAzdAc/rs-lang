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
import DictionaryDelete from "./DictionaryDelete";
// import filterDictionary from "../utils/filterDictionary"
import { useSelector } from "react-redux";
// import { ToastContainer } from "react-toastify";
// import { useMessage } from "../hooks/message.hook";

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
  userWordsForDictionari,
}) {
  const [wordsArr, setWordsArr] = useState([]);
  const { request } = useHttp();
  const classes = useStyles();
  const [wordsReady, setWordsReady] = useState(false);
  const [userWords, setUserWords] = useState([]);
  const [userDifficultWords, setUserDifficultWords] = useState([]);
  // const message = useMessage();
  // console.log(userWordsForDictionari)

  // const deleteWordBtn = useSelector((state) => state.settings.DeleteWordBtn)
  // const difficultWordBtn = useSelector((state) => state.settings.DifficultWordBtn)
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

  const fetchWordsForDictionary = useCallback(async () => {
    const cards = await Promise.all(
      userWordsForDictionari.map(async (item) => {
        const result = await request(backRoutes.getWord(item.wordId), "GET");
        result.correct = item.correct;
        result.fail = item.fail;
        return result;
      })
    );
    setWordsArr(cards);
    setWordsReady(true);
  }, [userWordsForDictionari, request]);

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
  }, [getUserWords, token, userId]);

  useEffect(() => {
    if (!isItBook && userWordsForDictionari) {
      fetchWordsForDictionary();
    }
  }, [fetchWordsForDictionary, isItBook, userWordsForDictionari]);

  useEffect(() => {
    if (isItBook) {
      fetchWordsForBook();
    }
  }, [fetchWordsForBook, fetchWordsForDictionary, token, userId, isItBook]);

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
      fetchWordsForDictionary();
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
      fetchWordsForDictionary();
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
      fetchWordsForDictionary();
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
    fetchWordsForDictionary();
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
                infoPanel === "BookPage" ? (
                  <CardIcons
                    userWords={userWords ? userWords : []}
                    difficulty={difficulty}
                    wordId={item.id}
                    audioWord={item.audio}
                    audioExample={item.audioExample}
                    audioMeaning={item.audioMeaning}
                    userDifficultWords={userDifficultWords}
                    clickDelete={() =>
                      addWordToDictionaryDelete(item.id, item.group, true)
                    }
                    setGoldStar={() => setGoldStar(item.id, item.group, true)}
                    setBlackStar={() => setBlackStar(item.id, item.group, true)}
                  />
                ) : infoPanel === "DictionaryDifficult" ? (
                  <WordInfo
                    difficulty={difficulty}
                    wordId={item.id}
                    userId={userId}
                    group={item.group}
                    activeWordButton={activeWordButton}
                    token={token}
                    icons={
                      <CardIcons
                        userWords={userWords ? userWords : []}
                        difficulty={difficulty}
                        wordId={item.id}
                        audioWord={item.audio}
                        audioExample={item.audioExample}
                        audioMeaning={item.audioMeaning}
                        userDifficultWords={userDifficultWords}
                        clickDelete={() =>
                          addWordToDictionaryDelete(item.id, item.group)
                        }
                        setGoldStar={() => setGoldStar(item.id, item.group)}
                        setBlackStar={() => setBlackStar(item.id, item.group)}
                      />
                    }
                  />
                ) : infoPanel === "DictionaryLearning" ? (
                  <>
                    <CardIcons
                      userWords={userWords ? userWords : []}
                      difficulty={difficulty}
                      wordId={item.id}
                      audioWord={item.audio}
                      audioExample={item.audioExample}
                      audioMeaning={item.audioMeaning}
                      userDifficultWords={userDifficultWords}
                      clickDelete={() =>
                        addWordToDictionaryDelete(item.id, item.group)
                      }
                      setGoldStar={() => setGoldStar(item.id, item.group)}
                      setBlackStar={() => setBlackStar(item.id, item.group)}
                    />
                    <Answers
                      fail={item.fail}
                      correct={item.correct}
                      wordId={item.id}
                      userId={userId}
                      token={token}
                    />
                  </>
                ) : infoPanel === "DictionaryDelete" ? (
                  <DictionaryDelete
                    difficulty={difficulty}
                    wordId={item.id}
                    userId={userId}
                    group={item.group}
                    activeWordButton={activeWordButton}
                    token={token}
                    clickRestore={() => restore(item.id)}
                  />
                ) : null
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
