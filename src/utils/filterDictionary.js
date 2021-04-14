export default function filterDictionary (activeLevel ,userWords, activeWordButton, setData ) {
  console.log('folter')
  let sectionArr = [];
  let levelArr = [];
  if (activeLevel === null) {
    if (activeWordButton === 0) {
      console.log('activeWordButton === 0')
      sectionArr = userWords.filter((item) => !item.deleted);
    } else if (activeWordButton === 1) {
      console.log('activeWordButton === 1')
      sectionArr = userWords.filter(
        (item) => item.difficult && !item.deleted
      );
    } else if (activeWordButton === 2) {
      console.log('activeWordButton === 2')
      sectionArr = userWords.filter((item) => item.deleted);
    }
    levelArr = sectionArr;
    console.log(levelArr)
  } else {
    if (activeWordButton === 0) {
      sectionArr = userWords.filter((item) => !item.deleted);
    } else if (activeWordButton === 1) {
      sectionArr = userWords.filter(
        (item) => item.difficult
      );
    } else if (activeWordButton === 2) {
      sectionArr = userWords.filter((item) => item.deleted);
    }
    console.log(sectionArr)
    levelArr = sectionArr.filter(
      (item) => item.group === activeLevel
    );
  }
  setData(levelArr);
}