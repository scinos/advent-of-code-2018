const { expect } = require('chai');
const fs = require('fs').promises;
const path = require('path');

const { challenge1, challenge2 } = require('./index');

describe('Day 1', () => {
  describe('Challenge 1', () => {
    it('Examples', () => {
      expect(challenge1(['+1', '-2', '+3', '+1'])).to.equal(3);
      expect(challenge1(['+1', '+1', '+1'])).to.equal(3);
      expect(challenge1(['+1', '+1', '-2'])).to.equal(0);
      expect(challenge1(['-1', '-2', '-3'])).to.equal(-6);
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge1(input)).to.equal(420);
    });
  });

  describe('Challenge 2', () => {
    it('Examples', () => {
      expect(challenge2(['+1', '-2', '+3', '+1'])).to.equal(2);
      expect(challenge2(['+3', '+3', '+4', '-2', '-4'])).to.equal(10);
      expect(challenge2(['-6', '+3', '+8', '+5', '-6'])).to.equal(5);
      expect(challenge2(['+7', '+7', '-2', '-7', '-4'])).to.equal(14);
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge2(input)).to.equal(227);
    });
  });
});
