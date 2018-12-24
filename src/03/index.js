const parse = claim => {
  const match = /#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/.exec(claim);
  return {
    id: Number(match[1]),
    x: Number(match[2]),
    y: Number(match[3]),
    w: Number(match[4]),
    h: Number(match[5]),
  };
};

module.exports.challenge1 = input => {
  const WIDTH = 1000;
  const LENGTH = 1000;
  const fabric = Array.from({ length: WIDTH }, () => Array.from({ length: LENGTH }, () => 0));

  for (const claim of input) {
    const { x, y, w, h } = parse(claim);
    for (let i = x; i < x + w; i += 1) {
      for (let j = y; j < y + h; j += 1) {
        fabric[i][j] += 1;
      }
    }
  }

  let countOverlap = 0;
  for (let i = 0; i < WIDTH; i += 1) {
    const column = fabric[i];
    for (let h = 0; h < LENGTH; h += 1) {
      if (column[h] > 1) countOverlap += 1;
    }
  }

  return countOverlap;
};

module.exports.challenge2 = input => {
  const WIDTH = 1000;
  const LENGTH = 1000;
  const fabric = Array.from({ length: WIDTH }, () => Array.from({ length: LENGTH }, () => []));

  const ids = [];

  for (const claim of input) {
    const { id, x, y, w, h } = parse(claim);
    ids.push(false);
    for (let i = x; i < x + w; i += 1) {
      for (let j = y; j < y + h; j += 1) {
        fabric[i][j].push(id);
      }
    }
  }

  for (let i = 0; i < WIDTH; i += 1) {
    const column = fabric[i];
    for (let h = 0; h < LENGTH; h += 1) {
      if (column[h].length > 1) {
        for (let j = 0; j < column[h].length; j += 1) {
          const id = column[h][j];
          ids[id - 1] = true;
        }
      }
    }
  }

  return ids.indexOf(false) + 1;
};
