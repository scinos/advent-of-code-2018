module.exports = {
  challenge1: input => input.reduce((freq, change) => freq + Number(change), 0),

  challenge2: changes => {
    let counter = 0;
    const frequencies = {
      0: 1,
    };
    let frequency = 0;

    while (true) {
      const change = Number(changes[counter]);
      frequency += change;
      frequencies[frequency] = (frequencies[frequency] || 0) + 1;
      if (frequencies[frequency] === 2) {
        return frequency;
      }

      if (counter === changes.length - 1) counter = 0;
      else counter += 1;
    }
  },
};
