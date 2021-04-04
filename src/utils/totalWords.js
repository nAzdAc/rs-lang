export function totalWordsCount(data) {
  const amount = data.reduce(function (acc, value, i) {
    if (i === 0) {
      acc.push({
        name: value.name,
        words: value.words,
      });
    } else if (i > 0) {
      acc.push({
        name: value.name,
        words: value.words + acc[i - 1].words,
      });
    }
    // console.log(acc);
    return acc;
  }, []);
  return amount;
}
