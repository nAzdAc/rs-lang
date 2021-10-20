import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getOffset } from '../utils/helpers'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
    timerContainer: {
        width: '180px',
        height: '180px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: '50%',
        '@media (max-width: 450px)': {
            width: '120px',
            height: '120px',
        },
        margin: '15px',
    },
    timerTextWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'inherit',
        width: '80px',
        height: '80px',
        position: 'absolute',
        borderRadius: '50%',
        fontSize: '40px',
        fontFamily: 'inherit',
        color: 'inherit',
        zIndex: '3',
    },
    circle: {
        transformOrigin: 'center',
        transform: 'rotate(-90deg)',
        transition: '0.3s',
    },
    timerText: {},
})

export const RoundTimer = ({ seconds }) => {
    const classes = useStyles()
    const circleRef = useRef()
    const { theme } = useSelector((state) => state.settings)

    useEffect(() => {
        circleRef.current.style.strokeDashoffset = getOffset(seconds, 60)
    }, [seconds])

    return (
        <div className={classes.timerContainer}>
            <svg width="120" height="120" className={classes.timerRingWrap}>
                <circle
                    ref={circleRef}
                    className={classes.circle}
                    stroke={theme === 'dark' ? '#E38600' : '#5600E8'}
                    strokeWidth="15"
                    cx="60"
                    cy="60"
                    r="52"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                    strokeDashoffset={`${2 * Math.PI * 52}`}
                />
            </svg>
            <div className={classes.timerTextWrap}>
                <span className={classes.timerText}>{seconds}</span>
            </div>
        </div>
    )
}
