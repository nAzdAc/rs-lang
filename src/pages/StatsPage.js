import React from 'react';
import { Typography } from '@material-ui/core';
import { StatisticsTabs } from '../components/StatisticsTabs';
import { useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';
import { useSelector } from 'react-redux';

export const StatsPage = () => {
	const classes = useStyles();
	const { token } = useSelector((state) => state.userData);
	const { statistics } = useSelector((state) => state);

	return (
		<div className={classes.root}>
			{!!token ? (
				<div className={classes.tab}>
					{statistics === null ? (
						<Typography variant="h2" className={classes.title}>
							У вас ещё нет статистики
						</Typography>
					) : (
						<React.Fragment>
							<Typography variant="h2" className={classes.title}>
								Статистика
							</Typography>
							<StatisticsTabs />
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
