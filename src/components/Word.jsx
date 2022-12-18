import { useRef, useEffect } from "react";
import { checkWordColor } from "../utils/checkWordColor";
import { checkLetterColor } from "../utils/checkLetterColor";
import "./Word.css";

export const Word = ({ word, wordID, wordCount, typerInput }) => {
  const scrollToWord = useRef(null);

  useEffect(() => {
    const backgroundColor = scrollToWord.current.style.backgroundColor;
    if (backgroundColor === "rgba(0, 0, 0, 0.01)") {
      scrollToWord.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <span
      ref={scrollToWord}
      className="words"
      style={{
        color: checkWordColor(word),
        backgroundColor: wordID === wordCount ? "rgba(0, 0, 0, 0.01)" : "",
      }}
    >
      {word.text.split("").map((letter, letterID) => (
        <span
          className="letters"
          style={{
            color: checkLetterColor(
              typerInput,
              wordCount,
              word,
              letterID,
              wordID
            ),
            backgroundColor:
              wordID === wordCount && typerInput.length === letterID
                ? "rgba(254, 231, 21, 0.565)"
                : "",
          }}
          key={letterID}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};
