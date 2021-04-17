import { Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    marginRight: '1rem',
  },
  card: {
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 60,
    paddingBottom: 40,
    width: 200,
  },

  cardTitle: {
    marginBottom: 20,
  },
  cardText: {
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#01A299',
    color: '#fff',
    '&:hover': {
      background: '#00D9CE',
    },
  },
  link: { textDecoration: 'none' },
});

export const GameCard = ({name, todo, to, activeLevel}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.card}>
        <Typography variant="h4" className={classes.cardTitle}>
          {name}
        </Typography>
        <Typography variant="subtitle1" className={classes.cardText}>
          {todo}
        </Typography>
        <NavLink to={to} className={classes.link}>
          {activeLevel !== null ? <Button className={classes.button} variant="contained" size="medium">
            Начать
          </Button> : null}
        </NavLink>
      </Paper>
    </div>
  );
};
