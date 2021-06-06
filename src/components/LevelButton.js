import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

export const useStyles = makeStyles({
	lightButton: {
		width: '72px',
		minWidth: '36px',
		height: '72px',
		fontWeight: '600',
		fontSize: '52px',
		color: '#F2F2F2',
		fontStyle: 'inherit',
		'@media (max-width: 768px)': {
			width: '57px',
			height: '57px',
			fontSize: '27px'
		},
		'&:hover': {
			color: '#5600E8',
			backgroundColor: '#F2F2F2',
			boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)'
		},
		backgroundColor: (group) =>
			group === 1
				? '#BB86FC'
				: group === 2
					? '#985EFF'
					: group === 3
						? '#7F39FB'
						: group === 4 ? '#7314FA' : group === 5 ? '#5600E8' : group === 6 ? '#3700B3' : '#BB86FC'
	},
	lightButtonActive: {
		borderBottom: '7px solid #F2F2F2',
		marginBottom: '-7px'
	},
	darkButton: {
		width: '72px',
		minWidth: '36px',
		height: '72px',
		fontWeight: '600',
		fontSize: '52px',
		color: '#141414',
		fontStyle: 'inherit',
		'@media (max-width: 768px)': {
			width: '57px',
			height: '57px',
			fontSize: '27px'
		},
		'&:hover': {
			color: '#E38600',
			backgroundColor: '#141414',
			boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)'
		},
		backgroundColor: (group) =>
			group === 1
				? '#FCCA81'
				: group === 2
					? '#FCBD60'
					: group === 3
						? '#FAAC39'
						: group === 4 ? '#FC9F14' : group === 5 ? '#E38600' : group === 6 ? '#B86D00' : '#FCCA81'
	},
	darkButtonActive: {
		borderBottom: '7px solid black',
		marginBottom: '-7px'
	}
});

export const LevelButton = ({ group, isActive, click, ...atr }) => {
	const classes = useStyles(group);
	const { theme } = useSelector((state) => state.settings);

	return (
		<React.Fragment>
			{theme === 'dark' ? (
				<Button
					onClick={click}
					className={isActive ? `${classes.darkButton} ${classes.darkButtonActive}` : `${classes.darkButton}`}
					variant="contained"
				>
					{group}
				</Button>
			) : (
				<Button
					onClick={click}
					className={isActive ? `${classes.lightButton} ${classes.lightButtonActive}` : `${classes.lightButton}`}
					variant="contained"
				>
					{group}
				</Button>
			)}
		</React.Fragment>
	);
};
