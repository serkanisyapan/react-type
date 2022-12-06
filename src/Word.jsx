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
        backgroundColor: wordID === wordCount ? "rgba(0, 0, 0, 0.274)" : "",
      }}
    >
      {word.text}
    </span>
  );
};
