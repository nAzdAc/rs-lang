import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { Link } from 'react-router-dom';
import { useStyles } from './styles/pagesStyles/App.styles';
import { useRoutes } from './hooks/routes.hook';
import { EnterPoint } from './components/EnterPoint';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

export const App = () => {
	const classes = useStyles();
	const routes = useRoutes();
	const { theme } = useSelector((state) => state.settings);
	return (
		<Router>
			<div className={theme === 'dark' ? classes.darkApp : classes.lightApp}>
				<header className={theme === 'dark' ? classes.darkHeader : classes.lightHeader}>
					<Link to="/" className={classes.logo}>
						RS Lang
					</Link>
					<Menu />
					<EnterPoint />
				</header>
				<React.Fragment>{routes}</React.Fragment>
				<ToastContainer className={theme === 'dark' ? classes.darkToast : classes.lightToast} />
				<Footer />
			</div>
		</Router>
	);
};
