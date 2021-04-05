import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	root: {
		'& > *': {
			margin: '8px'
		}
	},
	button: {
		marginRight: '40px',
		width: '72px',
		height: '72px',
		fontSize: '52px',
		color: 'white',
		backgroundColor: (group) =>
			group === 1
				? '#BB86FC'
				: group === 2
					? '#985EFF'
					: group === 3
						? '#7F39FB'
						: group === 4 ? '#6200EE' : group === 5 ? '#5600E8' : group === 6 ? '#3700B3' : '#3700B3'
	},
	buttonActive: {
		borderBottom: '4px solid white',
		margiBottom: '-4px'
	}
});

export default function LevelButton(props) {
	const group = props.group;
	const classes = useStyles(group);
	let state = classes.button;
	if (props.state === 'active') {
		state = `${classes.button} ${classes.buttonActive}`;
	}
	// const handleButtonBoxClick = (e) => {
	//   console.log('hello')
	//   state = (`${classes.button} ${classes.buttonActive}`)
	// }

	return (
		<div className={classes.root}>
			<Button onClick={props.click} className={state} variant="contained">
				{props.group}
			</Button>
		</div>
	);
}
