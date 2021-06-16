/**
 * adds space between capital letters
 * @param {string} position
 * @returns string
 */
export const getPosition = (position) => {
  for (let j = 1; j < position.length; j++) {
    const ch = position.charAt(j);
    if (ch >= "A" && ch <= "Z") {
      let spaced = position.slice(0, j) + " " + position.slice(j);
      return spaced;
    }
  }

  return position;
};

/**
 * turns number into string
 * @param {int} serial
 * @returns string
 */
export const choiceSerial = (serial) => {
  const numString = ["First", "Second", "Third", "Fourth", "Fifth"];
  return numString[serial];
};
