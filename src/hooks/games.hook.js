import { useCallback } from 'react';
import { backRoutes } from '../utils/backRoutes';
import { getRandomInt } from '../utils/helpers';
import { useMessage } from './message.hook';
import { useHttp } from './http.hook';
import { useSelector } from 'react-redux';

export const useGames = () => {
	const { token } = useSelector((state) => state.userData);
	const { level, words } = useSelector((state) => state);
	const { request } = useHttp();
	const message = useMessage();

	const getWords = useCallback(
		async () => {
			let playWords = [];
			if (words.length) {
				playWords = words;
			} else {
				let group;
				if (level !== null) {
					group = level;
				} else {
					group = getRandomInt(0, 6);
				}
				const page = getRandomInt(0, 31);
				const res = await fetch(backRoutes.getWordsPage(group, page), {
					method: 'GET',
					withCredentials: true,
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					}
				});
				playWords = await res.json();
			}
			return playWords;
		},
		[ level, words ]
	);

	const postStats = useCallback(
		async (gameName, correctArr, failArr, seriesArr) => {
			if (!token) {
				return message('Статистика не была обновлена, авторизуйтесь');
			}
			try {
				const res = await fetch(backRoutes.statistics, {
					method: 'POST',
					withCredentials: true,
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({
					gameName,
					correctArr,
					failArr,
					seriesArr
					})
				});
				const json = await res.json();
				console.log(json)
				// message(json.message, 200);
			} catch (e) {
				console.log(e);
				console.log(e.message);
			}
		},
		[ message, token ]
	);

	const postAnswers = useCallback(
		async (correctArr, failArr) => {
			try {
				if (!token) {
					return message('Слова не были добавлены к вам в словарь, авторизуйтесь');
				}
				const allAnswers = [ ...correctArr, ...failArr ];
				const body = {
					allAnswers,
					correctArr,
					failArr
				};
				console.log({ body });
				const result = await request(backRoutes.statistics, 'PUT', body, {
					Authorization: `Bearer ${token}`
				});
				message(result.message, 200);
				console.log({ result });
			} catch (e) {
				console.log(e);
			}
		},
		[ message, request, token ]
	);
	return { postStats, postAnswers, getWords };
};
