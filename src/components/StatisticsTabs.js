import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { StatsBarChart } from './StatsBarChart';
import { useState } from 'react';
import { GameStatsTable } from './GameStatsTable';
import { TodayStatsTable } from './TodayStatsTable';
import { useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles';
import { useSelector } from 'react-redux';

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
function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

export const StatisticsTabs = () => {
	const classes = useStyles();
	const [ value, setValue ] = useState(0);
	const { statistics } = useSelector((state) => state);
	const { theme } = useSelector((state) => state.settings);

	useEffect(
		() => {
			console.log(statistics);
		},
		[ statistics ]
	);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<React.Fragment>
			<AppBar className={theme === 'dark' ? classes.darkTab : classes.lightTab} position="static">
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="В цифрах" {...a11yProps(0)} />
					<Tab label="На графиках" {...a11yProps(1)} />
				</Tabs>
			</AppBar>

			<TabPanel value={value} index={0}>
				{statistics && (
					<React.Fragment>
						<h4 style={{ margin: '10px' }} className={classes.subtitle1}>
							Успехи в играх
						</h4>
						<GameStatsTable rows={statistics.games} />
						<h4 style={{ margin: '10px' }} className={classes.subtitle1}>
							За сегодня
						</h4>
						<TodayStatsTable learnedWordsToday={statistics.learnedWordsToday} percentToday={statistics.percentToday} />
					</React.Fragment>
				)}
			</TabPanel>

			<TabPanel value={value} index={1}>
				{statistics && (
					<React.Fragment>
						<h4 style={{ margin: '10px' }} className={classes.subtitle1}>
							Сколько всего слов вы изучили
						</h4>
						<StatsBarChart data={statistics.learnedWordsTotal} />
						<h4 style={{ margin: '10px' }} className={classes.subtitle1}>
							Прогресс изучения слов по дням
						</h4>
						<StatsBarChart data={statistics.learnedWordsPerDate} />
					</React.Fragment>
				)}
			</TabPanel>
		</React.Fragment>
	);
};
