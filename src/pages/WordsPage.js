import React,{useState, useEffect,useCallback} from 'react';
import { useHttp } from "../hooks/http.hook";
import { backRoutes } from "../utils/backRoutes";
import WordCard from "../components/WordCard"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { ListItemAvatar } from '@material-ui/core';


export default function WordsPage() {
  let match = useRouteMatch().path;
  let group = match[match.length-1]
  const [wordsArr,setWordsArr] = useState([])
  const {  loading, error, request, clearError } = useHttp();

  // async function getWords() {
  //   const data = await request(backRoutes.WordsPage, "GET");
  //   console.log(data);
  //   setArr(data);
  // }

  const fetchWords = useCallback(
		async () => {
      console.log(backRoutes.wordsPage);
			const data = await request(backRoutes.wordsPage, "GET");
      // console.log(data);
      setWordsArr(data);
			},
		[request]
	);
	useEffect(
		() => {
			fetchWords();
      console.log(wordsArr);
		},
		[ fetchWords ]
	);
  

  return (
    wordsArr.map((item) => 
      <WordCard word={item.word}></WordCard>
    )
  )
}