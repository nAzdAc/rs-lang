import { useCallback } from 'react'
import { backRoutes } from '../utils/backRoutes'
import { getRandomInt } from '../utils/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { isBlock } from '../redux/actions'
import { useMessage } from './message.hook'

export const useGames = () => {
    const { level, activeWords } = useSelector((state) => state)
    const dispatch = useDispatch()
    const showMessage = useMessage()

    const getWords = useCallback(async () => {
        dispatch(isBlock(true))
        try {
            let playWords = []
            if (activeWords.length) {
                playWords = activeWords
            } else {
                let group
                if (level !== null) {
                    group = level
                } else {
                    group = getRandomInt(0, 6)
                }
                const page = getRandomInt(0, 30)
                const res = await fetch(backRoutes.getWordsPage(group, page), {
                    method: 'GET',
                    withCredentials: true,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                playWords = await res.json()
            }
            dispatch(isBlock(false))
            return playWords
        } catch (e) {
            console.log(e)
            console.log(e.message)
            dispatch(isBlock(false))
            return showMessage(
                'Возникла проблема с загрузкой слов для игры. Попробуйте ещё раз',
                404
            )
        }
    }, [dispatch, activeWords, level, showMessage])

    return { getWords }
}
