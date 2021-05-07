import React, { useEffect, useMemo, useState } from 'react';
import { Typography } from '@material-ui/core';
import SpeakerIcon from '@material-ui/icons/Speaker';
import { showTitle } from '../utils/showTitle';
import winSong from '../assets/sounds/win.mp3';
import defeatSong from '../assets/sounds/defeat.mp3';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { INIT_CONSTS } from '../utils/initConsts';
import { createSound } from '../utils/helpers';
import { SavannaStatsCard } from './SavannaStatsCard';
import { useStyles } from '../styles/componentsStyles/GameStats.styles';

export const GameStats = ({ correctAnswers, failAnswers, lifes }) => {
	const classes = useStyles();
	const soundVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.soundVolume) || INIT_CONSTS.soundVolume, []);
	const wordVolume = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.wordVolume) || INIT_CONSTS.wordVolume, []);
	const [ title, setTitle ] = useState('');

	const audioWin = useMemo(() => createSound(winSong, soundVolume), [ soundVolume ]);
	const audioDefeat = useMemo(() => createSound(defeatSong, soundVolume), [ soundVolume ]);

	useEffect(
		() => {
			if (lifes === 0) {
				audioDefeat.play();
			} else {
				if (failAnswers.length < 6) {
					audioWin.play();
				} else {
					audioDefeat.play();
				}
			}
			setTitle(showTitle(failAnswers.length, correctAnswers.length, lifes));
			return () => {
				audioWin.stop();
				audioDefeat.stop();
			};
		},
		[ failAnswers, audioWin, audioDefeat, correctAnswers, lifes ]
	);

	function repeat(event) {
		const src = event.currentTarget.value;
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
							<React.Fragment>
								{item.src ? (
									<SavannaStatsCard key={index} item={item} fail={false} />
								) : (
									<div key={index} className={classes.row}>
										{item.audio ? (
											<button value={item.audio} onClick={repeat} className={classes.button}>
												<SpeakerIcon value={item.audio} onClick={repeat} className={classes.goodSpeaker} />
											</button>
										) : (
											''
										)}
										{item.transcription ? (
											<Typography className={classes.rowItem} variant="h6">
												{item.transcription}
											</Typography>
										) : (
											''
										)}
										{item.english ? (
											<Typography className={classes.rowItem} variant="h6">
												{`${item.english} - `}
											</Typography>
										) : (
											''
										)}
										{item.russian ? <Typography variant="h6">{item.russian}</Typography> : ''}
									</div>
								)}
							</React.Fragment>
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
							<React.Fragment>
								{item.src ? (
									<SavannaStatsCard key={index} item={item} fail={true} />
								) : (
									<div key={index} className={classes.row}>
										{item.audio ? (
											<button value={item.audio} onClick={repeat} className={classes.button}>
												<SpeakerIcon value={item.audio} onClick={repeat} className={classes.badSpeaker} />
											</button>
										) : (
											''
										)}
										{item.transcription ? (
											<Typography className={classes.rowItem} variant="h6">
												{item.transcription}
											</Typography>
										) : (
											''
										)}
										{item.english ? (
											<Typography className={classes.rowItem} variant="h6">
												{`${item.english} - `}
											</Typography>
										) : (
											''
										)}
										{item.russian ? <Typography variant="h6">{item.russian}</Typography> : ''}
									</div>
								)}
							</React.Fragment>
						);
					})}
			</div>
		</div>
	);
};
