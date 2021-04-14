import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { changeLoginStatus } from '../store/loginSlice';
import { useSelector } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import ava_image from '../assets/images/mila-kunis-mila-kunis-aktrisa-2477.jpeg';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    gap: 8,
    width: 200,
    alignItems: 'center',
  },

  name: {
    margin: 0,
    padding: 0,
    color: '#ffffff',
  },

  logout: {
    margin: 0,
    padding: 0,
    color: '#ffffff',
    '&:hover': {
      color: '#01A299',
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

  link: {
    textDecoration: 'none',
  },
}));

export const Enterpoint = (props) => {
  const classes = useStyles();
  // const loggedin = useSelector((state) => state.login.LoggedIn);
  // const dispatch = useDispatch();
  // const handleLogin = () => {
  //   dispatch(changeLoginStatus(false));
  // };
  const { userName, token, avatar } = useContext(AuthContext);
  const isAuthenticated = !!token;

  if (isAuthenticated) {
    return (
      <div className={classes.root}>
        <Avatar alt="Remy Sharp" src={avatar} />
        <Typography variant="body2" className={classes.name}>
          {userName}
        </Typography>
        <ExitToAppIcon
          className={classes.logout}
          // onClick={handleLogin}
        ></ExitToAppIcon>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <RouterLink to={props.to} className={classes.link}>
        <Button variant="contained" size="small" className={classes.button}>
          Войти
        </Button>
      </RouterLink>
    </div>
  );
};
