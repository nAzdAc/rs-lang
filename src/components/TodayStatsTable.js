import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
	lightTable: {
		boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)',
		minWidth: '300px',
		maxWidth: '400px',
		color: 'inherit',
		fontFamily: 'inherit',
		borderColor: '#BB86FC',
		'& .MuiTableRow-root': {
			'& .MuiTableCell-head': {
				fontWeight: '600',
				color: 'inherit',
				fontFamily: 'inherit',
				borderColor: 'inherit'
			},
			'& .MuiTableCell-body': {
				color: 'inherit',
				fontFamily: 'inherit',
				borderColor: 'inherit'
			}
		}
	},
	darkTable: {
		boxShadow: '3px 0px 10px 3px rgba(0,0,0,0.25)',
		minWidth: '300px',
		maxWidth: '400px',
		color: 'inherit',
		fontFamily: 'inherit',
		borderColor: '#FCCA81',
		'& .MuiTableRow-root': {
			'& .MuiTableCell-head': {
				fontWeight: '600',
				color: 'inherit',
				fontFamily: 'inherit',
				borderColor: 'inherit'
			},
			'& .MuiTableCell-body': {
				color: 'inherit',
				fontFamily: 'inherit',
				borderColor: 'inherit'
			}
		}
	}
});

export const TodayStatsTable = ({ learnedWordsToday, percentToday }) => {
	const classes = useStyles();
	const { theme } = useSelector((state) => state.settings);

	return (
		<Table
			className={theme === 'dark' ? classes.darkTable : classes.lightTable}
			size="small"
			aria-label="a dense table"
		>
			<TableHead>
				<TableRow>
					<TableCell>Показатель</TableCell>
					<TableCell align="right">Значение</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
					<TableCell component="th" scope="row">
						Всего слов
					</TableCell>
					<TableCell align="right">{learnedWordsToday || 0}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell component="th" scope="row">
						Правильные ответы
					</TableCell>
					<TableCell align="right">{percentToday || 0}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};
