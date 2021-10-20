import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    table: (props) => ({
        boxShadow:
            props.theme === 'dark'
                ? '3px 0px 10px 3px rgba(227, 134, 0, 0.5)'
                : '3px 0px 10px 3px rgba(86, 0, 232, 0.6)',
        color: 'inherit',
        fontFamily: 'inherit',
        fontSize: '2rem',
        borderColor: props.theme === 'dark' ? '#FCCA81' : '#BB86FC',
        '& .MuiTableRow-root': {
            borderColor: props.theme === 'dark' ? '#FCCA81' : '#BB86FC',
            '& .MuiTableCell-head': {
                padding: '5px',
                fontWeight: '400',
                color: 'inherit',
                fontFamily: 'inherit',
                borderColor: 'inherit',
                '@media (max-width: 768px)': {
                    fontSize: '1rem',
                },
                '@media (max-width: 550px)': {
                    fontSize: '0.85rem',
                },
            },
            '& .MuiTableCell-body': {
                padding: '5px',
                color: 'inherit',
                fontFamily: 'inherit',
                borderColor: 'inherit',
                '@media (max-width: 768px)': {
                    fontSize: '0.85rem',
                },
                '@media (max-width: 550px)': {
                    fontSize: '0.6rem',
                },
            },
        },
    }),
})

export const GameStatsTable = ({ rows }) => {
    const { theme } = useSelector((state) => state.settings)
    const classes = useStyles({ theme })

    return (
        <Table className={classes.table} size="small">
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
                        <TableCell align="right">
                            {row.correctPercent}
                        </TableCell>
                        <TableCell align="right">{row.wordsCount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
