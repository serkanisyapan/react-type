import { useState } from "react";
import "./App.css";

function App() {
  const [words, setWords] = useState([
    "behind",
    "go",
    "get",
    "done",
    "finish",
    "relate",
    "family",
    "refresh",
    "run",
    "solid",
  ]);
  const [value, setValue] = useState("");

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        {words.map((word, wordID) => (
          <span style={{ fontSize: "24px", marginLeft: "10px" }} key={wordID}>
            {word}
          </span>
        ))}
      </div>
      <input
        style={{ width: "250px", height: "40px", fontSize: "20px" }}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </>
  );
}

export default App;
