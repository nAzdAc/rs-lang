import './App.css';
import Header from './components/Header';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SettingsPage } from './pages/SettingsPage';
import GamesPage from './pages/GamesPage';
import { SprintPage } from './pages/SprintPage';
import { StatsPage } from './pages/StatsPage';
import { frontRoutes } from './utils/frontRoutes';
import { Footer } from './components/Footer';
import { MatchPage } from './pages/MatchPage';
import { AudioPage } from './pages/AudioPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { SavannaPage } from './pages/SavannaPage';
import ManePage from './pages/MainPage';
import BookPage from './pages/BookPage';

const RouteComponent = ({ text }) => <div>{text}</div>;

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<Switch>
					<Route exact path="/">
						<ManePage />
					</Route>
					<Route path="/book">
						<BookPage />
					</Route>
					<Route path="/games">
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
					<Route path="/dictionary">
						<RouteComponent text="Словарь" />
					</Route>
					<Route path="/stats">
						<StatsPage />
					</Route>
					<Route path="/settings">
						<SettingsPage />
					</Route>
					<Route path="/signin">
						<SignInPage />
					</Route>
					<Route path="/signup">
						<SignUpPage />
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
