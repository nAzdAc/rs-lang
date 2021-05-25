import { useCallback } from 'react';
import { backRoutes } from '../utils/backRoutes';
import { getRandomInt } from '../utils/helpers';
import { useMessage } from './message.hook';
import { useDispatch, useSelector } from 'react-redux';
import { reduxPostStats } from '../redux/actions';

export const useGames = () => {
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.userData);
	const { level, activeWords } = useSelector((state) => state);
	const message = useMessage();

	const getWords = useCallback(
		async () => {
			try {
				let playWords = [];
				if (activeWords.length) {
					playWords = activeWords;
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
			} catch (e) {
				console.log(e);
			}
		},
		[ level, activeWords ]
	);

	const postStats = useCallback(
		async (gameName, correctArr, failArr, seriesArr) => {
			if (!token) {
				return message('Статистика не была обновлена, авторизуйтесь');
			}
			dispatch(reduxPostStats(token, gameName, correctArr, failArr, seriesArr));
		},
		[ dispatch, message, token ]
	);

	return { postStats, getWords };
};
