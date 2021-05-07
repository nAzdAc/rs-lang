import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles } from '../styles/componentsStyles/DictionaryDelete.styles';

export const DictionaryDelete = ({ group, userId, wordId, token, clickRestore }) => {
	const classes = useStyles(group);

	return (
		<Box className={classes.box}>
			<Typography className={classes.title} variant="h1" component="h4">
				Difficulty: {group + 1}
			</Typography>
			<Button variant="contained" className={classes.button} onClick={clickRestore}>
				Восстановить
			</Button>
		</Box>
	);
};
