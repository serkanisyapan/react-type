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
      setSeconds(seconds + 1);
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
    setWPM(newWPM());
    if (isGameStarted) {
      newTimer();
    }
    if (isGameOver) {
      getLocalStorage("keyStrokes", keyStrokes);
      getLocalStorage("time", seconds);
      clearInterval(timerInterval.current);
      console.log(WPM);
    }
    if (timerReset) {
      if (WPM > 0) {
        getLocalStorage("WPM", WPM);
      }
      resetTimer();
      console.log(WPM);
    }
  }, [seconds, isGameStarted, timerReset]);

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
