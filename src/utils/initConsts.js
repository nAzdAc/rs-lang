import { frontRoutes } from './frontRoutes';

export const INIT_CONSTS = {
	musicVolume: 0,
	soundVolume: 0,
	wordVolume: 10,
};

export const gameCardsContent = [
	{
		name: 'Саванна',
		todo: 'Сверху падает русское слово, необходимо выбрать его английский аналог',
		to: frontRoutes.savanna
	},
	{
		name: 'Аудиовызов',
		todo:
			'Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода. Вы слышите слово и видите 5 вариантов перевода.',
		to: frontRoutes.audio
	},
	{
		name: 'Спринт',
		todo: 'Вам дается слово с переводом. Вы должны отметить, подходит ли этот перевод к слову. Игра идет на время.',
		to: frontRoutes.sprint
	},
	{
		name: 'Сопоставьте картинку',
		todo:
			'Вам дается слово и вариант его использования. Нужно определить, какая картинка из четырех предложенных подходит под описание.',
		to: frontRoutes.match
	}
];

export const regexpForText = /<b>|<\/b>|<i>|<\/i>/gi;
