import { LOCAL_STORAGE_KEY } from "./storageKey";

export const originURL = 'http://localhost:8080';
// export const originURL = 'https://react-learnwords.herokuapp.com';

//  ?group=1&page=1

const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData)) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData)).token : '';

const getRoute = (trailing) => `${originURL}/${trailing}`;

export const backRoutes = {
	signUp: getRoute('users'),
	signIn: getRoute('signin'),
	upload: getRoute('upload'),
	words: getRoute('words'),
	statistics: getRoute('statistics'),
	putStatistics : async ({userId, token, data}) => {
		console.log({userId})
		console.log({token})
		console.log({data})
		const res = await fetch(`${originURL}/users/${userId}/statistics/`, {
			method: 'PUT',
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const content = await res.json();
		console.log(content); 
		return content
	},
	getStats : async ({userId, token}) => {
		console.log('userId', userId)
		console.log('token', token)
		const res = await fetch(`${originURL}/users/${userId}/statistics/`, {
			method: 'GET',
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
			},
		});
		const content = await res.json();
		console.log(content); 
		return content
	},
	getWordsPage(group=0,page=0) {
		return `${originURL}/words?group=${group}&page=${page}`;
	},
	createUserWord : async ({ userId, wordId, word, token }) => {
		const rawResponse = await fetch(`${originURL}/users/${userId}/words/${wordId}`, {
			method: 'POST',
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(word)
		});
		const content = await rawResponse.json();
		console.log(content)
		return content
	},
	updateUserWord : async ({ userId, wordId, word, token }) => {
		console.log(word)
		const rawResponse = await fetch(`${originURL}/users/${userId}/words/${wordId}`, {
			method: 'PUT',
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(word)
		});
		const content = await rawResponse.json();
		console.log(content)
		return content
	},
	deleteUserWord : async ({ userId, wordId, token }) => {
		console.log(token)
		const rawResponse = await fetch(`${originURL}/users/${userId}/words/${wordId}`, {
			method: 'DELETE',
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			// body: JSON.stringify(word)
		});
		const content = await rawResponse.json();
		console.log(content);
		return content
	},
	getUserWord : async ({ userId, wordId }) => {
		const rawResponse = await fetch(`${originURL}/users/${userId}/words/${wordId}`, {
			method: 'GET',
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
			}
		});
		const content = await rawResponse.json();
		return content
	},
	getUserWords : async ({ userId,token}) => {
		try{
			const rawResponse = await fetch(`${originURL}/users/${userId}/words`, {
				method: 'GET',
				withCredentials: true,
				headers: {
					'Authorization': `Bearer ${token}`,
					'Accept': 'application/json',
				}
			});
			const content = await rawResponse.json();
			// console.log(content)
			return content
		} catch(e){console.log(e)}
		
	},
	getWord(wordId) {
		return `${originURL}/words/${wordId}`;
	},
};
