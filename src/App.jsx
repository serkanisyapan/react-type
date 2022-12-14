import { useState, useEffect, useRef } from "react";
import { allWords } from "./words.js";
import { pickRandomWords } from "./utils/pickRandomWords.js";
import { calculateWPM } from "./utils/calculateWPM.js";
import { Word } from "./components/Word.jsx";
import { Timer } from "./components/Timer.jsx";
import { LastTurns } from "./components/LastTurns.jsx";
import newTurnLogo from "./assets/new-turn-button.svg";
import "./App.css";

export const App = () => {
  const [words, setWords] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [keyStrokes, setKeyStrokes] = useState(0);
  const [gameType, setGameType] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [showTable, setShowTable] = useState(false);
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
    if (event.key === "Backspace") {
      if (keyStrokes === 0) return;
      setKeyStrokes(keyStrokes - 1);
    } else {
      setKeyStrokes(keyStrokes + 1);
    }
  };

  const handleOnChange = (event) => {
    setUserInput(event.target.value);
    setIsGameStarted(true);
    setResetTimer(false);
  };

  const typedWordCount = `${wordCount}/${words.length}`;

  const newTurn = () => {
    setWordCount(0);
    setUserInput("");
    setIsGameOver(false);
    setResetTimer(true);
    setKeyStrokes(0);
    setWords(pickRandomWords(allWords, gameType));
    focusRef.current.focus();
  };

  const handleGameType = (number) => {
    setWords(pickRandomWords(allWords, number));
    newTurn();
  };

  const showLastRuns = () => {
    setShowTable(true);
  };
  const hideLastRuns = () => setShowTable(false);

  // on page load creates new run
  useEffect(() => {
    setWords(pickRandomWords(allWords, gameType));
    focusRef.current.focus();
  }, []);

  // checks if game is over when user types a word
  useEffect(() => {
    if (wordCount === gameType) {
      setIsGameStarted(false);
      setIsGameOver(true);
    }
  }, [wordCount]);

  // creates a new run when user changes game type
  useEffect(() => {
    handleGameType(gameType);
  }, [gameType]);

  return (
    <>
      <div className="type-container">
        <div className="scores">
          <span className="word-count-board">{typedWordCount}</span>
          <span className="gametype">
            <span
              onClick={() => setGameType(30)}
              style={{ color: gameType === 30 ? "#fee7158a" : "" }}
            >
              30
            </span>
            |
            <span
              onClick={() => setGameType(50)}
              style={{ color: gameType === 50 ? "#fee7158a" : "" }}
            >
              50
            </span>
          </span>
          {showTable && <LastTurns hideLastRuns={hideLastRuns} />}

          <p onClick={showLastRuns} className="lastrun-text">
            Show Last Runs
          </p>
        </div>
        <div className="word-container">
          {words.map((word, wordID) => (
            <Word
              key={wordID}
              word={word}
              wordID={wordID}
              wordCount={wordCount}
              typerInput={userInput}
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
            disabled={isGameOver ? true : false}
          />
          <Timer
            timerClass="timer"
            isGameStarted={isGameStarted}
            timerReset={resetTimer}
            calculateWPM={calculateWPM}
            keyStrokes={keyStrokes}
            isGameOver={isGameOver}
          />
        </div>
        <button onClick={newTurn} className="refresh-button">
          <img src={newTurnLogo} alt="new turn button" />
        </button>
      </div>
    </>
  );
};
