import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [words, setWords] = useState([
    { text: "behind", isCorrect: null },
    { text: "go", isCorrect: null },
    { text: "get", isCorrect: null },
    { text: "done", isCorrect: null },
    { text: "finish", isCorrect: null },
    { text: "relate", isCorrect: null },
    { text: "family", isCorrect: null },
    { text: "refresh", isCorrect: null },
    { text: "run", isCorrect: null },
    { text: "solid", isCorrect: null },
  ]);
  const [text, setText] = useState("");
  const [backspaceCount, setBackspaceCount] = useState(0);

  const handleKeyDown = ({ key }) => {
    if (key === " " && text.trim().length > 0) {
      if (text.trim() === words[backspaceCount].text) {
        let changedWords = words.map((word, wordID) => {
          if (backspaceCount === wordID) {
            return { ...word, isCorrect: true };
          } else {
            return word;
          }
        });
        setWords(changedWords);
        setBackspaceCount(backspaceCount + 1);
      } else {
        let changedWords = words.map((word, wordID) => {
          if (backspaceCount === wordID) {
            return { ...word, isCorrect: false };
          } else {
            return word;
          }
        });
        setWords(changedWords);
        setBackspaceCount(backspaceCount + 1);
      }
      setText("");
    }
  };

  const checkColor = (object) => {
    if (object.isCorrect === null) return "white";
    if (object.isCorrect) return "green";
    if (!object.isCorrect) return "red";
  };

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        {words.map((word, wordID) => (
          <span
            style={{
              fontSize: "24px",
              marginLeft: "10px",
              color: checkColor(word),
            }}
            key={wordID}
          >
            {word.text}
          </span>
        ))}
      </div>
      <input
        style={{ width: "250px", height: "40px", fontSize: "20px" }}
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
      />
    </>
  );
}

export default App;
