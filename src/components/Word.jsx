export const Word = ({
  word,
  wordClass,
  wordID,
  wordCount,
  checkWordColor,
}) => {
  return (
    <span
      onClick={(event) => console.log(event.target.getBoundingClientRect())}
      className={wordClass}
      style={{
        color: checkWordColor(word),
        backgroundColor: wordID === wordCount ? "#fe6f276a" : "",
        transition: "all 500ms",
      }}
    >
      {word.text}
    </span>
  );
};
