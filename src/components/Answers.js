import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles/componentsStyles/Answers.styles';

export const Answers = ({ fail, correct, token, userId, wordId }) => {
	const classes = useStyles();
	return (
		<Box className={classes.box}>
			<Typography className={classes.title} variant="h1" component="h4">
				Правильные ответы: <span className={classes.correct}>{correct ? correct : 0}</span>
			</Typography>
			<Typography className={classes.title} variant="h1" component="h4">
				Ошибки: <span className={classes.wrong}>{fail ? fail : 0}</span>
			</Typography>
		</Box>
	);
};
