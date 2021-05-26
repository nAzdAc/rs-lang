import { backRoutes } from '../utils/backRoutes';
import { LOCAL_STORAGE_KEY } from '../utils/constants';
import {
	DELETE_LEVEL,
	FETCH_SETTINGS,
	HIDE_LOADER,
	HIDE_MESSAGE,
	LOG_OUT,
	POST_STATS,
	SET_ACTIVE_WORDS,
	SET_LEVEL,
	SET_NAME,
	SET_VOLUME,
	SHOW_LOADER,
	SHOW_MESSAGE,
	SIGN_IN,
	UPDATE_USER_WORD,
	UPLOAD_AVATAR
} from './types';

export function showLoader() {
	return {
		type: SHOW_LOADER
	};
}

export function hideLoader() {
	return {
		type: HIDE_LOADER
	};
}

export function showMessage(text) {
	return {
		type: SHOW_MESSAGE,
		payload: text
	};
}

export function hideMessage() {
	return {
		type: HIDE_MESSAGE
	};
}

export function setVolume(name, value) {
	return {
		type: SET_VOLUME,
		payload: {
			[name]: value
		}
	};
}
export function setLevel(value) {
	return {
		type: SET_LEVEL,
		payload: value
	};
}

export function deleteLevel() {
	return {
		type: DELETE_LEVEL
	};
}

export function reduxLogOut() {
	localStorage.removeItem(LOCAL_STORAGE_KEY.userData);
	return {
		type: LOG_OUT
	};
}

export function setActiveWords(arr) {
	return async (dispatch) => {
		dispatch({ type: SET_ACTIVE_WORDS, payload: arr });
	};
}

export function updateUserWord(object, token) {
	return async (dispatch) => {
		const res = await fetch(backRoutes.updateWord, {
			method: 'POST',
			withCredentials: true,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(object)
		});
		const json = await res.json();
		console.log(json);
		dispatch({ type: UPDATE_USER_WORD, payload: json.userWords });
	};
}

export function reduxLogin(value) {
	return async (dispatch) => {
		// dispatch(showLoader());
		console.log(value);
		const res = await fetch(backRoutes.signIn, {
			method: 'POST',
			withCredentials: true,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(value)
		});
		const json = await res.json();
		console.log(json);
		const payload = {
			userData: {
				avatarURL: json.avatarURL,
				token: json.token,
				userId: json.userId,
				userName: json.userName
			},
			settings: {
				...json.settings
			},
			userWords: json.userWords,
			statistics: json.statistics
		};
		localStorage.setItem(LOCAL_STORAGE_KEY.userData, JSON.stringify(payload.userData));
		localStorage.setItem(LOCAL_STORAGE_KEY.userSettings, JSON.stringify(payload.settings));
		localStorage.setItem(LOCAL_STORAGE_KEY.userWords, JSON.stringify(payload.userWords));
		dispatch({ type: SIGN_IN, payload });
		// dispatch(hideLoader());
	};
}

export function reduxFetchSettings(name, value, token) {
	return async (dispatch) => {
		const res = await fetch(backRoutes.settings, {
			method: 'POST',
			withCredentials: true,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ name, value })
		});
		const json = await res.json();
		dispatch({ type: FETCH_SETTINGS, payload: json.settings });
		return json.message;
	};
}
export function reduxUpload(file, token) {
	return async (dispatch) => {
		console.log(file);
		console.log(token);
		const formData = new FormData();
		formData.append('avatar', file);
		const res = await fetch(backRoutes.upload, {
			method: 'POST',
			body: formData,
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const json = await res.json();
		console.log(json);
		if (json.avatarURL) {
			dispatch({ type: UPLOAD_AVATAR, payload: json.avatarURL });
			const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData));
			const updateLocal = { ...local, avatarURL: json.avatarURL };
			localStorage.setItem(LOCAL_STORAGE_KEY.userData, JSON.stringify(updateLocal));
		}
		return { text: json.message, code: json.http_code || 200 };
	};
}

export function setName(name, token) {
	return async (dispatch) => {
		console.log(name);
		console.log(token);
		const res = await fetch(backRoutes.setName, {
			method: 'POST',
			withCredentials: true,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ name })
		});
		const json = await res.json();
		console.log(json);
		dispatch({ type: SET_NAME, payload: json.name });
		return json.message;
	};
}

export function reduxPostStats(token, gameName, correctArr, failArr, seriesArr) {
	return async (dispatch) => {
		try {
			const res = await fetch(backRoutes.statistics, {
				method: 'POST',
				withCredentials: true,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					gameName: gameName,
					correctArr: correctArr,
					failArr: failArr,
					seriesArr: seriesArr
				})
			});
			const json = await res.json();
			console.log(json);
			// message(json.message, 200);
			dispatch({
				type: POST_STATS,
				payload: {
					statistics: json.statistics,
					userWords: json.userWords
				}
			});
		} catch (e) {
			console.log(e);
			console.log(e.message);
		}
	};
}
