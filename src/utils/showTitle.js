



export const showTitle = (fails, corrects, lifes) => {
	let title = '';
	if (lifes <= 0) return 'Ты смог потерять все жизни. Это ещё никому не удавалось. Молодец!:)'
	if (fails < 2) {
		title = 'Ты крутой!)';
	} else if (fails < 4) {
		title = 'Очень хорошо!)';
	} else if (fails < 6) {
		title = 'Ты можешь лучше!)';
	} else if (fails < 8) {
		title = 'Давай иди повтори и возвращайся)';
	} else if (fails < 10) {
		title = 'Ну такое :(';
	} else {
		title = 'Ты расстроил своего школьного учителя :(';
	}
	return title;
};
