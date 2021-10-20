import React, { useState, useEffect, useCallback } from 'react'
import { backRoutes } from '../utils/backRoutes'
import Pagination from '@material-ui/lab/Pagination'
import { gameCardsContent } from '../utils/constants'
import { Link, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useStyles } from '../styles/pagesStyles/WordsPage.styles'
import { setActiveWords } from '../redux/actions'
import { Button, CircularProgress } from '@material-ui/core'
import { WordCard } from '../components/WordCard'

export const BookPage = () => {
    const { theme } = useSelector((state) => state.settings)
    const { userWords, activeWords } = useSelector((state) => state)
    let match = useRouteMatch().path
    let group = match[match.length - 1] - 1
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const classes = useStyles({ theme, group })

    const fetchWords = useCallback(async () => {
        try {
            const res = await fetch(backRoutes.getWordsPage(group, page - 1), {
                method: 'GET',
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const bookWords = await res.json()
            console.log(bookWords)
            const wordsArrWithAnswers = bookWords.map((item) => {
                const foundWord = userWords.find(
                    (word) => `${word._id}` === `${item._id}`
                )
                if (foundWord) {
                    item = {
                        ...item,
                        deleted: foundWord.deleted,
                        difficult: foundWord.difficult,
                        correct: foundWord.correct,
                        fail: foundWord.fail,
                    }
                }
                return item
            })
            console.log(wordsArrWithAnswers)
            const filteredArr = wordsArrWithAnswers.filter(
                (item) => !item.deleted
            )
            console.log(filteredArr)
            dispatch(setActiveWords(filteredArr))
        } catch (e) {
            console.log(e)
        }
    }, [dispatch, group, page, userWords])

    useEffect(() => {
        fetchWords()
    }, [fetchWords])

    const handlePaginationChange = (e, value) => {
        setPage(value)
    }

    return (
        <React.Fragment>
            <h2 className={classes.levelTitle}>{`Уровень сложности ${
                group + 1
            }`}</h2>
            {activeWords.length ? (
                <React.Fragment>
                    <h4 className={classes.subtitle}>
                        Можешь запустить игру с этими словами
                    </h4>
                    <ul className={classes.typeBox}>
                        {gameCardsContent.map((game) => {
                            return (
                                <Link
                                    className={classes.link}
                                    key={`${game.name}game-Book`}
                                    to={{
                                        pathname: game.to,
                                    }}
                                >
                                    <Button
                                        className={classes.typeButton}
                                        variant="contained"
                                        size="medium"
                                    >
                                        {game.name}
                                    </Button>
                                </Link>
                            )
                        })}
                    </ul>
                    {
                        <Pagination
                            page={page}
                            className={classes.pagination}
                            onChange={handlePaginationChange}
                            count={30}
                        />
                    }
                    <ul className={classes.wordList}>
                        {activeWords.map((word) => {
                            return (
                                <WordCard
                                    key={`${word._id}word-Book${
                                        word.deleted && 'del'
                                    }${word.difficult && 'diff'}`}
                                    word={word}
                                />
                            )
                        })}
                    </ul>
                    <Pagination
                        page={page}
                        className={classes.pagination}
                        onChange={handlePaginationChange}
                        count={30}
                    />
                </React.Fragment>
            ) : (
                <CircularProgress color="inherit" />
            )}
        </React.Fragment>
    )
}
