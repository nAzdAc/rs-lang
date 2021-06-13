import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import { useStyles } from '../styles/componentsStyles/GameStats.styles';

export const GameStatsTable = ({ rows }) => {
	const { theme } = useSelector((state) => state.settings);
	const classes = useStyles({ theme });

	return (
		<Table className={classes.table} size="small" aria-label="a dense table">
			<TableHead>
				<TableRow>
					<TableCell>Игра</TableCell>
					<TableCell align="right">Лучшая серия</TableCell>
					<TableCell align="right">Правильные ответы, %</TableCell>
					<TableCell align="right">Всего слов</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{rows.map((row) => (
					<TableRow key={`${row.name}StatsTable`}>
						<TableCell component="th" scope="row">
							{row.name}
						</TableCell>
						<TableCell align="right">{row.longestSeries}</TableCell>
						<TableCell align="right">{row.correctPercent}</TableCell>
						<TableCell align="right">{row.wordsCount}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
