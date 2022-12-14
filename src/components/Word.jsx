import { useRef, useEffect } from "react";
import { checkWordColor } from "../utils/checkWordColor";
import "./Word.css";

export const Word = ({ word, wordID, wordCount, typerInput }) => {
  const scrollToWord = useRef(null);
  const scrollIntoWord = () => {
    scrollToWord.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const backgroundColor = scrollToWord.current.style.backgroundColor;
    if (backgroundColor === "rgba(0, 0, 0, 0.01)") {
      scrollIntoWord();
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
            background:
              wordID === wordCount && typerInput.length === letterID
                ? "#fee71590"
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
