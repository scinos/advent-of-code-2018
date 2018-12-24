const { manhattanDist, findMinBox, manhattanCircle } = require('../lib');

module.exports.challenge1 = points => {
  const [ox, oy, ox2, oy2] = findMinBox(points);
  const w = ox2 - ox + 1;
  const h = oy2 - oy + 1;
  const newPoints = points.map(([x, y]) => [x - ox, y - oy]);

  const plane = Array.from({ length: w }, () => Array.from({ length: h }, () => '.'));

  let hasEmptySpaces = true;
  const areas = {};

  let iter = 0;
  // Repeat until we do one iteartion were we don't find any new points
  while (hasEmptySpaces) {
    hasEmptySpaces = false;
    const pointsInThisIteration = [];

    newPoints.forEach(([baseX, baseY], id) => {
      // Check all the points in a square around that point, 1 unit bigger than the last iteration
      // (i.e. "grow" the point). This algorithm makes a "Manhattan circle" around the point.
      manhattanCircle([baseX, baseY], iter).forEach(([x, y]) => {
        // Ignore those outside of range
        if (x < 0 || x >= w || y < 0 || y >= h) return;

        // Point already visited in previous iteration
        if (plane[x][y] !== '.') return;

        // Point already visisted in this iteration
        const visitedPoint = pointsInThisIteration.find(
          ({ point: [vx, vy] }) => vx === x && vy === y,
        );
        if (visitedPoint) {
          visitedPoint.dupe = true;
          return;
        }

        // New point found
        pointsInThisIteration.push({
          point: [x, y],
          id,
          dupe: false,
        });
      });
    });

    // We have to mark all the new points we found. Mark only those that are new
    pointsInThisIteration.forEach(({ point: [x, y], id, dupe }) => {
      if (dupe) {
        plane[x][y] = '#';
      } else {
        hasEmptySpaces = true;
        plane[x][y] = id; // String.fromCharCode(id + 48);
        areas[id] = (areas[id] || 0) + 1;
      }
    });

    iter += 1;
  }

  // Exclude numbers in the border of the plane
  for (let i = 0; i < w; i += 1) {
    delete areas[plane[i][0]];
    delete areas[plane[i][h - 1]];
  }
  for (let i = 0; i < h; i += 1) {
    delete areas[plane[0][h]];
    delete areas[plane[w - 1][h - 1]];
  }

  return Object.values(areas).sort((a, b) => b - a)[0];
};

module.exports.challenge2 = (points, limit) => {
  const [ox, oy, ox2, oy2] = findMinBox(points);
  const w = ox2 - ox + 1;
  const h = oy2 - oy + 1;
  const newPoints = points.map(([x, y]) => [x - ox, y - oy]);
  let area = 0;

  for (let i = 0; i < w; i += 1) {
    for (let j = 0; j < h; j += 1) {
      let sum = 0;
      for (let p = 0; p < newPoints.length && sum < limit; p += 1) {
        sum += manhattanDist([i, j], newPoints[p]);
      }
      if (sum < limit) area += 1;
    }
  }

  return area;
};
