import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { originURL } from "../utils/backRoutes";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxSizing: "border-box",
  },
  item: {
    minWidth:'360px',
    width: "100%",
  },
  paper: {
    boxSizing: "border-box",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "left",
    color: theme.palette.text.secondary,
    height: "100%",
    boxShadow: 'none'
  },
  wordExample: {
    display:'flex',
    flexWrap:'wrap',
    fontSize: '34px',
    color: '#000000'
  },
  textEx: {
    fontSize: '16px',
    fontWeight: '400',
    color: '#000000',
  },
  textExTr: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#000000',
  },

  img: {
    height: "100%",
    width: "100%",
    objectFit: 'contain',
  },
  conteiner: {
    display:'flex',
    flexWrap: 'wrap',
    margin: "0",
    marginTop: "40px",
    justifyContent: "center",
    minHeight: "232px",
    width: "100%",
    boxShadow: "2px 0px 14px 2px rgba(0,0,0,0.09)",
  },
}));

export default function WordCard(props) {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid className={classes.item} item xs={3}>
          <Paper className={classes.paper}>
            <img
              className={classes.img}
              src={`${originURL}/${props.image}`}
              alt="img"
            ></img>
          </Paper>
        </Grid>
        <Grid className={classes.item} item xs={4}>
          <Paper className={classes.paper}>
            <Box className={classes.wordExample}>
              <Box component="span" mr={1}>
                {props.word}
              </Box>
              <Box component="span" mr={1}>
                {props.transcription}
              </Box>
              <Box component="span">
                {props.wordTranslate}
              </Box>
            </Box>
            <Box className={classes.textEx}>{props.textMeaning}</Box>
            <Box className={classes.textExTr} >{props.textMeaningTranslate}</Box>
          </Paper>
        </Grid>
        <Grid className={classes.item} item xs={4}>
          <Paper className={classes.paper}>
            {props.infoPanel}
            <Box className={classes.textEx}>{props.textExample}</Box>
            <Box className={classes.textExTr} >{props.textExampleTranslate}</Box>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.conteiner} container item xs={12} spacing={3}>
        <FormRow />
      </Grid>
    </div>
  );
}
