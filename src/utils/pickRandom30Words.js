export const pickRandom30Words = (array) => {
  let randomWords = [];
  for (let i = 0; i < 10; i++) {
    let pickWord = array[Math.floor(Math.random() * array.length)];
    randomWords.push(pickWord);
  }
  return randomWords;
};
