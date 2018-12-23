const { expect } = require('chai');
const fs = require('fs').promises;
const path = require('path');

const { challenge1, challenge2 } = require('./index');

describe('Day 3', () => {
  describe('Challenge 1', () => {
    it('Examples', () => {
      expect(challenge1(['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'])).to.equal(4);
    });
    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge1(input)).to.equal(124850);
    });
  });

  describe('Challenge 2', () => {
    it('Examples', () => {
      expect(challenge2(['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'])).to.equal(3);
    });
    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge2(input)).to.equal(1097);
    });
  });
});
