import React,{useContext, useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { origin } from "../utils/backRoutes";
import Box from "@material-ui/core/Box";
import DeleteIcon from '@material-ui/icons/Delete';
import GradeIcon from '@material-ui/icons/Grade';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Howl,Howler } from 'howler';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import { AuthContext } from "../context/AuthContext";
import { backRoutes } from "../utils/backRoutes";
import { useHttp } from "../hooks/http.hook";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxSizing: "border-box",
  },
  boxIcons: {
    paddingLeft:'40px',
    display:'flex',
    flexWrap:'wrap',
    justifyContent: 'left',
    fontSize: '34px',
  },
  icons: {
    marginRight:'10px',
    fontSize: '34px',
    color: '#000000',
    cursor: "pointer"
}}))

export default function CardIcons(props) {
  const auth = useContext(AuthContext);
  const volume = localStorage.getItem(LOCAL_STORAGE_KEY.volume) || INIT_CONSTS.volume;
  const classes = useStyles();
  const userId = auth.userId
  const wordId = props.wordId

  const fetchUrl = backRoutes.createUserWord(userId,wordId)
  const { request } = useHttp();
  const [wordInfo] = useState({
    "difficulty": props.difficulty,
    "optional": {}
  });

  const saveWord = useCallback(async () => {
    const data = await request(fetchUrl, "POST",{...wordInfo});
    console.log(data);
  }, [fetchUrl, request, wordInfo]);

  const audio = new Howl({
		src: [ `${origin}/${props.audio}`],
		// volume: 0.001 * volume
    onend: function() {
      new Howl({
      src: [`${origin}/${props.audioMeaning}`],
      onend: function() {
        new Howl({
          src: [`${origin}/${props.audioExample}`],
        }).play()
      }
    }).play()
    }
	});
  const playWordsAudio = () =>{
    Howler.stop()
    audio.play()
  }
  const addWordToDictionary = () =>{
    console.log(userId,wordId)
    saveWord()
  }

  return (
    <Box className={classes.boxIcons}>
      <PlayCircleFilledIcon onClick={playWordsAudio} className={classes.icons} ></PlayCircleFilledIcon>
      <GradeIcon className={classes.icons} onClick={addWordToDictionary}></GradeIcon>
      <DeleteIcon className={classes.icons}></DeleteIcon>
    </Box>
  );
}
