import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxSizing: 'border-box',
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '90%',
    // boxShadow: 'none'
  },
  conteiner: {
    margin: '0',
    marginTop: '40px',
    justifyContent: 'center',
    height: '232px',
    // border: '1px solid',
    width: '100%',
    boxShadow: "2px 0px 14px 2px rgba(0,0,0,0.09)",
    
  },
}));

export default function WordCard(props) {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>{props.word}</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid  container spacing={1}>
        <Grid className={classes.conteiner} container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
