import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';
import { frontRoutes } from '../utils/frontRoutes';

const games = [
	{ link: frontRoutes.savanna, name: 'Саванна' },
	{ link: frontRoutes.audio, name: 'Аудиовызов' },
	{ link: frontRoutes.sprint, name: 'Спринт' },
	{ link: frontRoutes.match, name: 'Отгадай Картинку' }
];

export const GamesCaller = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Typography className={classes.title} variant="h3">
				Выберите игру
			</Typography>
			<div className={classes.buttonBox}>
				{games.map((game, index) => {
					return (
						<Link
							key={index}
							to={{
								pathname: game.link
							}}
              className={classes.link}
						>
							<Button className={classes.button} variant="contained" size="medium">
								{game.name}
							</Button>
						</Link>
					);
				})}
			</div>
		</React.Fragment>
	);
};
