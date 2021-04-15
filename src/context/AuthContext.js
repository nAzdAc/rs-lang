import { createContext } from 'react';

function noop() {}

export const AuthContext = createContext({
	token: null,
	refreshToken: null,
	userId: null,
	userName: null,
	login: noop,
	logout: noop,
	isAuthenticated: false,
	avatar: null,
	uploadAvatar: noop
});
