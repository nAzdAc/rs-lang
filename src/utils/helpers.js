export function shuffleAllElements(a, b) {
	return Math.random() - 0.5;
}

export function getRandomInt(min, max) {
	const roundedMin = Math.ceil(min);
	const roundedMax = Math.floor(max);
	return Math.floor(Math.random() * (roundedMax - roundedMin)) + roundedMin;
	//Максимум не включается, минимум включается
}

