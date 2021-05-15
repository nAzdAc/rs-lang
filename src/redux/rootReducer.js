import { combineReducers } from 'redux';
import {
	all,
	DELETE_WORD,
	DIFFICULT_WORD,
	DISABLE_BUTTONS,
	ENABLE_BUTTONS,
	initSwitch,
	initVolume,
	MUSIC_VOLUME,
	SOUND_VOLUME,
	WORD_VOLUME
} from './types';

function volumeReducer(state = initVolume, action) {
	if (action.type === MUSIC_VOLUME) {
		return { ...state, MUSIC_VOLUME: action.MUSIC_VOLUME };
	} else if (action.type === SOUND_VOLUME) {
		return { ...state, SOUND_VOLUME: action.SOUND_VOLUME };
	} else if (action.type === WORD_VOLUME) {
		return { ...state, WORD_VOLUME: action.WORD_VOLUME };
	}
	return state;
}

function switchReducer(state = initSwitch, action) {
	switch (action.type) {
		case DIFFICULT_WORD:
			return { ...state, DIFFICULT_WORD: false };
		case DELETE_WORD:
			return { ...state, DELETE_WORD: false };
		default:
			return state;
	}
}

function allReducer(state = all, action) {
	switch (action.type) {
		case DISABLE_BUTTONS:
			return { ...state, disabled: true };
		case ENABLE_BUTTONS:
			return { ...state, disabled: false };
		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	volume: volumeReducer,
	switch: switchReducer,
	all: allReducer
});
