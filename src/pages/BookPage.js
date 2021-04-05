import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "fontsource-roboto";
import Box from "@material-ui/core/Box";
import LevelButton from "../components/LevelButton";
import { NavLink } from "react-router-dom";

import { useHistory, Switch, Route, useRouteMatch } from "react-router-dom";
import { bookLinks } from "../components/routeData";
import WordsPage from "./WordsPage";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    marginTop: "160px",
    width: "100%",
    fontSize: "60px",
    fontStyle: "normal",
    fontWeight: "300",
    lineHeight: "72px",
    textAlign: "left",
    verticalAlign: "middle",
  },
  buttonBox: {
    display: "flex",
    marginTop: "40px",
    marginRight: "auto",
    flexWrap: "wrap",
  },
  link: {
    textDecoration: "none",
  },
}));

const BookPage = () => {
  const classes = useStyles();
  const {
    location: { pathname },
  } = useHistory();
  const isBookRoute = pathname.slice(1).split("/").length === 1;
  const { path } = useRouteMatch();

  function LevelsBottons() {
    return (
      <React.Fragment>
        <Typography className={classes.title} variant="h1" component="h2">
          Select difficulty
        </Typography>
        <Box className={classes.buttonBox}>
          <NavLink className={classes.link} to={`book/level_1`}>
            <LevelButton group={1}></LevelButton>
          </NavLink>
          <NavLink className={classes.link} to={"book/level_2"}>
            <LevelButton group={2}></LevelButton>
          </NavLink>
          <NavLink className={classes.link} to={"book/level_3"}>
            <LevelButton group={3}></LevelButton>
          </NavLink>
          <NavLink className={classes.link} to={"book/level_4"}>
            <LevelButton group={4}></LevelButton>
          </NavLink>
          <NavLink className={classes.link} to={"book/level_5"}>
            <LevelButton group={5}></LevelButton>
          </NavLink>
          <NavLink className={classes.link} to={"book/level_6"}>
            <LevelButton group={6}></LevelButton>
          </NavLink>
        </Box>
      </React.Fragment>
    );
  }

  return (
    <Container className={classes.container}>
      <>
        {isBookRoute ? <LevelsBottons /> : null}
        <Switch>
          {bookLinks.map((link, index) => (
            <Route path={`${path}${link.to}`} key={index}>
              <WordsPage> </WordsPage>
            </Route>
          ))}
        </Switch>
      </>
    </Container>
  );
};

export default BookPage;
