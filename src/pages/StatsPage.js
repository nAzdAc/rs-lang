import { Typography } from '@material-ui/core';
import TabPanel from '../components/statsTabs';
import { makeStyles } from '@material-ui/core/styles';
import illustration from '../assets/images/stats.png';

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: '#FCFCFF',
    display: 'flex',
    gap: '1rem',
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
    paddingBottom: '40px',
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
        <img src={illustration} alt="a man looking at chart" />
      </div>
    </div>
  );
};
