import React from 'react';
import { StatisticsTabs } from '../components/StatisticsTabs';
import { useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

export const StatsPage = () => {
	const { theme } = useSelector((state) => state.settings);
	const { token } = useSelector((state) => state.userData);
	const { statistics } = useSelector((state) => state);
	const classes = useStyles({ theme });

	return (
		<Container className={classes.root}>
			{!!token ? (
				<div className={classes.tabsContainer}>
					{statistics === null ? (
						<h2 className={classes.title}>У вас ещё нет статистики</h2>
					) : (
						<React.Fragment>
							<h2 className={classes.title}>Статистика</h2>
							<StatisticsTabs />
						</React.Fragment>
					)}
				</div>
			) : (
				<h2 className={classes.title}>Статистика доступна только для авторизованных пользователей</h2>
			)}
		</Container>
	);
};
