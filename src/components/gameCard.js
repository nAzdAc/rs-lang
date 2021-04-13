import { Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowRight } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    marginRight: '1rem',
  },
  card: {
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 60,
    paddingBottom: 80,
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

export const GameCard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.card}>
        <Typography variant="h4" className={classes.cardTitle}>
          {props.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.cardText}>
          {props.todo}
        </Typography>
        <NavLink to={props.to} className={classes.link}>
          <Button className={classes.button} variant="contained" size="medium">
            Начать
          </Button>
        </NavLink>
      </Paper>
    </div>
  );
};
