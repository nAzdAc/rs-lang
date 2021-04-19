import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { originURL } from '../utils/backRoutes';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import illustration from '../assets/images/stats.png';
import StatisticsTabs from '../components/Tabs';

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: '#FCFCFF',
    padding: '20px',
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'flex',
    gap: '1rem',
  },
  content: {
    maxWidth: '700px',
    width: '60%',
    paddingTop: '80px',
    paddingLeft: '120px',
    '@media (max-width: 1200px)': {
      paddingTop: '40px',
    },
    '@media (max-width: 960px)': {
      width: '100%',
    },
  },
  illustrationWrapper: {
    width: '40%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'end',
  },

  illustration: {
    width: '100%',
    opacity: 0.8,
    '@media (max-width: 960px)': {
      display: 'none',
    },
  },
  title: {
    marginBottom: '40px',
  },
});
export const StatsPage = () => {
  const classes = useStyles();
  const { userId, token } = useContext(AuthContext);
  const { request } = useHttp();
  const [stats, setStats] = useState();

  const getStats = useCallback(async () => {
    if (!token || !userId) return;
    const userStats = (
      await request(`${originURL}/users/${userId}/statistics/`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
    ).parsedStats;
    console.log(userStats);
    setStats(userStats);
  }, [request, token, userId]);

  useEffect(() => {
    getStats();
  }, [getStats]);

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
      <div className={classes.illustrationWrapper}>
        <img
          src={illustration}
          alt="a man looking at chart"
          className={classes.illustration}
        />
      </div>
    </div>
  );
};
