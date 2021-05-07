import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../styles/componentsStyles/WordInfo.styles';

export const WordInfo = ({ group, icons }) => {
	const classes = useStyles(group);

	return (
		<Box className={classes.box}>
			{icons}
			<Typography className={classes.title} variant="h1" component="h4">
				Difficulty: {group + 1}
			</Typography>
		</Box>
	);
}
