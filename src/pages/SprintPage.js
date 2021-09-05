import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import fonSong from '../assets/sounds/fon.mp3'
import successSong from '../assets/sounds/success.mp3'
import failSong from '../assets/sounds/no.wav'
import { CircularProgress } from '@material-ui/core'
import { createSound, getRandomInt } from '../utils/helpers'
import { GameStats } from '../components/GameStats'
import { toggleScreen } from '../utils/fullScreen'
import { useGames } from '../hooks/games.hook'
import { useSelector, useDispatch } from 'react-redux'
import { useStyles } from '../styles/pagesStyles/Games.styles'
import { yesNoKeyCode } from '../utils/constants'
import { setActiveWords, setLevel } from '../redux/actions'
import { GamesProgressBar } from '../components/GamesProgressBar'
import { RoundTimer } from '../components/RoundTimer'
import { Howler } from 'howler'

export const SprintPage = () => {
    const { soundVolume, musicVolume, theme } = useSelector(
        (state) => state.settings
    )
    const classes = useStyles({ theme })
    const dispatch = useDispatch()
    const { getWords } = useGames()
    const [endGame, setEndGame] = useState(false)
    const [seconds, setSeconds] = useState(60)
    const [wordsArray, setWordsArray] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [failAnswers, setFailAnswers] = useState([])
    const [currentWord, setCurrentWord] = useState({})
    const [currentRussianWord, setCurrentRussianWord] = useState('')
    const [currentNumber, setCurrentNumber] = useState(0)
    const [fullScreen, setFullScreen] = useState(false)
    const [currentSeries, setCurrentSeries] = useState(0)
    const [allSeries, setAllSeries] = useState([])
    const gameBoard = useRef()
    const seriesContainer = useRef('')
    const timer = useRef()

    const audioSuccess = useMemo(
        () => createSound(successSong, soundVolume),
        [soundVolume]
    )
    const audioFail = useMemo(
        () => createSound(failSong, soundVolume),
        [soundVolume]
    )
    const audioFon = useMemo(
        () => createSound(fonSong, musicVolume * 0.1, 1, true),
        [musicVolume]
    )

    const playWords = useCallback(async () => {
        const words = await getWords()
        console.log(words)
        setWordsArray(words)
    }, [getWords])

    useEffect(() => {
        playWords()
    }, [playWords])

    const answer = useCallback(
        (value) => {
            if (endGame) return
            if (
                (value === 'true' &&
                    currentWord.wordTranslate === currentRussianWord) ||
                (value === 'false' &&
                    currentWord.wordTranslate !== currentRussianWord)
            ) {
                seriesContainer.current.innerHTML +=
                    ' <img src="https://img.icons8.com/color/48/000000/hand-drawn-star.png"/>'
                setCurrentSeries((prev) => prev + 1)
                setCorrectAnswers((prev) => [...prev, currentWord])
                audioSuccess.play()
            } else {
                setAllSeries((prev) => [...prev, currentSeries])
                setCurrentSeries(0)
                seriesContainer.current.innerHTML = ''
                setFailAnswers((prev) => [...prev, currentWord])
                audioFail.play()
            }
            setCurrentNumber((prev) => prev + 1)
        },
        [
            audioFail,
            audioSuccess,
            currentRussianWord,
            currentSeries,
            currentWord,
            endGame,
        ]
    )

    useEffect(() => {
        if (wordsArray.length && currentNumber < wordsArray.length) {
            setCurrentWord(wordsArray[currentNumber])
            setCurrentRussianWord(() => {
                let word
                const num = Math.random()
                if (num > 0.45) {
                    word = wordsArray[currentNumber].wordTranslate
                } else {
                    word =
                        wordsArray[getRandomInt(0, wordsArray.length)]
                            .wordTranslate
                }
                return word
            })
        }
    }, [currentNumber, wordsArray])

    useEffect(() => {
        timer.current = setInterval(() => {
            setSeconds((prev) => prev - 1)
        }, 1000)
        return () => {
            clearInterval(timer.current)
        }
    }, [])

    useEffect(() => {
        if (
            seconds <= 0 ||
            (currentNumber && currentNumber >= wordsArray.length)
        ) {
            setEndGame(true)
            clearInterval(timer.current)
        }
    }, [seconds, audioFon, currentNumber, wordsArray.length])

    useEffect(() => {
        if (!endGame && musicVolume) {
            audioFon.play()
        }
        return () => {
            Howler.stop()
        }
    }, [endGame, audioFon, musicVolume])

    useEffect(() => {
        if (endGame) return
        const keyboardClick = (event) => {
            if (!Object.values(yesNoKeyCode).includes(event.keyCode)) return
            let value
            if (
                event.keyCode === yesNoKeyCode.enter ||
                event.keyCode === yesNoKeyCode.num2
            ) {
                value = 'true'
            } else if (
                event.keyCode === yesNoKeyCode.space ||
                event.keyCode === yesNoKeyCode.num1
            ) {
                value = 'false'
            }
            answer(value)
        }
        document.addEventListener('keydown', keyboardClick)
        return () => {
            document.removeEventListener('keydown', keyboardClick)
        }
    }, [answer, endGame])

    useEffect(() => {
        return () => {
            dispatch(setLevel(null))
            dispatch(setActiveWords([]))
        }
    }, [dispatch])

    function goFullScreen(elem) {
        setFullScreen((prev) => !prev)
        toggleScreen(elem)
    }

    return (
        <div className={classes.root}>
            {endGame ? (
                <GameStats
                    allSeries={allSeries}
                    gameName="sprint"
                    correctAnswers={correctAnswers}
                    failAnswers={failAnswers}
                />
            ) : wordsArray.length && currentWord && currentRussianWord ? (
                <div ref={gameBoard} className={classes.gameContainer}>
                    <GamesProgressBar
                        currentNumber={currentNumber}
                        allNumber={wordsArray.length}
                    />
                    <button
                        onClick={() => goFullScreen(gameBoard.current)}
                        className={classes.fullScreenBtn}
                    >
                        {fullScreen ? (
                            <FullscreenExitIcon
                                className={classes.fullScreenIcon}
                            />
                        ) : (
                            <FullscreenIcon
                                className={classes.fullScreenIcon}
                            />
                        )}
                    </button>
                    <RoundTimer seconds={seconds} />
                    <h4 className={classes.currentWord}>{`${
                        currentWord.word || ''
                    } = ${currentRussianWord || ''}`}</h4>
                    <div ref={seriesContainer} className={classes.series} />
                    <div className={classes.buttonsWrap}>
                        <button
                            className={classes.failButton}
                            onClick={(event) => answer(event.target.value)}
                            value={false}
                        >
                            НЕ ВЕРНО
                        </button>
                        <button
                            className={classes.correctButton}
                            onClick={(event) => answer(event.target.value)}
                            value={true}
                        >
                            ВЕРНО
                        </button>
                    </div>
                    <h4 className={classes.progressText}>
                        Правильные ответы:&#160;
                        <span className={classes.correctText}>
                            {correctAnswers.length || 0}
                        </span>
                    </h4>
                    <h4 className={classes.progressText}>
                        Ошибки:&#160;
                        <span className={classes.failText}>
                            {failAnswers.length || 0}
                        </span>
                    </h4>
                </div>
            ) : (
                <CircularProgress className={classes.loader} />
            )}
        </div>
    )
}
