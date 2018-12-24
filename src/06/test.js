const { expect } = require('chai');
const fs = require('fs').promises;
const path = require('path');

const { challenge1, challenge2 } = require('./index');

describe('Day 6', () => {
  describe('Challenge 1', () => {
    it('Examples', () => {
      expect(challenge1([[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]])).to.equal(17);
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8'))
        .split('\n')
        .map(line => line.split(',').map(n => Number(n)));
      expect(challenge1(input)).to.equal(3290);
    });
  });
  describe('Challenge 2', () => {
    it('Examples', () => {
      expect(challenge2([[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]], 32)).to.equal(16);
    });
    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8'))
        .split('\n')
        .map(line => line.split(',').map(n => Number(n)));
      expect(challenge2(input, 10000)).to.equal(45602);
    });
  });
});
