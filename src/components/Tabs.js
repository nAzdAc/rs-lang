import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Chart } from '../components/chart';
import { useState } from 'react';
import GameStatsTable from './GameStatsTable';
import TodayStatsTable from './TodayStatsTable';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			style={{ padding: '20px' }}
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

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	},
	title: {
		marginBottom: '20px',
		marginTop: '20px'
	},
	tabContainer: {
		width: '100%',
		height: '100%'
	}
}));

export default function StatisticsTabs({ stats }) {
	const classes = useStyles();
	const [ value, setValue ] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="В цифрах" {...a11yProps(0)} />
					<Tab label="На графиках" {...a11yProps(1)} />
				</Tabs>
			</AppBar>

			<TabPanel value={value} index={0}>
				{stats && (
					<React.Fragment>
						<Typography variant="h4" className={classes.title}>
							Успехи в играх
						</Typography>
						<GameStatsTable rows={stats.games} />
						<Typography variant="h4" className={classes.title}>
							За сегодня
						</Typography>
						<TodayStatsTable learnedWordsToday={stats.learnedWordsToday} percentToday={stats.percentToday} />
					</React.Fragment>
				)}
			</TabPanel>

			<TabPanel value={value} index={1} style={{ minWidth: '200px', minHeight: '200px'}}>
				{stats && (
					<div className={classes.tabContainer}>
						<Typography variant="h4" className={classes.title}>
							Сколько всего слов вы изучили
						</Typography>
						<Chart data={stats.learnedWordsTotal} />
						<Typography variant="h4" className={classes.title}>
							Прогресс изучения слов по дням
						</Typography>
						<Chart data={stats.learnedWordsPerDate} />
					</div>
				)}
			</TabPanel>
		</div>
	);
}
