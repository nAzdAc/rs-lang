import { totalWordsCount } from '../totalWords';

describe('totalWordsCount', () => {
  it('totalWordsCount returns a valid array', () => {
    const data = [{name: '', words: 20}, {name: '', words: 20}];
    expect(totalWordsCount(data)).toStrictEqual([{name: '', words: 20}, {name: '', words: 40}]);
  });
});
