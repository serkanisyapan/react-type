import { useState, useEffect, useRef } from "react";
import { allWords } from "./words.js";
import refreshImage from "./assets/refresh-image.png";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [showRestartTurn, setShowRestartTurn] = useState(false);
  const focusRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === " " && userInput.trim().length > 0) {
      if (userInput.trim() === words[wordCount].text) {
        event.preventDefault();
        let changedWords = words.map((word, wordID) => {
          if (wordCount === wordID) {
            return { ...word, isCorrect: true };
          } else {
            return word;
          }
        });
        setWords(changedWords);
        setWordCount(wordCount + 1);
      } else {
        let changedWords = words.map((word, wordID) => {
          if (wordCount === wordID) {
            return { ...word, isCorrect: false };
          } else {
            return word;
          }
        });
        setWords(changedWords);
        setWordCount(wordCount + 1);
      }
      setUserInput("");
    }
  };

  const checkColor = (object) => {
    if (object.isCorrect === null) return "white";
    if (object.isCorrect) return "#38E54D";
    if (!object.isCorrect) return "#D2001A";
  };

  const pickRandom30Words = (array) => {
    let randomWords = [];
    for (let i = 0; i < 30; i++) {
      let pickWord = array[Math.floor(Math.random() * array.length)];
      randomWords.push(pickWord);
    }
    return randomWords;
  };

  const wordCountBoard = `${wordCount}/${words.length}`;
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
    console.log(correctWords);
    focusRef.current.focus();
  }, [allWords]);

  return (
    <div className="type-container">
      <span className="word-count-board">{wordCountBoard}</span>
      <div className="word-container">
        {words.map((word, wordID) => (
          <span
            className="words"
            style={{
              color: checkColor(word),
              backgroundColor:
                wordID === wordCount ? "rgba(0, 0, 0, 0.274)" : "",
            }}
            key={wordID}
          >
            {word.text}
          </span>
        ))}
      </div>
      <div className="input-container">
        <input
          ref={focusRef}
          className="word-input"
          style={{
            width: "250px",
            height: "40px",
            fontSize: "20px",
            alignSelf: "start",
          }}
          value={userInput}
          onKeyDown={handleKeyDown}
          onChange={(event) => setUserInput(event.target.value)}
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
}

export default App;
