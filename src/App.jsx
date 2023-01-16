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
  const [wrongLetters, setWrongLetters] = useState(0);
  const [highlighter, setHighlighter] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const focusRef = useRef(null);
  const scrollRef = useRef(null);

  const checkIsWordCorrect = (input, array, count) => {
    const changedWords = array.map((item, itemID) => {
      if (count === itemID) {
        if (input === array[count].text) {
          return { ...item, isCorrect: true };
        } else {
          return { ...item, isCorrect: false };
        }
      }
      return item;
    });
    setWords(changedWords);
    setWordCount((prev) => prev + 1);
    setUserInput("");
  };

  const highlighterPosition = (top, left, width, height, scrollY) => {
    setHighlighter({ top, left, width, height, scrollY });
  };

  const checkIsLettersCorrect = (input, array, count) => {
    let typedValue = input.slice("");
    let typedWord = array[count].text.slice("");
    for (let i = 0; i < typedWord.length; i++) {
      if (typedValue[i] && typedValue[i] !== typedWord[i]) {
        setWrongLetters((prev) => prev + 1);
      }
    }
    if (typedValue.length > typedWord.length) {
      let extraWords = typedValue.slice(typedWord.length).length;
      setKeyStrokes((prev) => prev - extraWords);
    }
  };

  const handleKeyDown = (event) => {
    if (
      event.keyCode === 32 ||
      event.key === " " ||
      (event.code === "Space" && userInput.trim().length > 0)
    ) {
      event.preventDefault();
      checkIsWordCorrect(userInput, words, wordCount);
      checkIsLettersCorrect(userInput, words, wordCount);
    }

    if (event.key === "Backspace") {
      if (keyStrokes === 0) return;
      setKeyStrokes((prev) => prev - 1);
    } else {
      setKeyStrokes((prev) => prev + 1);
    }
  };

  // when typer starts typing timer starts
  const handleOnChange = (event) => {
    setUserInput(event.target.value);
    setIsGameStarted(true);
    setResetTimer(false);
  };

  // keeps track of how many word typed
  const typedWordCount = `${wordCount}/${words.length}`;

  // sets everything back to initial load
  const newTurn = () => {
    setWordCount(0);
    setUserInput("");
    setIsGameOver(false);
    setResetTimer(true);
    setKeyStrokes(0);
    setWrongLetters(0);
    setWords(pickRandomWords(allWords, gameType));
    focusRef.current.focus();
  };

  const handleGameType = (number) => {
    setWords(pickRandomWords(allWords, number));
    newTurn();
  };

  const showLastRuns = () => {
    setShowTable(!showTable);
  };

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
          {showTable && <LastTurns showLastRuns={showLastRuns} />}

          <p onClick={showLastRuns} className="lastrun-text">
            Show Last Runs
          </p>
        </div>
        <div ref={scrollRef} className="word-container">
          <div
            style={{
              top: highlighter.top + "px",
              left: highlighter.left + "px",
              height: highlighter.height + "px",
              width: highlighter.width + "px",
              position: "absolute",
              backgroundColor:
                wordCount === gameType ? "" : "rgba(255, 228, 23, 0.404)",
              transition: "all 0.2s ease-in-out",
            }}
          ></div>
          {words.map((word, wordID) => (
            <Word
              key={wordID}
              word={word}
              wordID={wordID}
              wordCount={wordCount}
              wordHighlighter={highlighterPosition}
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
            wrongLetters={wrongLetters}
          />
        </div>
        <button onClick={newTurn} className="refresh-button">
          <img src={newTurnLogo} alt="new turn button" />
        </button>
      </div>
    </>
  );
};
