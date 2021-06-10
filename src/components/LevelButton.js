import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { icons } from '../assets/icons/IconsRequire';

export const useStyles = makeStyles({
	buttonActive: (props) => ({
		borderBottom: '7px solid',
		marginBottom: '-7px',
		borderColor: props.theme === 'dark' ? '#141414' : '#F2F2F2',
		boxShadow:
			props.theme === 'dark' ? '3px 0px 10px 3px rgba(227, 134, 0, 0.5)' : '3px 0px 10px 3px rgba(86, 0, 232, 0.6)'
	}),
	button: (props) => ({
		cursor: props.theme === 'dark' ? `url(${icons.darkPointer}), default` : `url(${icons.lightPointer}), default`,
		width: '72px',
		minWidth: '36px',
		height: '72px',
		fontWeight: '600',
		fontSize: '52px',
		color: props.theme === 'dark' ? '#141414' : '#F2F2F2',
		fontStyle: 'inherit',
		'@media (max-width: 768px)': {
			width: '57px',
			height: '57px',
			fontSize: '27px'
		},
		'&:hover': {
			marginBottom: '0px',
			borderBottom: '0px solid',
			color: props.theme === 'dark' ? '#E38600' : '#5600E8',
			backgroundColor: props.theme === 'dark' ? '#141414' : '#F2F2F2'
		},
		backgroundColor:
			props.theme === 'dark'
				? props.group === 1
					? '#FCCA81'
					: props.group === 2
						? '#FCBD60'
						: props.group === 3
							? '#FAAC39'
							: props.group === 4
								? '#FC9F14'
								: props.group === 5 ? '#E38600' : props.group === 6 ? '#B86D00' : '#FCCA81'
				: props.group === 1
					? '#BB86FC'
					: props.group === 2
						? '#985EFF'
						: props.group === 3
							? '#7F39FB'
							: props.group === 4
								? '#7314FA'
								: props.group === 5 ? '#5600E8' : props.group === 6 ? '#3700B3' : '#BB86FC'
	})
});

export const LevelButton = ({ group, isActive, click, ...atr }) => {
	const { theme } = useSelector((state) => state.settings);
	const classes = useStyles({ group, theme });

	return (
		<Button
			onClick={click}
			className={isActive ? `${classes.button} ${classes.buttonActive}` : `${classes.button}`}
			variant="contained"
		>
			{group}
		</Button>
	);
};
