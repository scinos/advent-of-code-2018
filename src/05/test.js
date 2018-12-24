const { expect } = require('chai');
const fs = require('fs').promises;
const path = require('path');

const { challenge1, challenge2 } = require('./index');

describe('Day 5', () => {
  describe('Challenge 1', () => {
    it('Examples', () => {
      expect(challenge1('dabAcCaCBAcCcaDA')).to.equal('dabCBAcaDA');
    });

    it('Input', async () => {
      const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8');
      expect(challenge1(input).length).to.equal(9390);
    });
  });

  describe('Challenge 2', () => {
    it('Examples', () => {
      expect(challenge2('dabAcCaCBAcCcaDA')).to.equal(4);
    });

    it('Input', async () => {
      const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8');
      expect(challenge2(input)).to.equal(5898);
    });
  });
});
