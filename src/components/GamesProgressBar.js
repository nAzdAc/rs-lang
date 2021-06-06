import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
	progressContainer: {
		width: '80%',
		maxWidth: '800px',
		color: 'inherit',
		background: 'inherit',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		gap: '10px',
		fontFamily: 'inherit'
	},
	sideBarText: {
		fontSize: '1.25rem',
		fontWeight: 'bold',
		marginTop: '8px'
	},
	lightProgressBarWrap: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		'& .MuiLinearProgress-root': {
			backgroundColor: '#BB86FC',
			height: '6px',
			borderRadius: '20px',
			'& .MuiLinearProgress-barColorPrimary': {
				backgroundColor: '#5600E8'
			}
		}
	},
	darkProgressBarWrap: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		'& .MuiLinearProgress-root': {
			backgroundColor: '#FCCA81',
			height: '6px',
			borderRadius: '20px',
			color: 'red',
			'& .MuiLinearProgress-bar': {
				backgroundColor: '#E38600'
			}
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
	const { theme } = useSelector((state) => state.settings);

	return (
		<Box className={classes.progressContainer}>
			<span className={classes.sideBarText}>{currentNumber}</span>
			<Box className={theme === 'dark' ? classes.darkProgressBarWrap : classes.lightProgressBarWrap}>
				<span className={classes.overBarText}>{`${Math.round(currentNumber / allNumber * 100)} %`}</span>
				<LinearProgress variant="determinate" value={currentNumber / allNumber * 100} />
			</Box>
			<span className={classes.sideBarText}>{allNumber}</span>
		</Box>
	);
};
