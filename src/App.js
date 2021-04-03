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
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import WordsPage from './pages/WordsPage'
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import DictionaryPage from './pages/DictionaryPage'
import BookPage from './pages/BookPage'


const RouteComponent = ({ text }) => <div>{text}</div>;

function App() {
	const { token, login, logout, userId, ready, userName } = useAuth();
	const isAuthenticated = !!token;
	return (
		<AuthContext.Provider
			value={{
				token,
				login,
				logout,
				userId,
				isAuthenticated,
				userName
			}}
		>
			<Router>
				<div className="App">
					<Header />
					<Switch>
						<Route path="/book">
						<BookPage></BookPage>
						</Route>
						{bookLinks.map((link, index) => (
							<Route path={link.to} key={index}>
							<WordsPage/>
							</Route>
						))}
						<Route path="/book/level_1">
							<RouteComponent text="level" />
						</Route>
						<Route path="/games">
							<GamesPage />
						</Route>
							<Route path={frontRoutes.savanna}>
								<SprintPage />
							</Route>
							<Route path={frontRoutes.audio}>
								<SprintPage />
							</Route>
							<Route path={frontRoutes.sprint}>
								<SprintPage />
							</Route>
							<Route path={frontRoutes.match}>
								<SprintPage />
							</Route>
						<Route path="/dictionary">
							<DictionaryPage></DictionaryPage>
						</Route>
						<Route path="/words">
							<WordsPage/>
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
		</AuthContext.Provider>
		
	);
}

export default App;
