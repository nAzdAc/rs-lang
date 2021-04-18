import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { originURL } from "../utils/backRoutes";
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import GradeIcon from "@material-ui/icons/Grade";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { Howl, Howler } from "howler";
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxSizing: "border-box",
  },
  boxIcons: {
    paddingLeft: "40px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    fontSize: "34px",
  },
  icons: {
    marginRight: "10px",
    fontSize: "34px",
    color: "#000000",
    cursor: "pointer",
  },
  iconActive: {
    color: "#FFD700",
    marginRight: "10px",
    fontSize: "34px",
    cursor: "pointer",
  },
}));

export default function CardIcons({
  audioWord,
  audioMeaning,
  audioExample,
  difficult,
	clickDelete,
	setGoldStar,
	setBlackStar,
  userDifficultWords,
  wordId,
}) {
  const classes = useStyles();

	const deleteWordBtn = useSelector((state) => state.settings.DeleteWordBtn)
	const difficultWordBtn = useSelector((state) => state.settings.DifficultWordBtn)

  const audio = new Howl({
    src: [`${originURL}/${audioWord}`],
    // volume: 0.001 * volume
    onend: function () {
      new Howl({
        src: [`${originURL}/${audioMeaning}`],
        onend: function () {
          new Howl({
            src: [`${originURL}/${audioExample}`],
          }).play();
        },
      }).play();
    },
  });
  const playWordsAudio = () => {
    Howler.stop();
    audio.play();
  };

  return (
    <Box className={classes.boxIcons}>
      <PlayCircleFilledIcon
        onClick={playWordsAudio}
        className={classes.icons}
      />
      {difficultWordBtn? difficult || userDifficultWords.includes(wordId)? (
        <GradeIcon
          className={`${classes.iconActive}`}
          onClick={setBlackStar}
        ></GradeIcon>
      ) : (
        <GradeIcon
          className={`${classes.icons}`}
          onClick={setGoldStar}
        ></GradeIcon>
      ):null}
      {deleteWordBtn?<DeleteIcon
        className={classes.icons}
        onClick={clickDelete}
      />:null}
    </Box>
  );
}
