import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
// import SpeakerIcon from '@material-ui/icons/Speaker';
import { showTitle } from '../utils/showTitle';
import winSong from '../sounds/win.mp3';
import defeatSong from '../sounds/defeat.mp3';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import { createSound } from '../utils/helpers';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		paddingTop: '30px'
	},
	title: {
		marginBottom: '20px'
	},
	subtitle: {
		marginTop: '10px',
		marginBottom: '10px'
	},
	rowsWrap: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		width: '90%',
		marginBottom: '30px'
	},
	row: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		marginBottom: '5px'
	},
	rowItem: {
		marginRight: '10px'
	},
	speaker: {
		display: 'inline-block',
		marginRight: '10px'
	},
	goodButton: {
		marginRight: '10px',
		borderRadius: '5px',
		border: 'none',
		cursor: 'pointer',
		fontWeight: 'bold',
		width: '20px',
		height: '30px',
		background: '#01A299',
		color: '#FFF',
		'&:hover': {
			background: '#00D9CE'
		}
	}
});

export const GameStatsPage = ({ correctAnswers, failAnswers }) => {
	const classes = useStyles();
	const soundVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.soundVolume) || INIT_CONSTS.soundVolume, []);
	const wordVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.wordVolume) || INIT_CONSTS.wordVolume, []);
	const [ title, setTitle ] = useState('');

	const audioWin = useMemo(() => createSound(winSong, soundVolume), [ soundVolume ]);
	const audioDefeat = useMemo(() => createSound(defeatSong, soundVolume), [ soundVolume ]);

	useEffect(
		() => {
			console.log(correctAnswers)
			console.log(failAnswers)
			if (failAnswers.length < 6) {
				audioWin.play();
			} else {
				audioDefeat.play();
			}
			setTitle(showTitle(failAnswers.length));
			return () => {
				audioWin.stop();
				audioDefeat.stop();
			};
		},
		[ failAnswers, audioWin, audioDefeat, correctAnswers ]
	);

	function repeat(event) {
		const src = event.target.value;
		const audioWord = createSound(`${src}`, wordVolume, 0.9);
		audioWord.play();
	}

	return (
		<div className={classes.root}>
			<Typography className={classes.title} variant="h3" id="transition-modal-title">
				{title}
			</Typography>
			<Typography className={classes.subtitle} variant="h4">{`Верных ответов: ${correctAnswers.length}`}</Typography>
			<div className={classes.rowsWrap}>
				{correctAnswers &&
					correctAnswers.map((item, index) => {
						return (
							<div key={index} className={classes.row}>
								{item.audio ? (
									<button key={item.audio} value={item.audio} onClick={repeat} className={classes.goodButton} />
								) : (
									''
								)}
								{item.transcription ? (
									<Typography className={classes.rowItem} key={item.transcription} variant="h6">
										{item.transcription}
									</Typography>
								) : (
									''
								)}
								{item.english ? (
									<Typography className={classes.rowItem} key={item.english} variant="h6">
										{`${item.english} - `}
									</Typography>
								) : (
									''
								)}
								{item.russian ? (
									<Typography key={item.russian} variant="h6">
										{item.russian}
									</Typography>
								) : (
									''
								)}
							</div>
						);
					})}
			</div>
			<Typography
				className={classes.subtitle}
				color="secondary"
				variant="h4"
			>{`Ошибок: ${failAnswers.length}`}</Typography>
			<div className={classes.rowsWrap}>
				{failAnswers &&
					failAnswers.map((item, index) => {
						return (
							<div className={classes.row}>
								{item.audio ? (
									<button key={item.audio} value={item.audio} onClick={repeat} className={classes.goodButton} />
								) : (
									''
								)}
								{item.transcription ? (
									<Typography color="secondary" className={classes.rowItem} key={item.transcription} variant="h6">
										{item.transcription}
									</Typography>
								) : (
									''
								)}
								{item.english ? (
									<Typography color="secondary" className={classes.rowItem} key={item.english} variant="h6">
										{`${item.english} - `}
									</Typography>
								) : (
									''
								)}
								{item.russian ? (
									<Typography color="secondary" key={item.russian} variant="h6">
										{item.russian}
									</Typography>
								) : (
									''
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
};
