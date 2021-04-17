import { useCallback, useContext } from 'react';
import { backRoutes, originURL } from '../utils/backRoutes';
import { AuthContext } from '../context/AuthContext';
import { parsedStats } from '../utils/helpers';
import { useMessage } from '../hooks/message.hook';
import { useHttp } from './http.hook';

export const useEndGame = () => {
	const { userId, token } = useContext(AuthContext);
	const { request } = useHttp();
	const message = useMessage();

	const postUserWords = useCallback(
		async (correctArr, failArr) => {
			if (!token || !userId) {
				return message('Слова не были добавлены к вам в словарь, авторизуйтесь');
			}
			try {
				const allAnswers = [ ...correctArr, ...failArr ];
				const result = await request(`${originURL}/users/${userId}/words/answers`, 'PUT', allAnswers, {
					Authorization: `Bearer ${token}`
				});
				console.log(result)
			} catch (e) {
				console.log(e);
			}
		},
		[message, request, token, userId]
	);

	const postStats = useCallback(
		async (gameName, correctArr, failArr, seriesArr) => {
			if (!token || !userId) {
				return message('Статистика не была обновлена, авторизуйтесь');
			}
			try {
				const gameStats = parsedStats(gameName, correctArr, failArr, seriesArr);
				const data = await backRoutes.putStatistics({
					userId,
					token,
					data: gameStats
				});
				message(data.message, 200);
			} catch (e) {
				console.log(e);
				console.log(e.message);
			}
		},
		[ message, token, userId ]
	);

	const postAnswers = useCallback(
		async (correctArr, failArr) => {
			try {
				await Promise.all(
					correctArr.map(async (item) => {
						const wordId = item.id;
						const word = { value: true };
						await backRoutes.updateUserWord({ userId, wordId, word, token });
					})
				);
				await Promise.all(
					failArr.map(async (item) => {
						const wordId = item.id;
						const word = { value: false };
						await backRoutes.updateUserWord({ userId, wordId, word, token });
					})
				);
			} catch (e) {
				console.log(e);
			}
		},
		[ token, userId ]
	);
	return { postUserWords, postStats, postAnswers };
};
