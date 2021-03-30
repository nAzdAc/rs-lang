import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import SignIn from '../components/SignIn';
import { SettingsPage } from '../pages/SettingsPage';
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import WordsPage from '../pages/SignInPage'

export const useRoutes = (isAuthenticated) => {
	return (
		<Switch>
			{/* <Route path="/" exact>
				<MainPage />
			</Route> */}
			<Route path="/" exact>
				<SignInPage />
			</Route>
			<Route path="/words" exact>
				<WordsPage />
			</Route>
			<Route path="/signup" >
				<SignUpPage />
			</Route>
			<Route path="/signin" >
				<SignInPage />
			</Route>
			<Route path="/settings">
				<SettingsPage />
			</Route>
			{/* <Route path="/signin" exact>
				<SignIn />
			</Route>
			<Redirect to="/signin" /> */}
		</Switch>
	);
};
