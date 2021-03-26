const origin = 'http://localhost:8080';

const getRoute = (trailing) => `${origin}/${trailing}`;

export const routes = {
	signUp: getRoute('users'),
	signIn: getRoute('signin'),
};
