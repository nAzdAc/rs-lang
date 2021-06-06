import React, { useEffect, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { convertText, createSound } from '../utils/helpers';
import SpeakerIcon from '@material-ui/icons/Speaker';
import { originURL } from '../utils/backRoutes';
import { useSelector } from 'react-redux';
import { Box, Collapse } from '@material-ui/core';
import { useStyles } from '../styles/componentsStyles/GameRow.styles';

export const GameRow = ({ answer, color }) => {
	useEffect(
		() => {
			console.log(color);
			console.log(typeof color);
		},
		[ answer, color ]
	);
	const [ addInfo, setAddInfo ] = useState(false);
	const { wordVolume } = useSelector((state) => state.settings);
	const classes = useStyles();

	function repeat(event) {
		const src = event.currentTarget.value;
		const audioWord = createSound(`${originURL}/${src}`, wordVolume, 0.9);
		audioWord.play();
	}

	return (
		<React.Fragment>
			<TableRow key={`${answer.word}answer${answer._id}`}>
				<TableCell className={classes.englishText}>{answer.word}</TableCell>
				<TableCell className={classes.translateText}>{answer.wordTranslate}</TableCell>
				<TableCell>{answer.transcription}</TableCell>
				<TableCell>
					<button value={answer.audio} onClick={repeat} className={classes.iconWrap}>
						<SpeakerIcon className={classes.icon} />
					</button>
				</TableCell>
				<TableCell component="th" scope="row">
					<button className={classes.iconWrap} onClick={() => setAddInfo(!addInfo)}>
						{addInfo ? (
							<KeyboardArrowUpIcon className={classes.icon} style={{ color: `${color}` }} />
						) : (
							<KeyboardArrowDownIcon className={classes.icon} style={{ color: `${color}` }} />
						)}
					</button>
				</TableCell>
			</TableRow>
			<TableRow key={`${answer.word}fail${answer._id}`}>
				<TableCell colSpan={6}>
					<Collapse in={addInfo} timeout="auto" unmountOnExit>
						<Box className={classes.addContainer}>
							<img className={classes.addImage} alt={answer.word} src={`${originURL}/${answer.image}`} />
							<Box className={classes.addTextWrapper}>
								<p className={classes.englishText}>{convertText(answer.textExample)}</p>
								<p className={classes.translateText}>{answer.textExampleTranslate}</p>
							</Box>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};
