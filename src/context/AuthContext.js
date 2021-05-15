import { createContext } from 'react';

function noop() {}

export const AuthContext = createContext({
	token: null,
	userId: null,
	userName: null,
	login: noop,
	logout: noop,
	avatarURL: null,
	uploadAvatar: noop,
	settings: {},
	isAuthenticated: false
});
