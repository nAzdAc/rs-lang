import CardIcons from "./CardIcons";
import WordInfo from "./WordInfo";
import Answers from "./Answers";
import DictionaryDelete from "./DictionaryDelete";

export default function CreatePanel({
  panel,
  userWords,
  difficulty,
  wordId,
  wordAudio,
  wordAudioExample,
  WordAudioMeaning,
  userDifficultWords,
  userId,
  itemGroup,
  activeWordButton,
  token,
  fail,
  correct,
  clickDelete,
  setGoldStar,
  setBlackStar,
  clickRestore

}) {

  return panel === "BookPage" ? (
    <CardIcons
      userWords={userWords ? userWords : []}
      difficulty={difficulty}
      wordId={wordId}
      audioWord={wordAudio}
      audioExample={wordAudioExample}
      audioMeaning={WordAudioMeaning}
      userDifficultWords={userDifficultWords}
      clickDelete={clickDelete}
      setGoldStar={setGoldStar}
      setBlackStar={setBlackStar}
    />
  ) : panel === "DictionaryDifficult" ? (
    <WordInfo
      difficulty={difficulty}
      wordId={wordId}
      userId={userId}
      group={itemGroup}
      activeWordButton={activeWordButton}
      token={token}
      icons={
        <CardIcons
          userWords={userWords ? userWords : []}
          difficulty={difficulty}
          wordId={wordId}
          audioWord={wordAudio}
          audioExample={wordAudioExample}
          audioMeaning={WordAudioMeaning}
          userDifficultWords={userDifficultWords}
          clickDelete={clickDelete}
          setGoldStar={setGoldStar}
          setBlackStar={setBlackStar}
        />
      }
    />
  ) : panel === "DictionaryLearning" ? (
    <>
      <CardIcons
        userWords={userWords ? userWords : []}
        difficulty={difficulty}
        wordId={wordId}
        audioWord={wordAudio}
        audioExample={wordAudioExample}
        audioMeaning={WordAudioMeaning}
        userDifficultWords={userDifficultWords}
        clickDelete={clickDelete}
        setGoldStar={setGoldStar}
        setBlackStar={setBlackStar}
      />
      <Answers
        fail={fail}
        correct={correct}
        wordId={wordId}
        userId={userId}
        token={token}
      />
    </>
  ) : panel === "DictionaryDelete" ? (
    <DictionaryDelete
      difficulty={difficulty}
      wordId={wordId}
      userId={userId}
      group={itemGroup}
      activeWordButton={activeWordButton}
      token={token}
      clickRestore={clickRestore}
    />
  ) : null;
}
