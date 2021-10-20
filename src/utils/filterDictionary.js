export default function filterDictionary(
    userWords,
    activeLevel,
    activeSection
) {
    let sectionArr = []
    let levelArr = []
    if (activeSection === 0) {
        sectionArr = userWords.filter((item) => !item.deleted)
    } else if (activeSection === 1) {
        sectionArr = userWords.filter((item) => item.difficult && !item.deleted)
    } else if (activeSection === 2) {
        sectionArr = userWords.filter((item) => item.deleted)
    }
    if (activeLevel === null) {
        levelArr = sectionArr
    } else {
        levelArr = sectionArr.filter((item) => item.group === activeLevel)
    }
    return levelArr
}
