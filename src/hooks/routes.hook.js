import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from '../components/SignIn'


export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/main" exact>
					<SignIn />
				</Route>
				<Redirect to="/main" />
			</Switch>
		);
	}

	return (
		<Switch>
			<Route path="/" exact>
			<SignIn />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};
