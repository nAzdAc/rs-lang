import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Visibility from "@material-ui/icons/Visibility";

import IconButton from "@material-ui/core/IconButton";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

import FormControl from "@material-ui/core/FormControl";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  mainBox: {
    width: "428px",
    padding: "20px 60px 80px 40px ",
    height: "548px",
    boxShadow: "2px 0px 14px 2px rgba(0,0,0,0.09)",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    width: "207px",
    height: "36px",
    backgroundColor: "#6200EE",
    marginTop: "auto",
    fontSize: "14px",
  },
  submit: {
    width: "207px",
    height: "36px",
    backgroundColor: "#01A299",
    marginTop: "auto",
    fontSize: "14px",
  },
  link: {
    textDecoration: "none",
  },
  title: {
    marginBottom: theme.spacing(5),
    marginRight: "auto",
  },
  info: {
    marginLeft: "1rem",
    opacity: "0.8",
  },
  passwordField: {
    marginTop: "40px",
  },
  buttonBox: {
    marginTop: "auto",
    display: "flex",
  },
  register: {
    margin: "auto",
    fontSize: "14px",
  },
  email: {
    marginBottom: "0",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleFrormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.mainBox}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography
          component="h1"
          variant="h2"
          align="left"
          className={classes.title}
        >
          Registration
        </Typography>
        <form className={classes.form} noValidate>
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
            className={classes.email}
          />
          <Typography
            component="h1"
            variant="subtitle2"
            align="left"
            className={classes.info}
          >
            Use the real one
          </Typography>
          <FormControl className={classes.passwordField} variant="outlined">
            <InputLabel
              value={form.password}
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <Typography
            component="h1"
            variant="subtitle2"
            align="left"
            className={classes.info}
          >
            No stupid restrictions
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<AddIcon />}
          >
            avatar
          </Button>

          <Box className={classes.buttonBox}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Button className={classes.register}>
              <Link className={classes.link} to={"/login"}>
                Login
              </Link>
            </Button>
          </Box>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
