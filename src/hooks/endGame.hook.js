import { useCallback, useContext } from 'react';
import { backRoutes } from '../utils/backRoutes';
import { AuthContext } from '../context/AuthContext';
import { parsedStats } from '../utils/helpers';

export const useEndGame = () => {
	const { userId, token } = useContext(AuthContext);

	const postUserWords = useCallback(async (correctArr, failArr) => {
		try {
			await Promise.all(
				correctArr.map(async (item) => {
					const wordId = item.id;
					const word = {
						difficult: item.difficult,
						group: item.group,
						page: item.page,
						deleted: item.deleted
					};
					console.log(word);
					await backRoutes.createUserWord({ userId, wordId, word, token });
				})
			);
			await Promise.all(
				failArr.map(async (item) => {
					const wordId = item.id;
					const word = {
						difficult: item.difficult,
						group: item.group,
						page: item.page,
						deleted: item.deleted
					};
					await backRoutes.createUserWord({ userId, wordId, word, token });
				})
			);
		} catch (e) {
			console.log(e);
		}
	}, [token, userId]);

	const postStats = useCallback(async (gameName, correctArr, failArr, seriesArr) => {
		try {
			const gameStats = parsedStats(gameName, correctArr, failArr, seriesArr);
			const data = await backRoutes.putStatistics({
				userId,
				token,
				data: gameStats
			});
			console.log(data);
		} catch (e) {
			console.log(e);
			console.log(e.message);
		}
	}, [token, userId]);

	const postAnswers = useCallback(async (correctArr, failArr) => {
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
	}, [token, userId]);
	return { postUserWords, postStats, postAnswers };
};
