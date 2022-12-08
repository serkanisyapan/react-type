import { useState, useRef, useEffect } from "react";

export const Timer = ({
  isGameStarted,
  timerReset,
  timerClass,
  calculateWPM,
  keyStrokes,
  isGameOver,
}) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
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

  const WPM = () => {
    if (seconds === 0) {
      return calculateWPM(keyStrokes, 1);
    } else {
      return calculateWPM(keyStrokes, seconds);
    }
  };

  useEffect(() => {
    if (isGameStarted) {
      newTimer();
    }
    if (isGameOver) {
      clearInterval(timerInterval.current);
    }
    if (timerReset) {
      resetTimer();
    }
  }, [seconds, isGameStarted, timerReset]);

  return (
    <p className={timerClass}>
      <span>{WPM()} WPM</span>
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
