import React, { useCallback, useEffect, useState } from 'react';
import { backRoutes } from '../utils/backRoutes';
import { Typography } from '@material-ui/core';
import { StatisticsTabs } from '../components/StatisticsTabs';
import { useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';
import { useSelector } from 'react-redux';

export const StatsPage = () => {
	const classes = useStyles();
	const { token } = useSelector(state => state.userData);
	const [ stats, setStats ] = useState();

	const getStats = useCallback(
		async () => {
			if (!token) return;
			const res = await fetch(backRoutes.statistics, {
				method: 'GET',
				withCredentials: true,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
			});
			const json = await res.json();
			console.log(json);
			setStats(json.parsedStats);
		},
		[ token ]
	);

	useEffect(
		() => {
			getStats();
		},
		[ getStats ]
	);

	return (
		<div className={classes.root}>
				{!!token ? (
					<div className={classes.tab}>
						{stats === null ? (
							<Typography variant="h2" className={classes.title}>
								У вас ещё нет статистики
							</Typography>
						) : (
							<React.Fragment>
								<Typography variant="h2" className={classes.title}>
									Статистика
								</Typography>
								<StatisticsTabs stats={stats} />
							</React.Fragment>
						)}
					</div>
				) : (
					<Typography variant="h2" className={classes.title}>
						Статистика доступна только для авторизованных пользователей
					</Typography>
				)}
		</div>
	);
};
