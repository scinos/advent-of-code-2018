const powerLevel = ([x, y], serialNumber) => {
  const rackId = x + 10;
  const power = (rackId * y + serialNumber) * rackId;
  const level = Number(power.toString().substr(-3, 1));
  return level - 5;
};

const buildGrid = serialNumber => {
  const grid = Array.from({ length: 300 }, () => Array.from({ length: 300 }));

  for (let x = 0; x < 300; x += 1) {
    for (let y = 0; y < 300; y += 1) {
      let power = powerLevel([x + 1, y + 1], serialNumber);
      if (x > 1) power += grid[x - 1][y];
      if (y > 1) power += grid[x][y - 1];
      if (x > 1 && y > 1) power -= grid[x - 1][y - 1];
      grid[x][y] = power;
    }
  }

  return grid;
};

const computeMaxPower = (grid, size) => {
  let maxPower = -Infinity;
  let maxCoords = [];

  for (let x = size - 1; x < 300; x += 1) {
    for (let y = size - 1; y < 300; y += 1) {
      const A = x > size && y > size ? grid[x - size][y - size] : 0;
      const B = y > size ? grid[x][y - size] : 0;
      const C = x > size ? grid[x - size][y] : 0;
      const D = grid[x][y];
      const power = D + A - B - C;
      if (power > maxPower) {
        maxPower = power;
        maxCoords = [x - size + 2, y - size + 2];
      }
    }
  }

  return {
    power: maxPower,
    coords: maxCoords,
  };
};

const challenge1 = serialNumber => {
  const grid = buildGrid(serialNumber);
  const { coords } = computeMaxPower(grid, 3);
  return coords.join(',');
};

const challenge2 = serialNumber => {
  const grid = buildGrid(serialNumber);

  let maxPower = -Infinity;
  let maxCoords = [];
  let maxSize = 0;

  for (let size = 1; size < 300; size += 1) {
    const { coords, power } = computeMaxPower(grid, size);
    if (power > maxPower) {
      maxCoords = coords;
      maxPower = power;
      maxSize = size;
    }
  }

  return `${maxCoords.join(',')},${maxSize}`;
};

module.exports = {
  challenge1,
  challenge2,
  powerLevel,
};
