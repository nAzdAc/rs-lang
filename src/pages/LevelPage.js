import React from 'react';
import Box from '@material-ui/core/Box';
import { LevelButton } from '../components/LevelButton';
import { NavLink } from 'react-router-dom';
import { useHistory, Switch, Route, useRouteMatch } from 'react-router-dom';
import { bookLinks } from '../utils/constants';
import { BookPage } from './BookPage';
import { useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';
import { useSelector } from 'react-redux';

export const LevelPage = () => {
	const { theme } = useSelector((state) => state.settings);
	const { location: { pathname } } = useHistory();
	const isBookRoute = pathname.slice(1).split('/').length === 1;
	const { path } = useRouteMatch();
	const classes = useStyles({ theme });

	const LevelsButtons = () => {
		return (
			<React.Fragment>
				<h2 className={classes.title}>Выберите уровень сложности</h2>
				<Box className={classes.buttonBox}>
					{bookLinks.map((link, index) => {
						return (
							<NavLink key={`${link.to}bookLinks-LvlBtns`} className={classes.link} to={`book${link.to}`}>
								<LevelButton group={index + 1} />
							</NavLink>
						);
					})}
				</Box>
			</React.Fragment>
		);
	};

	return (
		<div className={classes.root}>
			{isBookRoute && <LevelsButtons />}
			<Switch>
				{bookLinks.map((link, index) => (
					<Route path={`${path}${link.to}`} key={`${link.to}bookLinks-Level`}>
						<BookPage />
					</Route>
				))}
			</Switch>
		</div>
	);
};
