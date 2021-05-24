import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from '../styles/componentsStyles/GameStats.styles.js';
import classNames from 'classnames/bind';
import { originURL } from '../utils/backRoutes.js';
import { convertText } from '../utils/helpers.js';

export const SavannaStatsCard = ({ item, fail }) => {
	const { word, wordTranslate, image, textMeaning } = item;
	const classes = useStyles();
	const styles = classNames.bind(classes);
	const textStyles = styles({ meaning: true }, { failColor: fail });

	return (
		<div className={classes.savannaContainer}>
			<img className={classes.image} src={`${originURL}/${image}`} alt={word} title={word} />
			<div className={classes.content}>
				<Typography variant="h5" className={textStyles}>
					{`${word} - ${wordTranslate}`}
				</Typography>
				<Typography variant="h6" className={textStyles}>
					{`${convertText(textMeaning)}`}
				</Typography>
			</div>
		</div>
	);
};
