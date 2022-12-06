export const CountTable = ({ words, tableClass }) => {
  const correctWords = words.filter((word) => word.isCorrect === true).length;
  const wrongWords = words.filter((word) => word.isCorrect === false).length;
  return (
    <span className={tableClass}>
      <span style={{ color: "#38E54D" }}>{correctWords}</span>|
      <span style={{ color: "#D2001A" }}>{wrongWords}</span>
    </span>
  );
};
