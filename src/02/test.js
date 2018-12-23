const { expect } = require('chai');
const fs = require('fs').promises;
const path = require('path');

const { challenge1, challenge2 } = require('./index');

describe('Day 2', () => {
  describe('Challenge 1', () => {
    it('Examples', () => {
      expect(
        challenge1(['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab']),
      ).to.equal(12);
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge1(input)).to.equal(8892);
    });
  });

  describe('Challenge 2', () => {
    it('Examples', () => {
      expect(challenge2(['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz'])).to.equal(
        'fgij',
      );
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge2(input)).to.equal('zihwtxagifpbsnwleydukjmqv');
    });
  });
});
