import { showTitle } from '../../utils/showTitle'

describe('function should return correct string', () => {
    it('showTitle without lifes', () => {
        const fails = 5
        const correct = 2
        const lifes = 0
        expect(showTitle(fails, correct, lifes)).toEqual(
            'Тебе удалось потерять все жизни. Это мало кому удаётся. Молодец! :)'
        )
    })

    it('showTitle without any answers', () => {
        const fails = 0
        const correct = 0
        const lifes = 5
        expect(showTitle(fails, correct, lifes)).toEqual(
            'Ты не сделал ни единого ответа. Мы не будем добавлять результаты этой игры в твою статистику :)'
        )
    })

    it('showTitle with fails = 1', () => {
        const fails = 1
        const correct = 2
        const lifes = 1
        expect(showTitle(fails, correct, lifes)).toEqual('Отличный результат!')
    })

    it('showTitle fails = 3', () => {
        const fails = 3
        const correct = 2
        const lifes = 1
        expect(showTitle(fails, correct, lifes)).toEqual('Очень хорошо')
    })

    it('showTitle fails = 5', () => {
        const fails = 5
        const correct = 2
        const lifes = 1
        expect(showTitle(fails, correct, lifes)).toEqual('Ты можешь лучше!)')
    })

    it('showTitle fails = 7', () => {
        const fails = 7
        const correct = 2
        const lifes = 1
        expect(showTitle(fails, correct, lifes)).toEqual(
            'Давай повтори слова из этого раздела и возвращайся :)'
        )
    })

    it('showTitle fails = 9', () => {
        const fails = 9
        const correct = 2
        const lifes = 1
        expect(showTitle(fails, correct, lifes)).toEqual(
            'Ты расстроил своего школьного учителя :('
        )
    })
})
