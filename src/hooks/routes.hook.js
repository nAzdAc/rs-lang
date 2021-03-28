import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from '../components/SignIn';
import { SettingsPage } from '../pages/SettingsPage';

export const useRoutes = (isAuthenticated) => {
	return (
		<Switch>
			{/* <Route path="/" exact>
				<MainPage />
			</Route>
			<Route path="/" exact>
				<SignInPage />
			</Route>
			<Route path="/signup" exact>
				<SignUpPage />
			</Route> */}
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
