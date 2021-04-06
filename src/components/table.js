import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { gameStats, appStats } from '../const/tableData';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {gameStats.games.map((row) => (
              <TableCell key={row} align="right">
                {row}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {gameStats.totalWords.map((row) => (
              <TableCell key={row} align="right">
                {row}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {gameStats.mistakesPercent.map((row) => (
              <TableCell key={row} align="right">
                {row}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {gameStats.logestSeries.map((row) => (
              <TableCell key={row} align="right">
                {row}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
