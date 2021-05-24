import { LOCAL_STORAGE_KEY } from './storageKey';

export const originURL =
	process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://nazdac-rs-lang.herokuapp.com';
console.log(originURL);

const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData))
	? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData)).token
	: '';

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
	},
	createUserWord: async ({ userId, wordId, word, token }) => {
		if (!userId || !token) return;
		const rawResponse = await fetch(`${originURL}/users/${userId}/words/${wordId}`, {
			method: 'POST',
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(word)
		});
		const content = await rawResponse.json();
		return content;
	},
	updateUserWord: async ({ userId, wordId, word, token }) => {
		if (!userId || !token) return;
		const rawResponse = await fetch(`${originURL}/users/${userId}/words/${wordId}`, {
			method: 'PUT',
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(word)
		});
		const content = await rawResponse.json();
		return content;
	},
	deleteUserWord: async ({ userId, wordId, token }) => {
		if (!userId || !token) return;
		const rawResponse = await fetch(`${originURL}/users/${userId}/words/${wordId}`, {
			method: 'DELETE',
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
		const content = await rawResponse.json();
		return content;
	},
	getUserWord: async ({ userId, wordId }) => {
		if (!userId || !token) return;
		const rawResponse = await fetch(`${originURL}/users/${userId}/words/${wordId}`, {
			method: 'GET',
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json'
			}
		});
		const content = await rawResponse.json();
		return content;
	},
	getUserWords: async ({ userId, token }) => {
		if (!userId || !token) return;
		try {
			const rawResponse = await fetch(`${originURL}/users/${userId}/words`, {
				method: 'GET',
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json'
				}
			});
			const content = await rawResponse.json();
			return content;
		} catch (e) {
			console.log(e);
		}
	},
	getUserWordsForDictionary: async ({ userId, token }) => {
		if (!userId || !token) return;
		try {
			const rawResponse = await fetch(`${originURL}/users/${userId}/words/dictionary`, {
				method: 'GET',
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json'
				}
			});
			const content = await rawResponse.json();
			return content;
		} catch (e) {
			console.log(e);
		}
	},
	getWord(wordId) {
		return `${originURL}/words/${wordId}`;
	}
};
