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
import images from "../assets/images/index";
import { useHttp } from "../hooks/http.hook";
import { backRoutes } from "../utils/backRoutes";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    display: "flex",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  mainBox: {
    width: "400px",
    padding: "20px 50px 50px 40px ",
    boxShadow: "2px 0px 14px 2px rgba(0,0,0,0.09)",
    margin: "40px auto 40px 0px ",
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
    width: "180px",
    height: "36px",
    backgroundColor: "#6200EE",
    marginTop: "30px",
    fontSize: "14px",
  },
  submit: {
    width: "180px",
    height: "36px",
    backgroundColor: "#01A299",
    fontSize: "14px",
  },
  link: {
    textDecoration: "none",
  },
  title: {
    marginBottom: "30px",
    marginRight: "auto",
  },
  info: {
    marginLeft: "1rem",
    opacity: "0.8",
  },
  passwordField: {
    marginTop: "30px",
  },
  buttonBox: {
    marginTop: "30px",
    display: "flex",
  },
  register: {
    margin: "auto",
    fontSize: "14px",
  },
  email: {
    marginTop: "30px",
  },
  image: {
    width: "400px",
    height: "400px",
    marginTop: "auto",
    marginLeft: "auto",
  },
}));

export default function SignUpPage() {
  const { request } = useHttp();
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

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await request(backRoutes.signUp, "POST", { ...form });
      console.log(data);
      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (e) {}
  }

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
            Registration
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
              onChange={handleFormChange}
            />
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
              onChange={handleFormChange}
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
            <FormControl
              className={classes.passwordField}
              value={form.password}
              onChange={handleFormChange}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
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
                <Link className={classes.link} to={"/signIn"}>
                  Login
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
