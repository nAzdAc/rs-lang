import React, { useState, useContext, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import { Link, Redirect } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Visibility from '@material-ui/icons/Visibility';

import IconButton from '@material-ui/core/IconButton';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormControl from '@material-ui/core/FormControl';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import images from '../assets/images';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { backRoutes } from '../utils/backRoutes';

import { ToastContainer } from 'react-toastify';
import { useMessage } from '../hooks/message.hook';
import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from '../hooks/auth.hook';
const useStyles = makeStyles((theme) => ({
  mainBox: {
    width: '400px',
    padding: '20px 60px 50px 40px ',
    margin: '40px auto 40px 0px ',
    boxShadow: '2px 0px 14px 2px rgba(0,0,0,0.09)',
  },
  main: {
    width: '100%',
    display: 'flex',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    display: 'flex',
    flexDirection: 'column',
  },
  buttonBox: {
    marginTop: '30px',
    marginBottom: '0px',
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
  },
  submit: {
    width: '180px',
    height: '36px',
    backgroundColor: '#01A299',
    marginTop: 'auto',
    fontSize: '14px',
  },
  title: {
    marginBottom: '30px',
    marginRight: 'auto',
  },
  info: {
    marginLeft: '1rem',
    opacity: '0.8',
  },
  passwordField: {
    marginTop: '30px',
  },
  register: {
    margin: 'auto',
    fontSize: '14px',
    textDecoration: 'none',
  },
  email: {
    marginBottom: '0',
  },
  image: {
    width: '400px',
    height: '400px',
    marginTop: 'auto',
    marginLeft: 'auto',
  },
  message: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
}));

export default function SignInPage() {
  const message = useMessage();
  const { request, error, clearError } = useHttp();
  const { token, login } = useContext(AuthContext);
  const classes = useStyles();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  // const { token } = useAuth();
  const isAuthenticated = !!token;

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await request(backRoutes.signIn, 'POST', { ...form });
      login(
        data.token,
        data.refreshToken,
        data.userId,
        data.name,
        data.avatarURL
      );

      message(data.message, 200);
    } catch (e) {}
  }

  if (isAuthenticated) {
    return <Redirect to="/book" />;
  } else
    return (
      <Container className={classes.main}>
        <Container component="main" maxWidth="xs" className={classes.mainBox}>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography
              component="h1"
              variant="h2"
              align="left"
              className={classes.title}
            >
              Аккаунт
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Электропочта"
                name="email"
                autoComplete="email"
                autoFocus
                value={form.email}
                onChange={handleFormChange}
                className={classes.email}
              />
              <Typography
                component="h1"
                variant="subtitle2"
                align="left"
                className={classes.info}
              >
                Используйте настоящую
              </Typography>
              <FormControl
                className={classes.passwordField}
                variant="outlined"
                value={form.password}
                onChange={handleFormChange}
              >
                <InputLabel
                  value={form.password}
                  htmlFor="outlined-adornment-password"
                >
                  Пароль
                </InputLabel>
                <OutlinedInput
                  name="password"
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <ToastContainer className={classes.info} />
              <Typography
                component="h1"
                variant="subtitle2"
                align="left"
                className={classes.info}
              >
                Минимум 6 символов
              </Typography>
              <Box className={classes.buttonBox}>
                <Button
                  type="submit"
                  // onClick={handleLogin}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Войти
                </Button>

                <Button className={classes.register}>
                  <Link className={classes.link} to={'/signup'}>
                    Регистрация
                  </Link>
                </Button>
              </Box>
            </form>
          </div>
        </Container>
        <img className={classes.image} src={images.log} alt="rs" />
      </Container>
    );
}
