module.exports.challenge1 = input => {
  let number2 = 0;
  let number3 = 0;

  input.forEach(id => {
    const letters = {};
    id.split('').forEach(letter => (letters[letter] = (letters[letter] || 0) + 1));

    let found2;
    let found3;
    for (const [, v] of Object.entries(letters)) {
      if (v === 2 && !found2) {
        number2 += 1;
        found2 = true;
      }
      if (v === 3 && !found3) {
        number3 += 1;
        found3 = true;
      }
      if (found2 && found3) return;
    }
  });

  return number2 * number3;
};

module.exports.challenge2 = boxes => {
  for (let i = 0; i < boxes.length; i += 1) {
    const box = boxes[i];

    for (let h = i + 1; h < boxes.length; h += 1) {
      const candidateBox = boxes[h];

      let differences = 0;
      for (let j = 0; j < box.length; j += 1) {
        if (box[j] !== candidateBox[j]) {
          differences += 1;
        }
      }
      if (differences === 1) {
        let common = '';
        for (let j = 0; j < box.length; j += 1) {
          if (box[j] === candidateBox[j]) {
            common += box[j];
          }
        }
        return common;
      }
    }
  }
  return null;
};
