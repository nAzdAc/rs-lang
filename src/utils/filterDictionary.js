export default function filterDictionary (activeLevel ,userWords, activeWordButton) {
  let sectionArr = [];
  let levelArr = [];
  if (activeLevel === null) {
    if (activeWordButton === 0) {
      sectionArr = userWords.filter((item) => !item.deleted);
    } else if (activeWordButton === 1) {
      sectionArr = userWords.filter(
        (item) => item.difficult && !item.deleted
      );
    } else if (activeWordButton === 2) {
      sectionArr = userWords.filter((item) => item.deleted);
    }
    levelArr = sectionArr;
  } else {
    if (activeWordButton === 0) {
      sectionArr = userWords.filter((item) => !item.deleted);
    } else if (activeWordButton === 1) {
      sectionArr = userWords.filter((item) => item.difficult);
    } else if (activeWordButton === 2) {
      sectionArr = userWords.filter((item) => item.deleted);
    }
    levelArr = sectionArr.filter((item) => item.group === activeLevel);
  }
  return levelArr
}