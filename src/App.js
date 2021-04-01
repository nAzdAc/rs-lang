import './App.css';
import Header from './components/Header';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { bookLinks } from './components/routeData';
import { SettingsPage } from './pages/SettingsPage';
import { GamesPage } from './pages/GamesPage';
import { SprintPage } from './pages/SprintPage';
import { frontRoutes } from './utils/frontRoutes';
import { Footer } from './components/Footer';
import { MatchPage } from './pages/MatchPage';
import { AudioPage } from './pages/AudioPage';

const RouteComponent = ({ text }) => <div>{text}</div>;

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<Switch>
					<Route path="/book">
						<RouteComponent text="Book" />
					</Route>
					{bookLinks.map((link, index) => (
						<Route path={link.to} key={index}>
							<RouteComponent text={link.text} />
						</Route>
					))}
					<Route path="/games">
						<GamesPage />
					</Route>
					<Route path={frontRoutes.savanna}>
						<SprintPage />
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
						<RouteComponent text="Статистика" />
					</Route>
					<Route path="/settings">
						<SettingsPage />
					</Route>
					<Route path="/login">
						<RouteComponent text="Login" />
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
