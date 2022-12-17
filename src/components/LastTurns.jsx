import { useState } from "react";
import "./LastTurns.css";

export const LastTurns = ({ hideLastRuns }) => {
  const [turnWPM, setTurnWPM] = useState(
    JSON.parse(localStorage.getItem("WPM"))
  );
  const [turnChars, setTurnChars] = useState(
    JSON.parse(localStorage.getItem("keyStrokes"))
  );
  const [turnTimes, setTurnTimes] = useState(
    JSON.parse(localStorage.getItem("time"))
  );

  let modalContent;

  if (!turnWPM || !turnChars || !turnTimes) {
    modalContent = <p className="no-turn">No turns in the record</p>;
  } else {
    modalContent = (
      <>
        <div className="table-columns">
          <span className="header">Net WPM</span>
          {turnWPM.slice(-5).map((turn, turnID) => (
            <span key={turnID}>{turn}</span>
          ))}
        </div>
        <div className="table-columns">
          <span className="header">Time</span>
          {turnTimes.slice(-5).map((turnTime, timeID) => (
            <span key={timeID}>00:{turnTime}</span>
          ))}
        </div>
        <div className="table-columns">
          <span className="header">Total Chars</span>
          {turnChars.slice(-5).map((turnChar, charsID) => (
            <span key={charsID}>{turnChar}</span>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div onClick={hideLastRuns} className="backdrop"></div>
      <div className="runs-modal">{modalContent}</div>
    </>
  );
};
