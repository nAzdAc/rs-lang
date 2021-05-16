import {
	SHOW_MESSAGE,
	HIDE_MESSAGE,
	SHOW_LOADER,
	HIDE_LOADER,
	SIGN_IN,
	SIGN_UP,
	UPLOAD_AVATAR,
	SOUND_VOLUME,
	MUSIC_VOLUME,
	WORD_VOLUME,
	DIFFICULT_WORD,
	DELETE_WORD,
	TRANSLATE_WORD,
	TRANSLATE_SENTENCES,
  FETCH_SETTINGS
} from './types';

const initialState = {
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
	statistics: []
};

export function appReducer(state = initialState, action) {
	switch (action.type) {
		case SIGN_UP:
			return { ...state, userData: { ...action.payload } };
		case SIGN_IN:
			return {
				...state,
				userData: { ...action.payload.userData },
				settings: { ...action.payload.settings },
				statistics: { ...action.payload.statistics }
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
		case SOUND_VOLUME:
			return { ...state, settings: { ...state.settings, soundVolume: action.payload } };
		case MUSIC_VOLUME:
			return { ...state, settings: { ...state.settings, musicVolume: action.payload } };
		case WORD_VOLUME:
			return { ...state, settings: { ...state.settings, wordVolume: action.payload } };
		case DIFFICULT_WORD:
			return { ...state, settings: { ...state.settings, difficultWord: action.payload } };
		case DELETE_WORD:
			return { ...state, settings: { ...state.settings, deleteWord: action.payload } };
		case TRANSLATE_WORD:
			return { ...state, settings: { ...state.settings, translateWord: action.payload } };
		case TRANSLATE_SENTENCES:
			return { ...state, settings: { ...state.settings, translateSentences: action.payload } };
		case FETCH_SETTINGS:
			return { ...state, settings: { ...action.payload } };
		default:
			return state;
	}
}
