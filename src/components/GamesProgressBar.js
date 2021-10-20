import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
    progressContainer: {
        width: '80%',
        maxWidth: '800px',
        color: 'inherit',
        background: 'inherit',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '10px',
        fontFamily: 'inherit',
        marginTop: '-20px',
    },
    sideBarText: {
        fontSize: '1.25rem',
        fontWeight: '400',
        marginTop: '8px',
    },
    progressBarWrap: (props) => ({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        '& .MuiLinearProgress-root': {
            backgroundColor: props.theme === 'dark' ? '#FCCA81' : '#BB86FC',
            height: '6px',
            borderRadius: '20px',
            '& .MuiLinearProgress-barColorPrimary': {
                backgroundColor: props.theme === 'dark' ? '#E38600' : '#5600E8',
            },
        },
    }),
    overBarText: {
        margin: '0 auto',
        fontSize: '1rem',
        fontWeight: '400',
        marginBottom: '3px',
    },
})

export const GamesProgressBar = ({ currentNumber, allNumber }) => {
    const { theme } = useSelector((state) => state.settings)
    const classes = useStyles({ theme })

    return (
        <Box className={classes.progressContainer}>
            <span className={classes.sideBarText}>{currentNumber}</span>
            <Box className={classes.progressBarWrap}>
                <span className={classes.overBarText}>{`${Math.round(
                    (currentNumber / allNumber) * 100
                )} %`}</span>
                <LinearProgress
                    variant="determinate"
                    value={(currentNumber / allNumber) * 100}
                />
            </Box>
            <span className={classes.sideBarText}>{allNumber}</span>
        </Box>
    )
}
