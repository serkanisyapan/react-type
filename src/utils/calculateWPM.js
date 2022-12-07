export const calculateWPM = (keyStrokes, time) => {
  const WPM = Math.floor((keyStrokes / 5) * (60 / time));
  return WPM;
};
