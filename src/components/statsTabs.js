import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { DenseTable } from '../components/table';
import { Chart } from '../components/chart';
import { totalWordsCount } from '../utils/totalWords';
import { data } from '../const/everyDayChart';
import { gameStats, appStats } from '../const/tableData';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { backRoutes } from '../utils/backRoutes';

const totalWords = totalWordsCount(data);
function getStatsPerGame(arr, filterElem) {
  const initArr = arr;
  const game = filterElem;
  let longestSeries = 0;
  let correctPercent = 0;
  let wordsCount = 0;
  const filteredArray = initArr.filter((item) => item.gameName === game);
  if (filteredArray.length) {
    longestSeries = Math.max.apply(
      null,
      filteredArray.map((item) => item.longestSeries)
    );
    correctPercent = Math.round(
      filteredArray
        .map((game) => game.correctPercent)
        .reduce((acc, val) => acc + val) / filteredArray.length
    );
    wordsCount = filteredArray
      .map((game) => game.totalWords)
      .reduce((acc, val) => acc + val);
  }
  return { longestSeries, correctPercent, wordsCount };
}

function getCorrectPercentToday(arr, filterElem) {
  const initArr = arr;
  const date = filterElem;
  let correctPercentToday = 0;
  const filteredArray = initArr.filter((item) => item.date === date);
  if (filteredArray.length) {
    correctPercentToday = Math.round(
      filteredArray
        .map((item) => item.correctPercent)
        .reduce((acc, val) => acc + val) / filteredArray.length
    );
  }
  return `${correctPercentToday}%`;
}

function getLearnedWordsPerDate(arr) {
  const initArr = arr;
  const dates = [...new Set(initArr.map((item) => item.date))];

  const allDates = dates.map((date, index) => {
    const filteredArr = initArr.filter((game) => game.date === date);
    return filteredArr;
  });

  const perDate = allDates.map((arr) => {
    const date = arr.map((game) => game.date)[0];
    const learnedWords = arr
      .map((game) => game.totalWords)
      .reduce((acc, val) => acc + val);
    return { date, learnedWords };
  });

  return perDate;
}

function getLearnedWordsToday(arr, date) {
  const initArr = arr;
  const todayDate = date;
  let learnedWordsToday = 0;
  const filteredArray = initArr.filter((item) => item.date === todayDate);
  if (filteredArray.length) {
    learnedWordsToday = filteredArray
      .map((item) => item.totalWords)
      .reduce((acc, val) => acc + val);
  }
  return learnedWordsToday;
}

function getLearnedWordsTotal(data) {
  const amount = data.reduce(function (acc, value, i) {
    if (i === 0) {
      acc.push({
        name: value.date,
        words: value.learnedWords,
      });
    } else if (i > 0) {
      acc.push({
        name: value.date,
        words: value.learnedWords + acc[i - 1].words,
      });
    }
    return acc;
  }, []);
  return amount;
}

export function TabPanel(props) {
  const classes = useStyles();

  const getStats = useCallback(async () => {
    const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData))
      .userId;
    const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData))
      .token;

    const stats = await backRoutes.getStats({ userId, token });
    const allGames = stats.statistics.games;
    const PARSED_STATS_ON_BACK = stats.parsedStats;
    // console.log(allGames);

    const todayDate = new Date().toLocaleDateString();
    const savannaGameStats = getStatsPerGame(allGames, 'savanna');

    const matchGameStats = getStatsPerGame(allGames, 'match');

    const sprintGameStats = getStatsPerGame(allGames, 'sprint');

    const audioGameStats = getStatsPerGame(allGames, 'audio');

    const percentToday = getCorrectPercentToday(allGames, `${todayDate}`);

    const learnedWordsPerDate = getLearnedWordsPerDate(allGames);

    const learnedWordsToday = getLearnedWordsToday(allGames, `${todayDate}`);

    const learnedWordsTotal = getLearnedWordsTotal(learnedWordsPerDate);

    const parsedStats = {
      learnedWordsTotal,
      learnedWordsToday,
      learnedWordsPerDate,
      percentToday,
      savannaGameStats,
      matchGameStats,
      sprintGameStats,
      audioGameStats,
    };

    // console.log(parsedStatsOnFront)
    // console.log(PARSED_STATS_ON_BACK);
    // console.log(savannaGameStats);
  }, []);

  useEffect(() => {
    getStats();
  }, [getStats]);

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box span={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  title: {
    marginTop: '40px',
    marginBottom: '20px',
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="В цифрах" {...a11yProps(0)} />
          <Tab label="На графиках" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Typography variant="h4" className={classes.title}>
          Успехи в играх
        </Typography>
        <DenseTable stats={gameStats} />
        <Typography variant="h4" className={classes.title}>
          За сегодня
        </Typography>
        <DenseTable stats={appStats} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h4" className={classes.title}>
          Прогресс изучения слов по дням
        </Typography>
        <Chart data={data} />
        <Typography variant="h4" className={classes.title}>
          Сколько всего слов вы выучили
        </Typography>
        <Chart data={totalWords} />
      </TabPanel>
    </div>
  );
}
