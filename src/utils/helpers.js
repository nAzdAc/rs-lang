import { Howl } from 'howler';

export function shuffleAllElements(a, b) {
	return Math.random() - 0.5;
}

export function getRandomInt(min, max) {
	const roundedMin = Math.ceil(min);
	const roundedMax = Math.floor(max);
	return Math.floor(Math.random() * (roundedMax - roundedMin)) + roundedMin;
	//Максимум не включается, минимум включается
}

// export function createSound(src, volume) {
// 	return new Howl({
// 		src: src,
// 		volume: 0.01 * volume
// 	});
// }

export const createSound = (src, volume, rate = 1, loop = false) => new Howl({ src, volume: 0.01 * volume, rate, loop });
