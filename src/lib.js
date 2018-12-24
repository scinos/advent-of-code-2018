const transpose = (a, w, h) => {
  const t = Array.from({ length: h }, () => Array.from({ length: w }));
  for (let i = 0; i < w; i += 1) {
    for (let j = 0; j < h; j += 1) {
      t[j][i] = a[i][j];
    }
  }
  return t;
};

const print = (array, w, h) => {
  const a = transpose(array, w, h);
  // eslint-disable-next-line no-console
  console.log(a.map(line => line.join('')).join('\n'));
};

const manhattanDist = (p, q) => Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]);

const findMinBox = points =>
  points.reduce(
    ([ox, oy, w, h], [x, y]) => [Math.min(ox, x), Math.min(oy, y), Math.max(x, w), Math.max(y, h)],
    [Infinity, Infinity, 0, 0],
  );

const manhattanCircle = ([centerX, centerY], radius) => {
  const circle = [];
  for (let x = centerX - radius; x <= centerX + radius; x += 1)
    for (let y = centerY - radius; y <= centerY + radius; y += 1)
      if (Math.abs(x - centerX) + Math.abs(y - centerY) === radius) circle.push([x, y]);
  return circle;
};

module.exports = {
  transpose,
  print,
  manhattanDist,
  findMinBox,
  manhattanCircle,
};
