import { frontRoutes } from './frontRoutes'

export const levels = [1, 2, 3, 4, 5, 6]

export const wordCategories = [
    { text: 'Изучаемые слова' },
    { text: 'Сложные слова' },
    { text: 'Удаленные слова' },
]

export const gameCardsContent = [
    {
        name: 'Саванна',
        todo: 'Сверху падает русское слово, необходимо выбрать его английский аналог',
        to: frontRoutes.savanna,
    },
    {
        name: 'Аудиовызов',
        todo: 'Мини-игра «Аудиовызов» - это тренировка, развивающая навыки речи и перевода. Вы слышите слово и видите 5 вариантов перевода.',
        to: frontRoutes.audio,
    },
    {
        name: 'Спринт',
        todo: 'Вам дается слово с переводом. Вы должны отметить, подходит ли этот перевод к слову. Игра идет на время.',
        to: frontRoutes.sprint,
    },
    {
        name: 'Сопоставление',
        todo: 'Вам дается слово и вариант его использования. Нужно определить, какая картинка из четырех предложенных подходит под описание.',
        to: frontRoutes.match,
    },
]

export const yesNoKeyCode = {
    enter: 13,
    space: 32,
    num1: 35,
    num2: 40,
}

export const fourKeyCode = {
    top1: 49,
    top2: 50,
    top3: 51,
    top4: 52,
    num1: 35,
    num2: 40,
    num3: 34,
    num4: 37,
}

export const bookLinks = [
    {
        to: '/level_1',
        text: 'Уровень 1',
    },
    {
        to: '/level_2',
        text: 'Уровень 2',
    },
    {
        to: '/level_3',
        text: 'Уровень 3',
    },
    {
        to: '/level_4',
        text: 'Уровень 4',
    },
    {
        to: '/level_5',
        text: 'Уровень 5',
    },
    {
        to: '/level_6',
        text: 'Уровень 6',
    },
]
