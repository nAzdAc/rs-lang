import React from 'react';
import Typography from '@material-ui/core/Typography';
import { gameCardsContent } from '../utils/constants';
import { useHistory, Switch, Route, useRouteMatch } from 'react-router-dom';
import { SprintPage } from './SprintPage';
import { frontRoutes } from '../utils/frontRoutes';
import { MatchPage } from './MatchPage';
import { AudioPage } from './AudioPage';
import { SavannaPage } from './SavannaPage';
import { GameCard } from '../components/GameCard';
import { Box } from '@material-ui/core';
import { LevelButton } from '../components/LevelButton';
import { levels } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';
import { deleteLevel, setLevel } from '../redux/actions';

const Games = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { level } = useSelector((state) => state);
	function handleLevelsClick(index) {
		if (index === level) {
			dispatch(deleteLevel());
		} else {
			dispatch(setLevel(index));
		}
	}

	return (
		<div className={classes.root}>
			<Typography className={classes.title} variant="h3">
				Выберите уровень сложности
			</Typography>
			<Box className={classes.buttonBox}>
				{levels.map((item, index) => (
					<LevelButton
						key={index}
						click={() => handleLevelsClick(index)}
						group={item}
						isActive={index === level ? true : false}
					/>
				))}
			</Box>
			<Typography variant="h3" className={classes.title}>
				Выберите игру
			</Typography>
			<div className={classes.cardsWrap}>
				{gameCardsContent.map((card, index) => {
					return (
						<div key={index}>
							<GameCard name={card.name} todo={card.todo} to={card.to} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const GamesPage = () => {
	const { location: { pathname } } = useHistory();
	const isGamesRoute = pathname.slice(1).split('/').length === 1;
	// eslint-disable-next-line no-unused-vars
	const { path } = useRouteMatch();

	return (
		<React.Fragment>
			{isGamesRoute ? <Games /> : null}
			<Switch>
				<Route path={frontRoutes.savanna}>
					<SavannaPage />
				</Route>
				<Route path={frontRoutes.audio}>
					<AudioPage />
				</Route>
				<Route path={frontRoutes.sprint}>
					<SprintPage />
				</Route>
				<Route path={frontRoutes.match}>
					<MatchPage />
				</Route>
			</Switch>
		</React.Fragment>
	);
};
