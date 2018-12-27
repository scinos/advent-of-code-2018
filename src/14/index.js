const makeNewRecipe = (firstElf, secondElf, recipes) => {
  const nextRecipe = recipes[firstElf] + recipes[secondElf];
  if (nextRecipe > 9) recipes.push(Math.trunc(nextRecipe / 10), nextRecipe % 10);
  else recipes.push(nextRecipe);
};

const moveElves = (firstElf, secondElf, recipes) => {
  const { length } = recipes;
  const newFirstElf = (firstElf + recipes[firstElf] + 1) % length;
  let newSecondElf = (secondElf + recipes[secondElf] + 1) % length;
  if (newFirstElf === newSecondElf) newSecondElf = (newSecondElf + 1) % length;
  return { firstElf: newFirstElf, secondElf: newSecondElf };
};

const challenge1 = input => {
  const recipes = [3, 7];
  let firstElf = 0;
  let secondElf = 1;

  while (recipes.length <= input + 10) {
    makeNewRecipe(firstElf, secondElf, recipes);
    ({ firstElf, secondElf } = moveElves(firstElf, secondElf, recipes));
  }

  return recipes.slice(input, input + 10).join('');
};

const challenge2 = input => {
  const recipes = [3, 7];
  let firstElf = 0;
  let secondElf = 1;

  while (true) {
    makeNewRecipe(firstElf, secondElf, recipes);
    ({ firstElf, secondElf } = moveElves(firstElf, secondElf, recipes));

    if (
      recipes
        .slice(-(input.length + 1))
        .join('')
        .includes(input)
    ) {
      return recipes.join('').indexOf(input);
    }
  }
};

module.exports = {
  challenge1,
  challenge2,
};
