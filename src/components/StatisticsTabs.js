import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Chart } from './Chart';
import { useState } from 'react';
import { GameStatsTable } from './GameStatsTable';
import { TodayStatsTable } from './TodayStatsTable';
import { useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{children}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

export const StatisticsTabs = ({ stats }) => {
	const classes = useStyles();
	const [ value, setValue ] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<React.Fragment>
			<AppBar position="static">
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="В цифрах" {...a11yProps(0)} />
					<Tab label="На графиках" {...a11yProps(1)} />
				</Tabs>
			</AppBar>

			<TabPanel value={value} index={0}>
				{stats && (
					<React.Fragment>
						<Typography variant="h4" className={classes.subTitle}>
							Успехи в играх
						</Typography>
						<GameStatsTable rows={stats.games} />
						<Typography variant="h4" className={classes.subTitle}>
							За сегодня
						</Typography>
						<TodayStatsTable learnedWordsToday={stats.learnedWordsToday} percentToday={stats.percentToday} />
					</React.Fragment>
				)}
			</TabPanel>

			<TabPanel value={value} index={1}>
				{stats && (
					<React.Fragment>
						<Typography variant="h4" className={classes.subTitle}>
							Сколько всего слов вы изучили
						</Typography>
						<Chart data={stats.learnedWordsTotal} />
						<Typography variant="h4" className={classes.subTitle}>
							Прогресс изучения слов по дням
						</Typography>
						<Chart data={stats.learnedWordsPerDate} />
					</React.Fragment>
				)}
			</TabPanel>
		</React.Fragment>
	);
};
