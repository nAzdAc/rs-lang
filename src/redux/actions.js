import { backRoutes } from '../utils/backRoutes';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import {
	DELETE_WORD,
	DIFFICULT_WORD,
	FETCH_SETTINGS,
	HIDE_LOADER,
	HIDE_MESSAGE,
	MUSIC_VOLUME,
	SHOW_LOADER,
	SHOW_MESSAGE,
	SIGN_IN,
	SOUND_VOLUME,
	TRANSLATE_SENTENCES,
	TRANSLATE_WORD,
	UPLOAD_AVATAR,
	WORD_VOLUME
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

export function setMusicVolume(value) {
	return {
		type: MUSIC_VOLUME,
		payload: value
	};
}

export function setSoundVolume(value) {
	return {
		type: SOUND_VOLUME,
		payload: value
	};
}

export function setWordVolume(value) {
	return {
		type: WORD_VOLUME,
		payload: value
	};
}

export function setDifficultWord(value) {
	return {
		type: DIFFICULT_WORD,
		payload: value
	};
}

export function setDeleteWord(value) {
	return {
		type: DELETE_WORD,
		payload: value
	};
}

export function setTranslateWord(value) {
	return {
		type: TRANSLATE_WORD,
		payload: value
	};
}

export function setTranslateSentence(value) {
	return {
		type: TRANSLATE_SENTENCES,
		payload: value
	};
}

export function reduxLogin(value) {
	return async (dispatch) => {
		dispatch(showLoader());
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
		const statistics = json.statistics && json.statistics.length ? json.statistics : [];
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
			statistics
		};
		dispatch({ type: SIGN_IN, payload });
		dispatch(hideLoader());
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
		})
		const json = await res.json();
		dispatch({ type: FETCH_SETTINGS, payload: json.settings})
		return json.message
	}
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