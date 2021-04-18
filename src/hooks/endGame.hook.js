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
				if (!token || !userId) {
					return message('Слова не были добавлены к вам в словарь, авторизуйтесь');
				}
				const allAnswers = [ ...correctArr, ...failArr ];
				const body = {
					allAnswers,
					correctArr,
					failArr
				};
				console.log({body})
				const result = await request(`${originURL}/users/${userId}/words/answers`, 'PUT', body, {
					Authorization: `Bearer ${token}`
				});
				message(result.message, 200);
				console.log({result});
			} catch (e) {
				console.log(e);
			}
		},
		[message, request, token, userId]
	);
	return { postStats, postAnswers };
};
