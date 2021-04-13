import React, { useContext, useCallback, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { originURL } from "../utils/backRoutes";
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import GradeIcon from "@material-ui/icons/Grade";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { Howl, Howler } from "howler";
// import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
// import { INIT_CONSTS } from '../utils/initConsts';
import { AuthContext } from "../context/AuthContext";
import { backRoutes } from "../utils/backRoutes";
import { filterableGridColumnsSelector } from "@material-ui/data-grid";
// import { useHttp } from "../hooks/http.hook";

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
  userWords,
  wordId,
  audioWord,
  audioMeaning,
  audioExample,
  difficulty,
  page,
  userDifficultWords,
	clickDelete,
	setGoldStar,
	setBlackStar
}) {
  const classes = useStyles();
  const { userId, token } = useContext(AuthContext);
  const [allUserWords, setAllUserWords] = useState(userWords);
  // console.log(userDifficultWords)

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
  // const func = useCallback(
  // 	async () => {
  // 		const result = await backRoutes.getUserWords({ userId, token });
  // 		if (result.length) {
  // 			setAllUserWords(result.userWords);
  // 		}
  // 	},
  // 	[ token, userId ]
  // );

  // async function addWordToDictionary() {
  // 	if (allUserWords.length === 0 && !allUserWords.filter((item) => wordId === item.wordId).length > 0) {
  // 		await backRoutes.createUserWord({
  // 			userId: userId,
  // 			wordId: wordId,
  // 			difficult: true,
  // 			token:token,
  // 		});
  // 	}
  // 	else if (
  // 		allUserWords &&
  // 		allUserWords.filter((item) => wordId === item.wordId && item.difficulty).length > 0
  // 	) {
  // 		await backRoutes.createUserWord({
  // 			userId: userId,
  // 			wordId: wordId,
  // 			token:token,
  // 			word:{
  // 				difficult: true,
  // 			}
  // 		});
  // 	}
  // 	else if (
  // 		allUserWords &&
  // 		allUserWords.filter((item) => wordId === item.wordId && !item.difficulty).length > 0
  // 	) {
  // 		await backRoutes.createUserWord({
  // 			userId: userId,
  // 			wordId: wordId,
  // 			difficult: true,
  // 			token:token,
  // 		});
  // 	}
  // 	func();
  // }



  return (
    <Box className={classes.boxIcons}>
      <PlayCircleFilledIcon
        onClick={playWordsAudio}
        className={classes.icons}
      />
      {userDifficultWords.includes(wordId) ? (
        <GradeIcon
          className={`${classes.iconActive}`}
          onClick={setBlackStar}
        ></GradeIcon>
      ) : (
        <GradeIcon
          className={`${classes.icons}`}
          onClick={setGoldStar}
        ></GradeIcon>
      )}
      <DeleteIcon
        className={classes.icons}
        onClick={clickDelete}
      />
    </Box>
  );
}
