const isReaction = (input, a, b) => {
  if (a < 0) return false;
  if (b > input.length) return false;

  const charCode = input.charCodeAt(a);
  const nextCharCode = input.charCodeAt(b);

  if (charCode >= 65 && charCode <= 90 && nextCharCode === charCode + 32) return true;
  if (charCode >= 97 && charCode <= 122 && nextCharCode === charCode - 32) return true;
  return false;
};

const reduce = polymer => {
  let reducedPolymer = polymer;
  for (let i = 0; i < reducedPolymer.length; i += 1) {
    if (isReaction(reducedPolymer, i, i + 1)) {
      reducedPolymer = reducedPolymer.substring(0, i) + reducedPolymer.substring(i + 2);
      i -= 2;
    }
  }
  return reducedPolymer;
};

module.exports.challenge1 = input => reduce(input);
module.exports.challenge2 = input => {
  let min = Infinity;

  for (let i = 97; i <= 122; i += 1) {
    const newInput = input.replace(new RegExp(String.fromCharCode(i), 'gi'), '');
    min = Math.min(reduce(newInput).length, min);
  }

  return min;
};
