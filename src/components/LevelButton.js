import React from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from '../styles/componentsStyles/LevelButton.styles';

export const LevelButton = ({ group, isActive, click, ...atr }) => {
	const classes = useStyles(group);

	return (
		<div className={classes.root}>
			<Button
				onClick={click}
				className={isActive ? `${classes.button} ${classes.buttonActive}` : `${classes.button}`}
				variant="contained"
			>
				{group}
			</Button>
		</div>
	);
};
