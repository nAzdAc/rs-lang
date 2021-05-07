import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { SettingsPage } from './pages/SettingsPage';
import { GamesPage } from './pages/GamesPage';
import { SprintPage } from './pages/SprintPage';
import { StatsPage } from './pages/StatsPage';
import { frontRoutes } from './utils/frontRoutes';
import { Footer } from './components/Footer';
import { MatchPage } from './pages/MatchPage';
import { AudioPage } from './pages/AudioPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { SavannaPage } from './pages/SavannaPage';
import { MainPage } from './pages/MainPage';
import { BookPage } from './pages/BookPage';
import { LevelsPage } from './pages/LevelsPage';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { DictionaryPage } from './pages/DictionaryPage';
import { useStyles } from './styles/pagesStyles/App.styles';

export const App = () => {
	const classes = useStyles();
	const { token, login, logout, userId, userName, avatar, uploadAvatar, settings } = useAuth();
	const isAuthenticated = !!token;
	return (
		<AuthContext.Provider
			value={{
				token,
				login,
				logout,
				userId,
				isAuthenticated,
				userName,
				avatar,
				uploadAvatar,
				settings
			}}
		>
			<Router>
				<div className={classes.app}>
					<Header />
					<Switch>
						<Route exact path="/">
							<MainPage />
						</Route>
						<Route path="/book">
							<BookPage />
						</Route>
						<Route path={frontRoutes.games}>
							<GamesPage />
						</Route>
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
						<Route path={frontRoutes.dictionary}>
							<DictionaryPage />
						</Route>
						<Route path={frontRoutes.levels}>
							<LevelsPage />
						</Route>
						<Route path={frontRoutes.stats}>
							<StatsPage />
						</Route>
						<Route path={frontRoutes.settings}>
							<SettingsPage />
						</Route>
						<Route path={frontRoutes.signIn}>
							<SignInPage />
						</Route>
						<Route path={frontRoutes.signUp}>
							<SignUpPage />
						</Route>
					</Switch>
					<Footer />
				</div>
			</Router>
		</AuthContext.Provider>
	);
}
