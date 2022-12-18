import { useRef, useEffect } from "react";
import { checkWordColor } from "../utils/checkWordColor";
import { checkLetterColor } from "../utils/checkLetterColor";
import "./Word.css";

export const Word = ({ word, wordID, wordCount, wordHighlighter }) => {
  const scrollToWord = useRef(null);

  useEffect(() => {
    const backgroundColor = scrollToWord.current.style.backgroundColor;
    if (backgroundColor === "rgba(0, 0, 0, 0.01)") {
      scrollToWord.current.scrollIntoView({
        behavior: "smooth",
      });
      let { top, left, width, height } =
        scrollToWord.current.getBoundingClientRect();
      wordHighlighter(top, left, width, height);
    }
  }, [wordCount, word]);

  return (
    <span
      ref={scrollToWord}
      className="words"
      style={{
        color: checkWordColor(word),
        backgroundColor: wordID === wordCount ? "rgba(0, 0, 0, 0.01)" : "",
      }}
    >
      {word.text}
    </span>
  );
};
