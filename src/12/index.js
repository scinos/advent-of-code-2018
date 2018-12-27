const parseRules = rules => {
  const binaryRules = Array.from({ length: 32 }, () => 0);
  rules.forEach(rule => {
    const [, pattern, result] = rule.match(/^([.#]{5}) => ([.#])/);
    const binaryPattern = parseInt(pattern.replace(/#/g, '1').replace(/\./g, '0'), 2);
    const binaryResult = result === '#' ? 1 : 0;
    binaryRules[binaryPattern] = binaryResult;
  });
  return binaryRules;
};

const buildUniverse = state => {
  // Make the universe twice as big
  const universe = Array.from({ length: state.length * 2 }, () => 0);
  // Try to align to the center
  const origin = Math.floor(universe.length / 2 - state.length / 2);
  // Copy the old universe
  for (let i = 0; i < state.length; i += 1) {
    universe[origin + i] = Number(state[i]);
  }
  return { universe, origin };
};

const challenge = ({ state, rules, maxGen }) => {
  const binaryRules = parseRules(rules);
  let { universe, origin } = buildUniverse(state.replace(/#/g, '1').replace(/\./g, '0'));
  let gen = 0;

  // The universe already contains the generation #0. Evolve to the next generation.
  while (gen < maxGen) {
    gen += 1;

    const firstPot = universe.indexOf(1);
    const lastPot = universe.lastIndexOf(1);
    const newUniverse = Array.from(universe);
    // We only need to process from two pots before the first pot with a plant, until two more pots
    // after the last pot with plant.
    for (let i = firstPot - 2; i <= lastPot + 2; i += 1) {
      const ruleNumber = parseInt(universe.slice(i - 2, i - 2 + 5).join(''), 2);
      const result = binaryRules[ruleNumber];
      newUniverse[i] = result;
    }

    // To optimize this algorithm, we check if the new pattern is equal to the old pattern (maybe
    // with an offset)
    const newFirstPot = newUniverse.indexOf(1);
    const newLastPot = newUniverse.lastIndexOf(1);
    const newPattern = newUniverse.slice(newFirstPot, newLastPot + 1).join('');
    const oldPattern = universe.slice(firstPot, lastPot + 1).join('');

    if (newPattern === oldPattern) {
      // The pattern repeat. We don't need to simulate the rest of the iterations, we can compute
      // the end result. If the pattern doesn't move (ofssetPerGen=0) the final result is just the
      // result of this generation. If the patterns moves, for example, 1 cell to the right every
      // generation (offsetPerGen=1), then we compute how much will it move until the end, and add
      // that number to each pot number.

      // Number of generations left
      const gensLeft = maxGen - gen;

      // Change in each generation
      const offsetPerGen = newFirstPot - firstPot;

      return (
        newUniverse
          // Replace each pot with a plant by the adjusted pot number.
          .map((pot, idx) => (pot === 1 ? idx - origin + offsetPerGen * gensLeft : 0))
          .reduce((a, b) => a + b)
      );
    }

    // If the empty space at the left/right of the pattern is less than 5 pots, there is no room
    // in this universe and we need a new one.
    if (newFirstPot < 5 || newLastPot > universe.length - 5) {
      // We might need to adjust the origin of the new universe. First, compute what is the difference
      // between the origin of the universe and the leftmost pot. Remember, the population of plants
      // can grow to the left, so firstPot could be less than origin.
      const originOffset = newFirstPot - origin;

      // Create a copy of this universe
      ({ universe, origin } = buildUniverse(
        newUniverse.slice(newFirstPot, newLastPot + 1).join(''),
      ));

      // Adjust the origin
      origin -= originOffset;
    } else {
      // We still have room, just switch to the new universe computed in this generation
      universe = newUniverse;
    }
  }

  // After all generations, we can compute the result. Replace each pot with a plant by the
  // number of that pot (corrected with the universe's origin) and sum them.
  return universe.map((pot, idx) => (pot === 1 ? idx - origin : 0)).reduce((a, b) => a + b);
};

module.exports = {
  challenge,
};
