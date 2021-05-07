import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from '../styles/componentsStyles/GameStats.styles.js';
import classNames from 'classnames/bind';

export const SavannaStatsCard = ({ item, fail }) => {
	const { english, russian, src, meaning } = item;
	const classes = useStyles();
	const styles = classNames.bind(classes);
	const textStyles = styles({ textMeaning: true }, { failColor: fail });

	return (
		<div className={classes.savannaContainer}>
			<img className={classes.image} src={src} alt={english} title={english} />
			<div className={classes.content}>
				<Typography variant="h6" className={textStyles}>
					{meaning}
				</Typography>
				<Typography variant="h5" className={textStyles}>
					{`${english} - ${russian}`}
				</Typography>
			</div>
		</div>
	);
};
