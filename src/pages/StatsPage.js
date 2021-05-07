import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { originURL } from '../utils/backRoutes';
import { Typography } from '@material-ui/core';
import { StatisticsTabs } from '../components/Tabs';
import { useStyles } from '../styles/pagesStyles/StatsPage.styles';

export const StatsPage = () => {
	const classes = useStyles();
	const { userId, token } = useContext(AuthContext);
	const { request } = useHttp();
	const [ stats, setStats ] = useState();

	const getStats = useCallback(
		async () => {
			if (!token || !userId) return;
			const userStats = (await request(`${originURL}/users/${userId}/statistics/`, 'GET', null, {
				Authorization: `Bearer ${token}`
			})).parsedStats;
			console.log(userStats);
			setStats(userStats);
		},
		[ request, token, userId ]
	);

	useEffect(
		() => {
			getStats();
		},
		[ getStats ]
	);

	return (
		<div className={classes.wrapper}>
			<div className={classes.content}>
				{userId && token ? (
					<React.Fragment>
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
					</React.Fragment>
				) : (
					<Typography variant="h2" className={classes.title}>
						Статистика доступна только для авторизованных пользователей
					</Typography>
				)}
			</div>
		</div>
	);
};
