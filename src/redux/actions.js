import { backRoutes } from '../utils/backRoutes';
import { LOCAL_STORAGE_KEY } from '../utils/constants';
import {
	IS_BLOCK,
	SET_SETTINGS,
	IS_LOADER,
	LOG_OUT,
	POST_STATS,
	SET_ACTIVE_WORDS,
	SET_LEVEL,
	SET_NAME,
	SIGN_IN,
	UPDATE_USER_WORD,
	UPLOAD_AVATAR,
	POST_SETTINGS
} from './types';

export function isBlock(value) {
	return {
		type: IS_BLOCK,
		payload: value
	};
}

export function isLoader(value) {
	return {
		type: IS_LOADER,
		payload: value
	};
}

export function setSettings(name, value) {
	console.log(`${name} - ${value}`);
	return {
		type: SET_SETTINGS,
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

export function logOut() {
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
		dispatch(isBlock(true));
		try {
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
			console.log(res);
			const json = await res.json();
			console.log(json);
			dispatch({ type: UPDATE_USER_WORD, payload: json.userWords });
			dispatch(isBlock(false));
			return { text: json.message, code: json.http_code || 200 };
		} catch (e) {
			console.log(e);
			console.log(e.message);
			dispatch(isBlock(false));
			return { text: 'Возникла проблема с изменением статуса слова. Попробуйте позже', code: 404 };
		}
	};
}

export function signIn(value) {
	return async (dispatch) => {
		try {
			dispatch(isBlock(true));
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
			console.log(res);
			const json = await res.json();
			if (res.status !== 200) {
				dispatch(isBlock(false));
				return { text: json.message, code: res.status };
			}
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
			dispatch(isBlock(false));
			return { text: json.message, code: json.http_code || 200 };
		} catch (e) {
			console.log(e);
			console.log(e.message);
			dispatch(isBlock(false));
			return { text: 'Возникла проблема с входом на страницу. Попробуйте позже', code: 404 };
		}
	};
}

export function postSettings(name, value, token) {
	return async (dispatch) => {
		dispatch(isBlock(true));
		try {
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
			console.log(res);
			const json = await res.json();
			console.log(json);
			dispatch({ type: POST_SETTINGS, payload: json.settings });
			dispatch(isBlock(false));
			return { code: json.http_code || 200, text: json.message };
		} catch (e) {
			console.log(e);
			console.log(e.message);
			dispatch(isBlock(false));
			return { text: 'Возникла проблема с изменением настроек. Попробуйте позже', code: 404 };
		}
	};
}
export function uploadAvatar(file, token) {
	return async (dispatch) => {
		dispatch(isBlock(true));
		try {
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
			dispatch(isBlock(false));
			return { text: json.message, code: json.http_code || 200 };
		} catch (e) {
			console.log(e);
			console.log(e.message);
			dispatch(isBlock(false));
			return { text: 'Возникла проблема с загрузкой вашего аватара. Попробуйте позже', code: 404 };
		}
	};
}

export function postName(name, token) {
	return async (dispatch) => {
		try {
			dispatch(isBlock(true));
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
			console.log(res);
			const json = await res.json();
			console.log(json);
			dispatch({ type: SET_NAME, payload: json.name });
			dispatch(isBlock(false));
			return { text: json.message, code: json.http_code || 200 };
		} catch (e) {
			console.log(e);
			console.log(e.message);
			dispatch(isBlock(false));
			return { text: 'Возникла проблема с изменением вашего никнейма. Попробуйте позже', code: 404 };
		}
	};
}

export function postStats(token, gameName, correctArr, failArr, seriesArr) {
	return async (dispatch) => {
		dispatch(isBlock(true));
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
			dispatch({
				type: POST_STATS,
				payload: {
					statistics: json.statistics,
					userWords: json.userWords
				}
			});
			dispatch(isBlock(false));
			return { text: json.message, code: json.http_code || 200 };
		} catch (e) {
			console.log(e);
			console.log(e.message);
			dispatch(isBlock(false));
			return { text: 'Возникла проблема с отправкой вашей статистики. Статистика не обновлена', code: 404 };
		}
	};
}
