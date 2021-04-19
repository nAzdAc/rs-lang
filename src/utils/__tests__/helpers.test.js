import { parsedStats, getRandomInt } from '../helpers';

describe('helpers', () => {
  it('parsedStats returns a valid object', () => {
    const gameName = '';
    const correctArr = [{}, {}, {}];
    const failArr = [{}, {}];
    const seriesArr = [{}];

    const result = {
      gameName,
      totalWords: correctArr.length + failArr.length,
      correctPercent: Math.round(100 * correctArr.length / (correctArr.length + failArr.length)),
      longestSeries: Math.max.apply(null, seriesArr),
      date: new Date().toLocaleDateString()
    }
    expect(parsedStats(gameName, correctArr, failArr, seriesArr)).toStrictEqual(result);
  });

  it('getRandomInt returns 2 or greater', () => {
    expect(getRandomInt(2, 7)).toBeGreaterThanOrEqual(2);
  });

  it('getRandomInt returns number less then 7', () => {
    expect(getRandomInt(2, 7)).toBeLessThan(7);
  });
});
