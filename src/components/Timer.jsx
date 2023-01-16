import { useState, useRef, useEffect } from "react";
import { getLocalStorage } from "../utils/getLocalStorage";

export const Timer = ({
  isGameStarted,
  timerReset,
  timerClass,
  calculateWPM,
  keyStrokes,
  isGameOver,
  wrongLetters,
}) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [WPM, setWPM] = useState(0);
  const timerInterval = useRef(null);
  const isBiggerThanNine = seconds > 9 ? null : 0;

  const newTimer = () => {
    clearInterval(timerInterval.current);
    timerInterval.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
      if (seconds >= 59) {
        setSeconds(0);
        setMinutes(minutes + 1);
      }
    }, 1000);
  };

  const resetTimer = () => {
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerInterval.current);
  };

  const newWPM = () => {
    if (seconds === 0) {
      return calculateWPM(keyStrokes, 1, wrongLetters);
    } else {
      return calculateWPM(keyStrokes, seconds, wrongLetters);
    }
  };

  useEffect(() => {
    const getWPM = newWPM();
    setWPM(getWPM);
  }, [seconds]);

  useEffect(() => {
    if (isGameStarted) {
      newTimer();
    }
    if (isGameOver) {
      localStorage.setItem(
        "characters",
        JSON.stringify(
          JSON.parse(localStorage.getItem("characters") || "[]").concat([
            { keyStrokes, wrongLetters },
          ])
        )
      );
      getLocalStorage("time", seconds);
      getLocalStorage("WPM", WPM);
      clearInterval(timerInterval.current);
    }
    if (timerReset) {
      resetTimer();
    }
  }, [isGameOver, isGameStarted, timerReset]);

  return (
    <p className={timerClass}>
      {WPM < 0 ? <span>0 WPM</span> : <span>{WPM} WPM</span>}
      <span style={{ marginLeft: "30px" }} className="minutes">
        0{minutes}
      </span>
      :
      <span className="seconds">
        {isBiggerThanNine}
        {seconds}
      </span>
    </p>
  );
};
