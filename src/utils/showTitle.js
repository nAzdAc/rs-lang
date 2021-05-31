export const showTitle = (fails, corrects, lifes) => {
	let title = '';
	if (lifes <= 0) return 'Тебе удалось потерять все жизни. Это мало кому удаётся. Молодец! :)';
	if (corrects <= 0 && fails <= 0) {
		return 'Ты не сделал ни единого ответа. Мы не будем добавлять результаты этой игры в твою статистику :)';
	}
	if (fails <= 0) {
		title = 'Ты крутой! Без единой ошибочки!';
	} else if (fails < 2) {
		title = 'Отличный результат!';
	} else if (fails < 4) {
		title = 'Очень хорошо';
	} else if (fails < 6) {
		title = 'Ты можешь лучше!)';
	} else if (fails < 8) {
		title = 'Давай повтори слова из этого раздела и возвращайся :)';
	} else {
		title = 'Ты расстроил своего школьного учителя :(';
	}
	return title;
};
