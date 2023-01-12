import { useState } from "react";
import "./LastTurns.css";

export const LastTurns = ({ showLastRuns }) => {
  const turnWPM = JSON.parse(localStorage.getItem("WPM"));
  const turnChars = JSON.parse(localStorage.getItem("characters"));
  const turnTimes = JSON.parse(localStorage.getItem("time"));

  const deleteLocalStorage = () => {
    localStorage.removeItem("characters");
    localStorage.removeItem("time");
    localStorage.removeItem("WPM");
    showLastRuns();
  };

  let modalContent;

  if (!turnWPM || !turnChars || !turnTimes) {
    modalContent = <p className="no-turn">No turns in the record</p>;
  } else {
    modalContent = (
      <div className="main-modal">
        <div className="table">
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
              <span key={charsID}>
                <span>{turnChar.keyStrokes}</span>/
                <span style={{ color: "#D2001a" }}>
                  {turnChar.wrongLetters}
                </span>
              </span>
            ))}
          </div>
        </div>
        <span onClick={deleteLocalStorage} className="delete-turns">
          Delete Runs
        </span>
      </div>
    );
  }

  return (
    <>
      <div onClick={showLastRuns} className="backdrop"></div>
      <div className="runs-modal">{modalContent}</div>
    </>
  );
};
