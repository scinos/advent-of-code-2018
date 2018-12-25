const { expect } = require('chai');
const fs = require('fs').promises;
const path = require('path');

const { challenge1, challenge2 } = require('./index');

describe('Day 8', () => {
  describe('Challenge 1', () => {
    it('Examples', () => {
      expect(challenge1('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ').map(Number))).to.equal(
        138,
      );
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8'))
        .split(' ')
        .map(Number);
      expect(challenge1(input)).to.equal(47647);
    });
  });

  describe('Challenge 2', () => {
    it('Examples', () => {
      expect(challenge2('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ').map(Number))).to.equal(66);
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8'))
        .split(' ')
        .map(Number);
      expect(challenge2(input)).to.equal(23636);
    });
  });
});
