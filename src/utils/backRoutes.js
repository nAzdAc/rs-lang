// export const origin = 'http://localhost:8080';
export const originURL = 'https://react-learnwords.herokuapp.com';

const getRoute = (trailing) => `${originURL}/${trailing}`;

export const backRoutes = {
	signUp: getRoute('users'),
	signIn: getRoute('signin'),
	upload: getRoute('upload'),
	words: getRoute('words'),
};

// ?group=1&page=1