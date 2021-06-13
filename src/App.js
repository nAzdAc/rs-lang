import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { Link } from 'react-router-dom';
import { useStyles } from './styles/pagesStyles/App.styles';
import { useRoutes } from './hooks/routes.hook';
import EnterPoint from './components/EnterPoint';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { frontRoutes } from './utils/frontRoutes';

export const App = () => {
	const { theme } = useSelector((state) => state.settings);
	const { block } = useSelector((state) => state);
	const classes = useStyles({ theme, block });
	const routes = useRoutes();

	return (
		<Router>
			<div className={classes.app}>
				<header className={classes.header}>
					<Link to={frontRoutes.main} className={classes.logo}>
						RS Lang
					</Link>
					<Menu />
					<EnterPoint />
				</header>
				<React.Fragment>{routes}</React.Fragment>
				<ToastContainer className={classes.toast} />
				<Footer />
			</div>
		</Router>
	);
};
