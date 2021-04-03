import React, { useState, useEffect, useCallback } from "react";
import { backRoutes } from "../utils/backRoutes";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useRouteMatch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "fontsource-roboto";
import Box from "@material-ui/core/Box";
import LevelButton from "../components/LevelButton";
import CardIcons from "../components/CardIcons";
import WordsCardList from "../components/WordsCardList"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  title: {
    marginRight: "40px",
    fontSize: "60px",
    fontStyle: "normal",
    fontWeight: "300",
    lineHeight: "80px",
    textAlign: "left",
    color: (group) =>
      group === 0
        ? "#BB86FC"
        : group === 1
        ? "#985EFF"
        : group === 2
        ? "#7F39FB"
        : group === 3
        ? "#6200EE"
        : group === 4
        ? "#5600E8"
        : group === 5
        ? "#3700B3"
        : "#3700B3",
    verticalAlign: "middle",
  },
  titleBox: {
    display: "flex",
    marginTop: "160px",
    marginRight: "auto",
  },
  pagination: {
    margin: "40px",
    fontSize: "40px",
  },
}));

export default function WordsPage() {
  let match = useRouteMatch().path;
  let group = match[match.length - 1] - 1;
  const [page, setPage] = useState(1);
  const classes = useStyles(group);
  
  const fetchUrl = backRoutes.getWordsPage(group, page)

  const handlePaginationChange = (e, value) => {
    setPage(value);
  };
  

  return (
    <Container className={classes.container}>
      <Box className={classes.titleBox}>
        <Typography className={classes.title} variant="h1" component="h2">
          Difficulty level
        </Typography>
        <LevelButton group={group + 1}></LevelButton>
      </Box>  
      <WordsCardList page={page}  difficulty={group} fetchUrl={fetchUrl} infoPanel="CardIcons"></WordsCardList>
      <Pagination
        page={page}
        className={classes.pagination}
        onChange={handlePaginationChange}
        count={20}
        color="primary"
      />
    </Container>
  );
}
