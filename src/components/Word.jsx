export const Word = ({
  word,
  wordClass,
  wordID,
  wordCount,
  checkWordColor,
}) => {
  return (
    <span
      className={wordClass}
      style={{
        color: checkWordColor(word),
        backgroundColor: wordID === wordCount ? "#fe6f276a" : "",
      }}
    >
      {word.text}
    </span>
  );
};
