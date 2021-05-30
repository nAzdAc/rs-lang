import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getOffset } from '../utils/helpers';

const useStyles = makeStyles({
	timerContainer: {
		width: '180px',
		height: '180px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		borderRadius: '50%'
	},
	timerTextWrap: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#F2F2F2',
		width: '80px',
		height: '80px',
		position: 'absolute',
		borderRadius: '50%',
		fontSize: '40px',
		fontFamily: '"Itim", cursive;',
		color: '#5600E8',
		zIndex: '3'
	},
	circle: {
		transformOrigin: 'center',
		transform: 'rotate(-90deg)',
		transition: '0.3s'
	},
	timerText: {}
});

export const RoundTimer = ({ seconds }) => {
	const classes = useStyles();
	const circleRef = useRef();

	useEffect(
		() => {
			circleRef.current.style.strokeDashoffset = getOffset(seconds, 60);
		},
		[ seconds ]
	);

	return (
		<div className={classes.timerContainer}>
			<svg width="120" height="120" className={classes.timerRingWrap}>
				<circle
					ref={circleRef}
					className={classes.circle}
					stroke="#5600E8"
					strokeWidth="15"
					cx="60"
					cy="60"
					r="52"
					fill="transparent"
					strokeDasharray={`${2 * Math.PI * 52} ${2 * Math.PI * 52}`}
					strokeDashoffset={`${2 * Math.PI * 52}`}
				/>
			</svg>
			<div className={classes.timerTextWrap}>
				<span className={classes.timerText}>{seconds}</span>
			</div>
		</div>
	);
};
