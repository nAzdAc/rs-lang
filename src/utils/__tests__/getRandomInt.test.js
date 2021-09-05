import { getRandomInt } from '../helpers'

describe('helpers', () => {
    it('getRandomInt returns 2 or greater', () => {
        expect(getRandomInt(2, 7)).toBeGreaterThanOrEqual(2)
    })

    it('getRandomInt returns number less then 7', () => {
        expect(getRandomInt(2, 7)).toBeLessThan(7)
    })
})
