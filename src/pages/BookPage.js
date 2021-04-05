import { useHistory, Switch, Route, useRouteMatch } from 'react-router-dom';
import { bookLinks } from '../components/routeData';
import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "fontsource-roboto";
import Box from "@material-ui/core/Box";
import LevelButton from "../components/LevelButton";
import { NavLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: 'column',
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
    textDecoration: 'none',
  },
}));

export function WordsPage() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography className={classes.title} variant="h1" component="h2">
        Select difficulty
      </Typography>
      <Box className={classes.buttonBox}>
        <NavLink className={classes.link}  to={'/level_1'}><LevelButton group={1}></LevelButton></NavLink>
        <NavLink className={classes.link}  to={'/level_2'}><LevelButton group={2}></LevelButton></NavLink>
        <NavLink className={classes.link}  to={'/level_3'}><LevelButton group={3}></LevelButton></NavLink>
        <NavLink className={classes.link}  to={'/level_4'}><LevelButton group={4}></LevelButton></NavLink>
        <NavLink className={classes.link}  to={'/level_5'}><LevelButton group={5}></LevelButton></NavLink>
        <NavLink className={classes.link}  to={'/level_6'}><LevelButton group={6}></LevelButton></NavLink>
      </Box>
    </Container>
  );
}


const RouteComponent = ({ text }) => <div>{text}</div>;

const BookPage = () => {
  const { location : { pathname } } = useHistory();
  const isBookRoute = pathname.slice(1).split('/').length === 1;
  const { path } = useRouteMatch();

  return (
    <>
      {isBookRoute ? <WordsPage /> : null}
      <Switch>
        {bookLinks.map((link, index) => (
          <Route path={`${path}${link.to}`} key={index}>
            <RouteComponent text={link.text} />
          </Route>
        ))}
      </Switch>
    </>
  );
}

export default BookPage;
