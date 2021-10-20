import { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useStyles } from '../styles/pagesStyles/StatsGamesSettings.styles'

export const GameCard = ({ name, todo, to }) => {
    const { theme } = useSelector((state) => state.settings)
    const classes = useStyles({ theme })
    const { level } = useSelector((state) => state)
    const cardRef = useRef()
    const cardItemRef = useRef()
    const buttonRef = useRef()

    const rotateCard = useCallback((event) => {
        const halfHeight = cardItemRef.current.offsetHeight / 2
        cardItemRef.current.style.transform = `rotateX(${
            -(event.offsetY - halfHeight) / 6
        }deg)
		rotateY(${(event.offsetX - halfHeight) / 10}deg)`
    }, [])

    const rotateBack = useCallback((event) => {
        event.stopPropagation()
        cardItemRef.current.style.transform = 'rotate(0deg)'
    }, [])

    useEffect(() => {
        cardRef.current.addEventListener('mousemove', rotateCard)
    }, [rotateCard])

    useEffect(() => {
        if (level) {
            buttonRef.current.addEventListener('mousemove', rotateBack)
        }
    }, [level, rotateBack])

    return (
        <div ref={cardRef} className={classes.card}>
            <div ref={cardItemRef} className={classes.cardItem}>
                <h4 className={classes.subtitle1}>{name}</h4>
                <p className={classes.subtitle2}>{todo}</p>
                <NavLink to={to} className={classes.link}>
                    {level !== null && (
                        <button ref={buttonRef} className={classes.button}>
                            Начать
                        </button>
                    )}
                </NavLink>
            </div>
        </div>
    )
}
