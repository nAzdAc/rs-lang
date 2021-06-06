import { backRoutes } from '../utils/backRoutes';
import { LOCAL_STORAGE_KEY } from '../utils/constants';
import {
	IS_BLOCK,
	SET_SETTINGS,
	IS_LOADER,
	TOAST,
	LOG_OUT,
	POST_STATS,
	SET_ACTIVE_WORDS,
	SET_LEVEL,
	SET_NAME,
	SIGN_IN,
	UPDATE_USER_WORD,
	UPLOAD_AVATAR,
	POST_SETTINGS,
	SET_THEME
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

export function toast(message) {
	return {
		type: TOAST,
		payload: { ...message }
	};
}

export function showToast(message) {
	console.log(message);
	return async (dispatch) => {
		dispatch({ type: TOAST, payload: message });
		setTimeout(
			() => {
				dispatch({ type: TOAST, payload: {} });
			},
			[ message.time || 3000 ]
		);
	};
}

export function setSettings(name, value) {
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

export function changeTheme(value) {
	console.log(value);
	return {
		type: SET_THEME,
		payload: value
	};
}

export function setActiveWords(arr) {
	return async (dispatch) => {
		dispatch({ type: SET_ACTIVE_WORDS, payload: arr });
	};
}

export function updateUserWord(object, token) {
	return async (dispatch) => {
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
			return { text: json.message, code: json.http_code || 200 };
		} catch (e) {
			console.log(e);
			console.log(e.message);
			return { text: 'Возникла проблема с изменением статуса слова. Попробуйте позже', code: 404 };
		}
	};
}

export function signIn(value) {
	return async (dispatch) => {
		try {
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
			dispatch(
				showToast({
					text: json.message,
					code: res.status
				})
			);
			// dispatch(hideLoader());
			return { text: json.message, code: json.http_code || 200 };
		} catch (e) {
			console.log(e);
			console.log(e.message);
			return { text: 'Возникла проблема с входом на страницу. Попробуйте позже', code: 404 };
		}
	};
}

export function postSettings(name, value, token) {
	return async (dispatch) => {
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
			return { text: json.message, code: json.http_code || 200 };
		} catch (e) {
			console.log(e);
			console.log(e.message);
			return { text: 'Возникла проблема с изменением настроек. Попробуйте позже', code: 404 };
		}
	};
}
export function uploadAvatar(file, token) {
	return async (dispatch) => {
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
			return { text: json.message, code: json.http_code || 200 };
		} catch (e) {
			console.log(e);
			console.log(e.message);
			return { text: 'Возникла проблема с загрузкой вашего аватара. Попробуйте позже', code: 404 };
		}
	};
}

export function setName(name, token) {
	return async (dispatch) => {
		try {
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
			return { text: json.message, code: json.http_code || 200 };
		} catch (e) {
			console.log(e);
			console.log(e.message);
			return { text: 'Возникла проблема с изменением вашего никнейма. Попробуйте позже', code: 404 };
		}
	};
}

export function postStats(token, gameName, correctArr, failArr, seriesArr) {
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
