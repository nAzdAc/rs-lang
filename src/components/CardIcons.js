import React, { useContext, useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { originURL } from '../utils/backRoutes';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import GradeIcon from '@material-ui/icons/Grade';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Howl, Howler } from 'howler';
// import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
// import { INIT_CONSTS } from '../utils/initConsts';
import { AuthContext } from '../context/AuthContext';
import { backRoutes } from '../utils/backRoutes';
// import { useHttp } from "../hooks/http.hook";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		boxSizing: 'border-box'
	},
	boxIcons: {
		paddingLeft: '40px',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'left',
		fontSize: '34px'
	},
	icons: {
		marginRight: '10px',
		fontSize: '34px',
		color: '#000000',
		cursor: 'pointer'
	},
	iconActive: {
		color: '#FFD700'
	}
}));

export default function CardIcons({ userWords, wordId, audioWord, audioMeaning, audioExample, difficulty, page }) {
	const classes = useStyles();
	const { userId, token } = useContext(AuthContext);
	const [ allUserWords, setAllUserWords ] = useState(userWords);
	const audio = new Howl({
		src: [ `${originURL}/${audioWord}` ],
		// volume: 0.001 * volume
		onend: function() {
			new Howl({
				src: [ `${originURL}/${audioMeaning}` ],
				onend: function() {
					new Howl({
						src: [ `${originURL}/${audioExample}` ]
					}).play();
				}
			}).play();
		}
	});
	const playWordsAudio = () => {
		Howler.stop();
		audio.play();
	};
	const func = useCallback(
		async () => {
			const result = await backRoutes.getUserWords({ userId, token });
			if (result) {
				setAllUserWords(result.userWords);
			}
		},
		[ token, userId ]
	);

	async function addWordToDictionary() {
		if (allUserWords.length === 0 || !allUserWords.filter((item) => wordId === item.wordId).length > 0) {
			await backRoutes.createUserWord({
				userId: userId,
				wordId: wordId,
				word: {
					difficulty: 'difficult',
					optional: { group: difficulty, page: page, deleted: false }
				},
				token: token
			});
		} else if (
			allUserWords &&
			allUserWords.filter((item) => wordId === item.wordId && item.difficulty === 'difficult').length > 0
		) {
			await backRoutes.createUserWord({
				userId: userId,
				wordId: wordId,
				word: {
					difficulty: 'weak',
					optional: { group: difficulty, page: page, deleted: false }
				},
				token: token
			});
		} else if (
			allUserWords &&
			allUserWords.filter((item) => wordId === item.wordId && item.difficulty !== 'difficult').length > 0
		) {
			await backRoutes.createUserWord({
				userId: userId,
				wordId: wordId,
				word: {
					difficulty: 'difficult',
					optional: { group: difficulty, page: page, deleted: false }
				},
				token: token
			});
		}
		func();
	}

	async function addWordToDictionaryDelete() {
    let data;
		if (allUserWords && !allUserWords.filter((item) => wordId === item.wordId).length > 0) {
			data = await backRoutes.createUserWord({
				userId: userId,
				wordId: wordId,
				word: {
					difficulty: 'weak',
					optional: { group: difficulty, page: page, deleted: true }
				},
				token: token
			});
		} else {
			data = await backRoutes.createUserWord({
				userId: userId,
				wordId: wordId,
				word: {
					difficulty: 'weak',
					optional: { group: difficulty, page: page, deleted: true }
				},
				token: token
			});
		}
    console.log(data)
	}

	return (
		<Box className={classes.boxIcons}>
			<PlayCircleFilledIcon onClick={playWordsAudio} className={classes.icons} />
			<GradeIcon
				className={
					allUserWords.length ? allUserWords.filter(
						(item) => wordId === item.wordId && item.difficulty === 'difficult'
					).length ? (
						`${classes.icons} ${classes.iconActive}`
					) : (
						`${classes.icons}`
					) : (
						`${classes.icons}`
					)
				}
				onClick={addWordToDictionary}
			/>
			<DeleteIcon className={classes.icons} onClick={addWordToDictionaryDelete} />
		</Box>
	);
}
