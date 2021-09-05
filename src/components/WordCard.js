import React, { useState } from 'react'
import { originURL } from '../utils/backRoutes'
import GradeIcon from '@material-ui/icons/Grade'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import DeleteIcon from '@material-ui/icons/Delete'
import { useStyles } from '../styles/componentsStyles/WordCard.styles'
import { Paper } from '@material-ui/core'
import { convertText, createSound } from '../utils/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserWord } from '../redux/actions'
import { Howler } from 'howler'
import { useMessage } from '../hooks/message.hook'

export const WordCard = ({ word }) => {
    const {
        wordVolume,
        theme,
        difficultWord,
        deleteWord,
        translateWord,
        translateSentences,
    } = useSelector((state) => state.settings)
    const classes = useStyles({ theme })
    const dispatch = useDispatch()
    const showMessage = useMessage()
    const { token } = useSelector((state) => state.userData)
    const [additionalInfo, setAdditionalInfo] = useState(false)

    const handleAdditinalInfo = () => {
        setAdditionalInfo((prev) => !prev)
    }

    const play = (event) => {
        event.stopPropagation()
        Howler.stop()
        const src = event.currentTarget.value
        const audioWord = createSound(`${originURL}/${src}`, wordVolume)
        audioWord.play()
    }

    const updateWord = async (event) => {
        event.stopPropagation()
        const body = {
            wordId: event.currentTarget.id,
            name: event.currentTarget.dataset.name,
            value: event.currentTarget.value,
            wordName: event.currentTarget.dataset.wordName,
            wordBody: word,
        }
        console.log(event.currentTarget.dataset.wordName)
        console.log(body)
        if (!token) {
            return showMessage(
                'Для добавления / удаления слов необходимо авторизоваться',
                404
            )
        }
        const { text, code } = await dispatch(updateUserWord(body, token))
        showMessage(text, code)
    }

    return (
        <Paper className={classes.wordCard} onClick={handleAdditinalInfo}>
            <div className={classes.mainInfo}>
                <img
                    className={classes.cardImage}
                    src={`${originURL}/${word.image}`}
                    alt={word.word}
                    title={word.word}
                />

                <div className={classes.cardContent}>
                    <div className={classes.infoPanel}>
                        {word.deleted === true ? (
                            <button
                                data-name="deleted"
                                data-word-name={word.word}
                                id={word._id}
                                value={word.deleted}
                                className={classes.deleteButton}
                                onClick={updateWord}
                            >
                                Восстановить
                            </button>
                        ) : (
                            <React.Fragment>
                                {deleteWord && (
                                    <button
                                        data-name="deleted"
                                        data-word-name={word.word}
                                        id={word._id}
                                        value={word.deleted}
                                        onClick={updateWord}
                                        className={classes.iconWrap}
                                    >
                                        <DeleteIcon
                                            className={classes.bigCardIcon}
                                        />
                                    </button>
                                )}

                                {difficultWord && (
                                    <button
                                        data-name="difficult"
                                        data-word-name={word.word}
                                        id={word._id}
                                        value={word.difficult}
                                        onClick={updateWord}
                                        className={classes.iconWrap}
                                    >
                                        <GradeIcon
                                            style={{
                                                color: word.difficult
                                                    ? '#FFD700'
                                                    : 'inherit',
                                            }}
                                            className={classes.starIcon}
                                        />
                                    </button>
                                )}
                            </React.Fragment>
                        )}
                        <p className={classes.infoText}>
                            Правильно:&#160;
                            <span className={classes.correctText}>
                                {word.correct || 0}&#160;
                            </span>
                        </p>
                        <p className={classes.infoText}>
                            Ошибочно:&#160;
                            <span className={classes.failText}>
                                {word.fail || 0}
                            </span>
                        </p>
                    </div>

                    <div className={classes.cardUnitWrap}>
                        <div className={classes.cardUnitPlayWrap}>
                            <button
                                className={classes.iconWrap}
                                value={word.audio}
                                onClick={play}
                            >
                                <PlayCircleFilledIcon
                                    className={classes.bigCardIcon}
                                />
                            </button>
                            <p
                                className={classes.wordText}
                            >{`${word.word} `}</p>
                            <p
                                style={{ fontFamily: 'roboto' }}
                                className={classes.wordText}
                            >
                                {word.transcription}
                            </p>
                        </div>
                        {translateWord && (
                            <p
                                className={classes.wordText}
                            >{` \u2014 ${word.wordTranslate}`}</p>
                        )}
                    </div>
                </div>
            </div>
            {additionalInfo && (
                <div className={classes.additionalInfo}>
                    <div className={classes.cardContent}>
                        <div className={classes.cardUnitWrap}>
                            <div className={classes.cardUnitPlayWrap}>
                                <button
                                    className={classes.iconWrap}
                                    value={word.audioMeaning}
                                    onClick={play}
                                >
                                    <PlayCircleFilledIcon
                                        className={classes.littleCardIcon}
                                    />
                                </button>
                                <p className={classes.englishText}>
                                    {convertText(word.textMeaning)}
                                </p>
                            </div>
                        </div>
                        {translateSentences && (
                            <p className={classes.translateText}>
                                {word.textMeaningTranslate}
                            </p>
                        )}
                    </div>

                    <div className={classes.cardContent}>
                        <div className={classes.cardUnitWrap}>
                            <div className={classes.cardUnitPlayWrap}>
                                <button
                                    className={classes.iconWrap}
                                    value={word.audioExample}
                                    onClick={play}
                                >
                                    <PlayCircleFilledIcon
                                        className={classes.littleCardIcon}
                                    />
                                </button>
                                <p className={classes.englishText}>
                                    {convertText(word.textExample)}
                                </p>
                            </div>
                        </div>
                        {translateSentences && (
                            <p className={classes.translateText}>
                                {word.textExampleTranslate}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </Paper>
    )
}
