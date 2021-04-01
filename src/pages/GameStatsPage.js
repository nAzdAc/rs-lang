import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { showTitle } from '../utils/showTitle';
import winSong from '../sounds/win.mp3';
import defeatSong from '../sounds/defeat.mp3';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import { Howl } from 'howler';

const useStyles = makeStyles({
	root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',

  },
});

export const GameStatsPage = ({ allCorrectArray, allFailArray }) => {
	const classes = useStyles();
	const soundVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.soundVolume) || INIT_CONSTS.soundVolume, []);
	const [ title, setTitle ] = useState('');

	const audioDefeat = new Howl({
		src: [ defeatSong ],
		volume: 0.01 * soundVolume,
	});
	const audioWin = new Howl({
		src: [ winSong ],
		volume: 0.01 * soundVolume,
	});

	useEffect(
		() => {
			if (allFailArray.length < 6) {
				audioWin.play();
			} else {
				audioDefeat.play();
			}
			setTitle(showTitle(allFailArray.length));
			return () => {
				audioWin.stop();
				audioDefeat.stop();
			};
		},
		[ allFailArray ]
	);

	return (
		<div className={classes.root}>
			<Typography variant="h3" id="transition-modal-title">
				{title}
			</Typography>
			<Typography variant="h4">{`Верных ответов: ${allCorrectArray.length}`}</Typography>
			{/* <div>
				{allCorrectArray &&
					allCorrectArray.map((item, index) => {
						return (
							<Typography key={index} variant="subtitle2">
								{item}
							</Typography>
						);
					})}
			</div> */}
			<Typography color="secondary" variant="h4">{`Ошибок: ${allFailArray.length}`}</Typography>
			{/* <div>
				{allFailArray &&
					allFailArray.map((item, index) => {
						return (
							<Typography key={index} variant="subtitle2">
								{item}
							</Typography>
						);
					})}
			</div> */}
		</div>
	);
};
