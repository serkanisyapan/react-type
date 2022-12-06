import { useState, useRef, useEffect } from "react";

export const Timer = ({ isGameStarted, timerReset, timerClass }) => {
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

  useEffect(() => {
    if (isGameStarted) {
      newTimer();
    }
    if (timerReset) {
      resetTimer();
    }
  }, [seconds, isGameStarted, timerReset]);

  return (
    <p className={timerClass}>
      <span className="minutes">0{minutes}</span>:
      <span className="seconds">
        {isBiggerThanNine}
        {seconds}
      </span>
    </p>
  );
};
