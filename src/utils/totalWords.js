import { data } from '../const/everyDayChart';

const totalWords = data;

export function totalWordsCount() {
  totalWords.reduce(function (acc, value, i) {
    if (i === 0) {
      acc.push({
        name: value.name,
        words: value.words,
      });
    } else if (i > 0) {
      console.log(i);
      acc.push({
        name: value.name,
        words: value.words + acc[i - 1].words,
      });
    }

    console.log(acc);
    return acc;
  }, []);
}
