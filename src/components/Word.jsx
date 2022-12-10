import { useRef, useEffect } from "react";
export const Word = ({
  word,
  wordClass,
  wordID,
  wordCount,
  checkWordColor,
}) => {
  const scrollToWord = useRef(null);
  const scrollIntoWord = () => {
    scrollToWord.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const backgroundColor = scrollToWord.current.style.backgroundColor;
    if (backgroundColor === "rgba(254, 111, 39, 0.416)") {
      scrollIntoWord();
    }
  });

  return (
    <span
      ref={scrollToWord}
      onClick={(event) => console.log(event.target.getBoundingClientRect())}
      className={wordClass}
      style={{
        color: checkWordColor(word),
        backgroundColor:
          wordID === wordCount ? "rgba(254, 111, 39, 0.416)" : "",
        transition: "all 500ms",
      }}
    >
      {word.text}
    </span>
  );
};
