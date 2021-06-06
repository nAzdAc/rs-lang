import { useCallback } from 'react';
import { backRoutes } from '../utils/backRoutes';
import { getRandomInt } from '../utils/helpers';
import { useSelector } from 'react-redux';

export const useGames = () => {
	const { level, activeWords } = useSelector((state) => state);

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

	return { getWords };
};
