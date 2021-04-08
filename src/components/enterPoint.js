import React from 'react';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changeLoginStatus } from '../store/loginSlice';
import Avatar from '@material-ui/core/Avatar';
import ava_image from '../assets/images/mila-kunis-mila-kunis-aktrisa-2477.jpeg';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    gap: 8,
    width: 200,
  },

  name: {
    margin: 0,
    padding: 0,
    color: '#ffffff',
  },
  logout: {
    textDecoration: 'underline',
    color: '#ffffff',
    '&:hover': {
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  },
  button: {
    fontWeight: 'bold',
    width: '109px',
    height: '36px',
    background: '#01A299',
    color: '#FFF',
    '&:hover': {
      background: '#00D9CE',
    },
  },
}));

export const Enterpoint = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedin = useSelector((state) => state.login.LoggedIn);
  const handleLogin = () => {
    dispatch(changeLoginStatus(!loggedin));
  };

  if (loggedin) {
    return (
      <div className={classes.root}>
        <Avatar alt="Remy Sharp" src={ava_image} />
        <div>
          <Typography variant="body1" className={classes.name}>
            English Queen
          </Typography>
          <a>
            <Typography
              variant="body2"
              onClick={handleLogin}
              className={classes.logout}
            >
              Log Out
            </Typography>
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <RouterLink to={props.to}>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          onClick={handleLogin}
        >
          Войти
        </Button>
      </RouterLink>
    </div>
  );
};
