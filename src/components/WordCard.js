import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { origin } from "../utils/backRoutes";
import Box from "@material-ui/core/Box";
import DeleteIcon from '@material-ui/icons/Delete';
import GradeIcon from '@material-ui/icons/Grade';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Howl } from 'howler';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxSizing: "border-box",
  },
  item: {
    height: "100%",
    width: "100%",
  },
  paper: {
    boxSizing: "border-box",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "left",
    color: theme.palette.text.secondary,
    height: "100%",
    boxShadow: 'none'
  },
  wordExample: {
    display:'flex',
    flexWrap:'wrap',
    fontSize: '34px',
    color: '#000000'
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
  },
  textEx: {
    fontSize: '16px',
    fontWeight: '400',
    color: '#000000',
  },
  textExTr: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#000000',
  },

  img: {
    height: "100%",
    width: "100%",
    objectFit: 'contain',
  },
  conteiner: {
    margin: "0",
    marginTop: "40px",
    justifyContent: "center",
    minHeight: "232px",
    // border: '1px solid',
    width: "100%",
    boxShadow: "2px 0px 14px 2px rgba(0,0,0,0.09)",
  },
}));

export default function WordCard(props) {
  const volume = localStorage.getItem(LOCAL_STORAGE_KEY.volume) || INIT_CONSTS.volume;
  const classes = useStyles();
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
    audio.play()
  }

  function FormRow() {
    return (
      <React.Fragment>
        <Grid className={classes.item} item xs={3}>
          <Paper className={classes.paper}>
            <img
              className={classes.img}
              src={`${origin}/${props.image}`}
              alt="img"
            ></img>
          </Paper>
        </Grid>
        <Grid className={classes.item} item xs={4}>
          <Paper className={classes.paper}>
            <Box className={classes.wordExample}>
              <Box component="span" mr={1}>
                {props.word}
              </Box>
              <Box component="span" mr={1}>
                {props.transcription}
              </Box>
              <Box component="span">
                {props.wordTranslate}
              </Box>
            </Box>
            <Box className={classes.textEx}>{props.textMeaning}</Box>
            <Box className={classes.textExTr} >{props.textMeaningTranslate}</Box>
          </Paper>
        </Grid>
        <Grid className={classes.item} item xs={4}>
          <Paper className={classes.paper}>
            <Box className={classes.boxIcons}>
              <PlayCircleFilledIcon onClick={playWordsAudio} className={classes.icons} ></PlayCircleFilledIcon>
              <GradeIcon className={classes.icons}></GradeIcon>
              <DeleteIcon className={classes.icons}></DeleteIcon>
            </Box>
            <Box className={classes.textEx}>{props.textExample}</Box>
            <Box className={classes.textExTr} >{props.textExampleTranslate}</Box>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid className={classes.conteiner} container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
