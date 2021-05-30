import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
	progressContainer: {
		width: '80%',
		maxWidth: '800px',
		color: '#5600E8',
		background: 'inherit',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		gap: '10px',
		fontFamily: '"Itim", cursive;'
	},
	sideBarText: {
		fontSize: '1.25rem',
		fontWeight: 'bold',
		marginTop: '8px'
	},
	progressBarWrap: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		'& .MuiLinearProgress-root': {
			backgroundColor: '#BB86FC',
			height: '6px',
			borderRadius: '20px'
		}
	},
	overBarText: {
		margin: '0 auto',
		fontSize: '0.8rem',
		fontWeight: 'bold',
		marginBottom: '3px'
	}
});

export const GamesProgressBar = ({ currentNumber, allNumber }) => {
	const classes = useStyles();

	return (
		<Box className={classes.progressContainer}>
			<span className={classes.sideBarText}>{currentNumber}</span>
			<Box className={classes.progressBarWrap}>
				<span className={classes.overBarText}>{`${Math.round(currentNumber / allNumber * 100)} %`}</span>
				<LinearProgress variant="determinate" value={currentNumber / allNumber * 100} />
			</Box>
			<span className={classes.sideBarText}>{allNumber}</span>
		</Box>
	);
};
