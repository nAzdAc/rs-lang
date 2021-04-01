export const origin = 'http://localhost:8080';

const getRoute = (trailing) => `${origin}/${trailing}`;

export const backRoutes = {
	signUp: getRoute('users'),
	signIn: getRoute('signin'),
	upload: getRoute('upload'),
	getWordsPage(group=0,page=0) {
		return `${origin}/words/?group=${group}&page=${page}`;
	},
	createUserWord(userId,wordId) {
		return `${origin}/users/${userId}/words/${wordId}`;
	},
};