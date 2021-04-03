import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    '& > *': {
      margin: '8px',
    },
  },
  button: {
    marginRight: "40px",
    width:'72px',
    height:'72px',
    fontSize: '52px',
    color: 'white',
    backgroundColor: group => group === 1? '#BB86FC': group === 2? '#985EFF': group === 3? '#7F39FB': group === 4? '#6200EE': group === 5? '#5600E8': group === 6? '#3700B3': '#3700B3',
  },
});

export default function LevelButton(props) {
  const group = props.group
  const classes = useStyles(group);

  return (
    <div  className={classes.root}>
      <Button  className={classes.button} variant="contained" >
        {props.group}
      </Button>
    </div>
  );
}