import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'


export const useRoutes = (isAuthenticated) => {
	// if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/register">
					<SignUpPage></SignUpPage>
				</Route>
				<Route path="/login" >
					<SignInPage></SignInPage>
				</Route>
				{/* <Redirect to="/login" /> */}
			</Switch>
		);
	// }

	// return (
	// 	<Switch>
	// 		<Route path="/" exact>
	// 		<SignUpPage></SignUpPage>
	// 		</Route>
	// 		<Redirect to="/" />
	// 	</Switch>
	// );
};
