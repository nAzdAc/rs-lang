import React from 'react';
import { Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../components/statsTabs';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import illustration from '../assets/images/project-costs.png';

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: '#FCFCFF',
    display: 'flex',
  },
  content: {
    width: '60%',
    paddingTop: '80px',
    paddingLeft: '120px',
  },
  illustration: {
    width: '40%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'end',
  },
  title: {
    marginBottom: '40px',
  },
});
export const StatsPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Typography variant="h2" className={classes.title}>
          Статистика
        </Typography>
        <TabPanel />
      </div>
      <div className={classes.illustration}>
        <img src={illustration} />
      </div>
    </div>
  );
};
