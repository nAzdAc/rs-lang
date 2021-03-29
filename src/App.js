import './App.css';
import Header from './components/Header';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { bookLinks, gamesLinks } from './components/routeData';
import { SettingsPage } from './pages/SettingsPage';
import { GamesPage } from './pages/GamesPage';
import { Footer } from './components/Footer';
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'

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
					{bookLinks.map((link, i) => (
						<Route path={link.to}>
							<RouteComponent text={link.text} />
						</Route>
					))}
					<Route path="/games">
						<GamesPage />
					</Route>
					{gamesLinks.map((link, i) => (
						<Route path={link.to}>
							<RouteComponent text={link.text} />
						</Route>
					))}
					<Route path="/dictionary">
						<RouteComponent text="Словарь" />
					</Route>
					<Route path="/stats">
						<RouteComponent text="Статистика" />
					</Route>
					<Route path="/settings">
						<SettingsPage />
					</Route>
					<Route path="/signin">
						<SignInPage/>
					</Route>
					<Route path="/signup">
						<SignUpPage/>
					</Route>
				</Switch>
        <Footer/>
			</div>
		</Router>
	);
}

export default App;
