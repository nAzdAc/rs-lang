import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer } from './components/Footer';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { Menu } from './components/Menu';
import { Link } from 'react-router-dom';
import { useStyles } from './styles/pagesStyles/App.styles';
import { useRoutes } from './hooks/routes.hook';
import { Typography } from '@material-ui/core';
import { Loader } from './components/Loader';

export const App = () => {
	const classes = useStyles();
	const { token, login, logout, userId, ready, userName, avatarURL, uploadAvatar, settings, setSettings } = useAuth();
	const routes = useRoutes();
	const isAuthenticated = !!token;

	if (!ready) {
		return <Loader />;
	}
	return (
		<AuthContext.Provider
			value={{
				token,
				login,
				logout,
				userId,
				userName,
				avatarURL,
				uploadAvatar,
				isAuthenticated,
				settings,
				setSettings
			}}
		>
			<Router>
				<div className={classes.app}>
					<header className={classes.header}>
						<Link to="/" className={classes.link}>
							<Typography variant="h2" className={classes.logo}>
								RS Lang
							</Typography>
						</Link>
						<Menu />
					</header>

					<React.Fragment>{routes}</React.Fragment>

					<Footer />
				</div>
			</Router>
		</AuthContext.Provider>
	);
};
