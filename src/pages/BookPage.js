import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import Box from '@material-ui/core/Box';
import { LevelButton } from '../components/LevelButton';
import { NavLink } from 'react-router-dom';
import { useHistory, Switch, Route, useRouteMatch } from 'react-router-dom';
import { bookLinks } from '../utils/links';
import { LevelsPage } from './LevelsPage';
import { useStyles } from '../styles/pagesStyles/BookPage.styles';

export const BookPage = () => {
	const classes = useStyles();
	const { location: { pathname } } = useHistory();
	const isBookRoute = pathname.slice(1).split('/').length === 1;
	const { path } = useRouteMatch();

	function LevelsBottons() {
		return (
			<React.Fragment>
				<Typography className={classes.title} variant="h1" component="h2">
					Выберите уровень сложности
				</Typography>
				<Box className={classes.buttonBox}>
					<NavLink className={classes.link} to={`book/level_1`}>
						<LevelButton group={1} />
					</NavLink>
					<NavLink className={classes.link} to={'book/level_2'}>
						<LevelButton group={2} />
					</NavLink>
					<NavLink className={classes.link} to={'book/level_3'}>
						<LevelButton group={3} />
					</NavLink>
					<NavLink className={classes.link} to={'book/level_4'}>
						<LevelButton group={4} />
					</NavLink>
					<NavLink className={classes.link} to={'book/level_5'}>
						<LevelButton group={5} />
					</NavLink>
					<NavLink className={classes.link} to={'book/level_6'}>
						<LevelButton group={6} />
					</NavLink>
				</Box>
			</React.Fragment>
		);
	}

	return (
		<Container className={classes.container}>
			<React.Fragment>
				{isBookRoute ? <LevelsBottons /> : null}
				<Switch>
					{bookLinks.map((link, index) => (
						<Route path={`${path}${link.to}`} key={index}>
							<LevelsPage />
						</Route>
					))}
				</Switch>
			</React.Fragment>
		</Container>
	);
};
