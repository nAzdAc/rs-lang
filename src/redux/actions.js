import { DIFFICULT_WORD, DISABLE_BUTTONS, ENABLE_BUTTONS, MUSIC_VOLUME, SOUND_VOLUME, WORD_VOLUME } from './types';

export function musicVolume(value) {
	return {
		type: MUSIC_VOLUME,
		MUSIC_VOLUME: value
	};
}

export function soundVolume(value) {
	return {
		type: SOUND_VOLUME,
		SOUND_VOLUME: value
	};
}

export function asyncVolume(value) {
  return async function(dispatch) {
    dispatch(disableButtons())
		await setTimeout(() => {
			dispatch({ type: WORD_VOLUME, WORD_VOLUME: value });
      dispatch(enableButtons())
		}, 2000);
	};
}

export function changeSwitch(value) {
	return {
		type: DIFFICULT_WORD
	};
}

export function enableButtons() {
	return {
		type: ENABLE_BUTTONS
	};
}

export function disableButtons() {
	return {
		type: DISABLE_BUTTONS
	};
}
