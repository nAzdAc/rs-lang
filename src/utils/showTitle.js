



export const showTitle = (fail) => {
	let title = '';
	if (fail < 2) {
		title = 'Ты крутой!)';
	} else if (fail < 4) {
		title = 'Очень хорошо!)';
	} else if (fail < 6) {
		title = 'Ты можешь лучше!)';
	} else if (fail < 8) {
		title = 'Давай иди повтори и возвращайся)';
	} else if (fail < 10) {
		title = 'Ну такое :(';
	} else {
		title = 'Ты расстроил своего школьного учителя :(';
	}
	return title;
};
