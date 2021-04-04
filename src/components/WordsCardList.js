import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import WordCard from "./WordCard";
import "fontsource-roboto";
import CardIcons from "./CardIcons";
import { backRoutes } from "../utils/backRoutes";


export default function WordsCardList({userWords, difficulty, fetchUrl, infoPanel}) {
  const [wordsArr, setWordsArr] = useState([]);
  const { request } = useHttp();

  const fetchWords = useCallback(async () => {
    const data = await request(fetchUrl, "GET");
    setWordsArr(data);
  }, [fetchUrl, request]);
  

  const fetchUserWords = useCallback(async () => { 
    const cards = await Promise.all(userWords.map( async (item) => {
    console.log(backRoutes.getWord(item.wordId))
    const result = await request(backRoutes.getWord(item.wordId),"GET")
    console.log(result)
    return result
  }))
  setWordsArr(cards)
  console.log('cards ',cards)
  }, [userWords, request]);

  useEffect(() => {
     if(userWords){
      fetchUserWords();
     }else{
      fetchWords()
     }
    }, [fetchUserWords, fetchWords, userWords]);

  return (
    <ul>
    {
      wordsArr.map((item) => (
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
        infoPanel={
          infoPanel === 'CardIcons'? <CardIcons difficulty={difficulty}  wordId={item.id} audio={item.audio} audioExample={item.audioExample} audioMeaning={item.audioMeaning}></CardIcons>:null
        }
      ></WordCard>
  ))
  }
    </ul>
  );
}
