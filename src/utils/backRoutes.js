const origin = 'http://localhost:8080';

const getRoute = (trailing) => `${origin}/${trailing}`;

export const backRoutes = {
	signUp: getRoute('users'),
	signIn: getRoute('signin'),
	upload: getRoute('upload')
};
