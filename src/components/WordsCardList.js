import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import WordCard from "./WordCard";
import "fontsource-roboto";
import CardIcons from "./CardIcons";
import { backRoutes } from "../utils/backRoutes";


export default function WordsCardList({userWords,difficulty,fetchUrl,infoPanel}) {
  const [wordsArr, setWordsArr] = useState([]);
  const { request } = useHttp();

  const fetchWords = useCallback(async () => {
    const data = await request(fetchUrl, "GET");
    setWordsArr(data);
  }, [fetchUrl, request]);
  
  let cards = []
  const fetchUserWords = useCallback(() => { 
    

    userWords.forEach( async (item) => {
    console.log(item.wordId)
    const result = await request(backRoutes.getWord(item.wordId),"GET")
    console.log(result)
    cards.push(result)
    // setWordsArr(result)
  })
  console.log('cards ',cards)

  setWordsArr(cards)
  console.log('WordsArr ',wordsArr)
  
  }, [userWords, cards, request]);

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
