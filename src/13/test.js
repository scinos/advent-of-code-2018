const { expect } = require('chai');
const fs = require('fs').promises;
const path = require('path');

const { challenge1, challenge2 } = require('./index');

describe('Day 13', () => {
  describe('Challenge 1', () => {
    it('Examples', () => {
      expect(
        challenge1([
          '/->-\\        ',
          '|   |  /----\\',
          '| /-+--+-\\  |',
          '| | |  | v  |',
          '\\-+-/  \\-+--/',
          '  \\------/   ',
        ]),
      ).to.equal('7,3');
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge1(input)).to.equal('91,69');
    });
  });

  describe('Challenge 2', () => {
    it('Examples', () => {
      expect(
        challenge2([
          '/>-<\\  ',
          '|   |  ',
          '| /<+-\\',
          '| | | v',
          '\\>+</ |',
          '  |   ^',
          '  \\<->/',
        ]),
      ).to.equal('6,4');
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge2(input)).to.equal('44,87');
    });
  });
});
