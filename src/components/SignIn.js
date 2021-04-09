import React, { useState, useCallback, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { backRoutes } from '../utils/backRoutes';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        RS Lang
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { loading, error, request, clearError } = useHttp();
  const auth = useContext(AuthContext);
  const [isAccount, setIsAccount] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [sign, setSign] = useState('Sign in');
  const handleSignClick = () => {
    setIsAccount(false);
    setSign('Sign up');
  };
  const handleFrormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!isAccount) {
        console.log(form);
        // const res = await fetch(routes.signUp, {
        //   method: 'POST',
        //   body: form,
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // })
        const data = await request(backRoutes.signUp, 'POST', { ...form });
        // const data = await res.json();
        console.log(data);
        setIsAccount(true);
        setForm({
          name: '',
          email: '',
          password: '',
        });
        setSign('Sign in');
      } else {
        console.log(form);
        const data = await request(backRoutes.signIn, 'POST', { ...form });
        auth.login(data.token, data.refreshToken, data.userId, data.name);
        console.log(data);
      }
    } catch (e) {}
  }

  let nameField;
  if (!isAccount) {
    nameField = (
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="name"
        label="Name"
        type="text"
        id="name"
        autoComplete="name"
        value={form.name}
        onChange={handleFrormChange}
      />
    );
  } else {
    nameField = null;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {sign}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {nameField}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={form.email}
            onChange={handleFrormChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleFrormChange}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {sign}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={handleSignClick}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
