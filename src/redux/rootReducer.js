import {
	SHOW_MESSAGE,
	HIDE_MESSAGE,
	SHOW_LOADER,
	HIDE_LOADER,
	SIGN_IN,
	SIGN_UP,
	UPLOAD_AVATAR,
	SET_VOLUME,
	FETCH_SETTINGS,
	LOG_OUT,
  SET_LEVEL,
  DELETE_LEVEL
} from './types';

const initialState = {
  level: null,
	loading: false,
	message: null,
	userData: {
		userName: '',
		userId: '',
		avatarURL: '',
		token: ''
	},
	settings: {
		musicVolume: 0,
		soundVolume: 0,
		wordVolume: 50,
		difficultWord: true,
		deleteWord: true,
		translateWord: true,
		translateSentences: true
	},
	userWords: {},
	words: [],
	statistics: []
};

export function rootReducer(state = initialState, action) {
	switch (action.type) {
		case SIGN_UP:
			return { ...state, userData: { ...action.payload } };
		case SIGN_IN:
			return {
				...state,
				userData: { ...action.payload.userData },
				settings: { ...action.payload.settings },
				statistics: { ...action.payload.statistics },
				userWords: { ...action.payload.userWords }
			};
		case LOG_OUT:
			return {
				...state,
				userData: {}
			};
		case UPLOAD_AVATAR:
			return { ...state, userData: { ...state.userData, avatarURL: action.payload } };
		case SHOW_LOADER:
			return { ...state, loading: true };
		case HIDE_LOADER:
			return { ...state, loading: false };
		case SHOW_MESSAGE:
			return { ...state, message: action.payload };
		case HIDE_MESSAGE:
			return { ...state, message: null };
		case SET_VOLUME:
			return { ...state, settings: { ...state.settings, ...action.payload } };
		case SET_LEVEL:
			return { ...state, level: action.payload };
		case DELETE_LEVEL:
			return { ...state, level: null};
		case FETCH_SETTINGS:
			return { ...state, settings: { ...action.payload } };
		default:
			return state;
	}
}
