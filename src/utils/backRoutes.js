export const origin = 'http://localhost:8080';


const token = (JSON.parse(localStorage.getItem('userData')))? JSON.parse(localStorage.getItem('userData')).token: '' ;

const getRoute = (trailing) => `${origin}/${trailing}`;

export const backRoutes = {
	signUp: getRoute('users'),
	signIn: getRoute('signin'),
	upload: getRoute('upload'),
	words: getRoute('words'),
	getWordsPage(group=0,page=0) {
		return `${origin}/words?group=${group}&page=${page}`;
	},
	createUserWord : async ({ userId, wordId, word, token }) => {
		console.log(token)
		const rawResponse = await fetch(`${origin}/users/${userId}/words/${wordId}`, {
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
	
		console.log(content);
	},
	getUserWord : async ({ userId, wordId }) => {
		const rawResponse = await fetch(`${origin}/users/${userId}/words/${wordId}`, {
			method: 'GET',
			withCredentials: true,
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
			}
		});
		const content = await rawResponse.json();
	
		console.log(content);
	},
	getUserWords : async ({ userId,token}) => {
		try{
			const rawResponse = await fetch(`${origin}/users/${userId}/words`, {
				method: 'GET',
				withCredentials: true,
				headers: {
					'Authorization': `Bearer ${token}`,
					'Accept': 'application/json',
				}
			});
			const content = await rawResponse.json();
			return content
		} catch(e){console.log(e)}
		
	},
	getWord(wordId) {
		return `${origin}/words/${wordId}`;
	},
};