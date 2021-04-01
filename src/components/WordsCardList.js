import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import WordCard from "./WordCard";
import "fontsource-roboto";
import CardIcons from "./CardIcons";


export default function WordsCardList(props) {
  const [wordsArr, setWordsArr] = useState([]);
  const { request } = useHttp();
  const difficulty = props.difficulty

  const fetchWords = useCallback(async () => {
    const data = await request(props.fetchUrl, "GET");
    setWordsArr(data);
    console.log(data);
  }, [props.fetchUrl, request]);
  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  let infoPanel = props.infoPanel

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
      infoPanel={
        infoPanel === 'CardIcons'? <CardIcons difficulty={difficulty}  wordId={item.id} audio={item.audio} audioExample={item.audioExample} audioMeaning={item.audioMeaning}></CardIcons>:null
      }
    ></WordCard>
  ));
  return (
    <ul>{cards}</ul>
  );
}
