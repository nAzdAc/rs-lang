import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	button: {
		fontWeight: 'bold',
		width: '109px',
		height: '36px',
		background: '#01A299',
		color: '#FFF',
		'&:hover': {
			color: '#01A299'
		}
	}
});

export const SecondaryButton = ({ text }) => {
	const classes = useStyles();
	return (
		<Button variant="contained" size="medium" className={classes.button}>
			{text}
		</Button>
	);
};
