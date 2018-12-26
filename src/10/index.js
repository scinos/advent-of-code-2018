const { findMinBox, print } = require('../lib');

const getPoints = input => {
  const re = /^position=< *([-0-9]+), *([-0-9]+)> velocity=< *([-0-9]+), *([-0-9]+)>/;
  return input.map(line => {
    const [, x, y, vx, vy] = line.match(re);
    return { x: Number(x), y: Number(y), vx: Number(vx), vy: Number(vy) };
  });
};

const getArea = points => {
  const box = findMinBox(points.map(({ x, y }) => [x, y]));
  return (box[2] - box[0] + 1) * (box[3] - box[1] + 1);
};

const iterate = points =>
  points.map(point => ({
    x: point.vx + point.x,
    y: point.vy + point.y,
    vx: point.vx,
    vy: point.vy,
  }));

const printIteration = (box, points) => {
  const w = box[2] - box[0] + 1;
  const h = box[3] - box[1] + 1;
  const plane = Array.from({ length: w }, () => Array.from({ length: h }, () => '.'));

  points.forEach(point => {
    const x = point.x - box[0];
    const y = point.y - box[1];
    plane[x][y] = '#';
  });

  print(plane, w, h);
};

module.exports.challenge1 = input => {
  let points = getPoints(input);

  let area = Infinity;
  let newArea = getArea(points);
  let newPoints = points;
  let counter = 0;

  while (newArea < area) {
    points = newPoints;
    area = newArea;
    newPoints = iterate(points);
    counter += 1;
    newArea = getArea(newPoints);
  }

  printIteration(findMinBox(points.map(({ x, y }) => [x, y])), points);

  return { area, counter: counter - 1 };
};
