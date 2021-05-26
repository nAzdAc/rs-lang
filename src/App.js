import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { Link } from 'react-router-dom';
import { useStyles } from './styles/pagesStyles/App.styles';
import { useRoutes } from './hooks/routes.hook';

export const App = () => {
	const classes = useStyles();
	const routes = useRoutes();
	return (
		<Router>
			<div className={classes.app}>
				<header className={classes.header}>
					<Link to="/" className={classes.logo}>
						RS Lang
					</Link>
					<Menu />
				</header>
				<React.Fragment>{routes}</React.Fragment>
				<Footer />
			</div>
		</Router>
	);
};
