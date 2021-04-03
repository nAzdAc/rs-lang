import './App.css';
import Header from './components/Header';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter  } from 'react-router-dom';
import { bookLinks } from './components/routeData';
import { SettingsPage } from './pages/SettingsPage';
import GamesPage from './pages/GamesPage';
import { SprintPage } from './pages/SprintPage';
import { frontRoutes } from './utils/frontRoutes';
import { Footer } from './components/Footer';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
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
            <ManePage/>
          </Route>
          <Route path='/book'>
            <BookPage/>
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
