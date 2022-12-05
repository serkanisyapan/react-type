import { useState, useEffect, useRef } from "react";
import { allWords } from "./words.js";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const focusRef = useRef(null);

  const handleKeyDown = ({ key }) => {
    if (key === " " && userInput.trim().length > 0) {
      if (userInput.trim() === words[wordCount].text) {
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

  useEffect(() => {
    setWords(pickRandom30Words(allWords));
    focusRef.current.focus();
  }, [allWords]);

  return (
    <div className="type-container">
      <div className="word-container">
        {words.map((word, wordID) => (
          <span
            className="words"
            style={{
              color: checkColor(word),
            }}
            key={wordID}
          >
            {word.text}
          </span>
        ))}
      </div>
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
        onChange={(event) => setUserInput(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button>Refresh</button>
    </div>
  );
}

export default App;
