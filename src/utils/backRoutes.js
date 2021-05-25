export const originURL =
	process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://nazdac-rs-lang.herokuapp.com';
console.log(originURL);

const getRoute = (trailing) => `${originURL}/${trailing}`;

export const backRoutes = {
	signUp: getRoute('signup'),
	signIn: getRoute('signin'),
	upload: getRoute('upload'),
	userWords: getRoute('userWords'),
	settings: getRoute('settings'),
	statistics: getRoute('statistics'),
	updateWord: getRoute('updateWord'),
	getWordsPage(group = 0, page = 0) {
		return `${originURL}/words?group=${group}&page=${page}`;
	}
};
