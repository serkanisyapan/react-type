export const checkLetterColor = (input, wordCount, word, letterID, wordID) => {
  let typerInput = input.split("");
  if (wordID === wordCount) {
    if (typerInput[letterID] === word.text[letterID]) {
      return "#38e54d";
    }
  }
};
