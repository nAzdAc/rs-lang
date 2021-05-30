import { Howl } from 'howler';

export const convertText = (text) => {
	const regExp = /<b>|<\/b>|<i>|<\/i>/gi;
	return text.replace(regExp, '');
};

export function shuffleAllElements(a, b) {
	return Math.random() - 0.5;
}

export function getRandomInt(min, max) {
	const roundedMin = Math.ceil(min);
	const roundedMax = Math.floor(max);
	return Math.floor(Math.random() * (roundedMax - roundedMin)) + roundedMin;
	//Максимум не включается, минимум включается
}

export const createSound = (src, volume, rate = 1, loop = false) =>
	new Howl({ src, volume: 0.01 * volume, rate, loop });

export function getWordsForPlay(allWords, userWords) {
	if (!userWords.length) {
		return allWords.map((item) => {
			return { ...item, difficult: false };
		});
	} else {
		const deletedWords = userWords.filter((item) => item.deleted);
		const deletedId = deletedWords.map((item) => item.wordId);
		const withoutDeleted = allWords.filter((item) => !deletedId.includes(item.id));
		const difficultWords = userWords.filter((item) => item.difficult);
		const difficultId = difficultWords.map((item) => item.wordId);
		const filteredArr = withoutDeleted.map((item) => {
			let word = {};
			if (difficultId.includes(item.id)) {
				word = { ...item, difficult: true };
			} else {
				word = { ...item, difficult: false };
			}
			return word;
		});
		// console.log({ allWords });
		// console.log(userWords);
		// console.log({ deletedWords });
		// console.log({ deletedId });
		// console.log({ withoutDeleted });
		// console.log({ difficultWords });
		// console.log({ difficultId });
		// console.log({ filteredArr });
		filteredArr.sort(shuffleAllElements);
		return filteredArr;
	}
}

export function getOffset(num, maxNum) {
	const circumference = 2 * Math.PI * 52;
	const percent = 100 - (maxNum - num) / maxNum * 100;
	const offset = circumference - percent / 100 * circumference;
	return offset;
}
