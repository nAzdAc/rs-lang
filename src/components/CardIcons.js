import React,{useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { originURL } from "../utils/backRoutes";
import Box from "@material-ui/core/Box";
import DeleteIcon from '@material-ui/icons/Delete';
import GradeIcon from '@material-ui/icons/Grade';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Howl,Howler } from 'howler';
// import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
// import { INIT_CONSTS } from '../utils/initConsts';
import { AuthContext } from "../context/AuthContext";
import { backRoutes } from "../utils/backRoutes";
// import { useHttp } from "../hooks/http.hook";

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
  // const volume = localStorage.getItem(LOCAL_STORAGE_KEY.volume) || INIT_CONSTS.volume;
  const classes = useStyles();
  const userId = auth.userId
  const wordId = props.wordId
  // console.log('difficalty ',props.difficulty)

  const audio = new Howl({
		src: [ `${originURL}/${props.audio}`],
		// volume: 0.001 * volume
    onend: function() {
      new Howl({
      src: [`${originURL}/${props.audioMeaning}`],
      onend: function() {
        new Howl({
          src: [`${originURL}/${props.audioExample}`],
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
    backRoutes.createUserWord({
      userId: userId,
      wordId: wordId,
      word: { "difficulty": "difficult", "optional": {group:props.difficulty, page:props.page, deleted:false} },
      token: auth.token,
    })
  }
  const addWordToDictionaryDelete = () =>{
    backRoutes.createUserWord({
      userId: userId,
      wordId: wordId,
      word: { "difficulty": "weak", "optional": {group:props.difficulty, page:props.page, deleted:true} },
      token: auth.token,
    })
  }

  return (
    <Box className={classes.boxIcons}>
      <PlayCircleFilledIcon onClick={playWordsAudio} className={classes.icons} ></PlayCircleFilledIcon>
      <GradeIcon className={classes.icons} onClick={addWordToDictionary}></GradeIcon>
      <DeleteIcon className={classes.icons} onClick={addWordToDictionaryDelete} ></DeleteIcon>
    </Box>
  );
}
