import { useState, useEffect, useRef } from "react";
import { allWords } from "./words.js";
import { pickRandom30Words } from "./utils/pickRandom30Words.js";
import { checkWordColor } from "./utils/checkWordColor.js";
import { Word } from "./Word.jsx";
import refreshImage from "./assets/refresh-image.png";
import "./App.css";

export const App = () => {
  const [words, setWords] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [showRestartTurn, setShowRestartTurn] = useState(false);
  const focusRef = useRef(null);

  const checkIsWordCorrect = (input, array, count) => {
    if (input === array[count].text) {
      const changedWords = array.map((item, itemID) => {
        if (count === itemID) {
          return { ...item, isCorrect: true };
        }
        return item;
      });
      setWords(changedWords);
    } else {
      const changedWords = array.map((item, itemID) => {
        if (count === itemID) {
          return { ...item, isCorrect: false };
        }
        return item;
      });
      setWords(changedWords);
    }
    setWordCount(wordCount + 1);
    setUserInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === " " && userInput.trim().length > 0) {
      event.preventDefault();
      checkIsWordCorrect(userInput, words, wordCount);
    }
  };
  const handleOnChange = (event) => {
    setUserInput(event.target.value);
  };

  const typedWordCount = `${wordCount}/${words.length}`;
  const correctWords = words.filter((word) => word.isCorrect === true).length;
  const wrongWords = words.filter((word) => word.isCorrect === false).length;

  const refreshTurn = () => {
    setWordCount(0);
    setUserInput("");
    setWords(pickRandom30Words(allWords));
    focusRef.current.focus();
  };

  useEffect(() => {
    setWords(pickRandom30Words(allWords));
    focusRef.current.focus();
  }, [allWords]);

  return (
    <div className="type-container">
      <span className="word-count-board">{typedWordCount}</span>
      <div className="word-container">
        {words.map((word, wordID) => (
          <Word
            word={word}
            wordClass="words"
            wordID={wordID}
            wordCount={wordCount}
            checkWordColor={checkWordColor}
          />
        ))}
      </div>
      <div className="input-container">
        <input
          ref={focusRef}
          className="word-input"
          value={userInput}
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
        />
        <div className="correct-wrong">
          <span style={{ color: "#38E54D" }}>{correctWords}</span>
          <span style={{ color: "white" }}>|</span>
          <span style={{ color: "#D2001A" }}>{wrongWords}</span>
        </div>
      </div>
      <button
        onMouseOver={() => setShowRestartTurn(true)}
        onMouseOut={() => setShowRestartTurn(false)}
        onClick={refreshTurn}
        className="refresh-button"
      >
        <img src={refreshImage} alt="new turn button" />
      </button>
      {showRestartTurn && <div className="restart-text">Restart Turn</div>}
    </div>
  );
};
