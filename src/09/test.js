const { expect } = require('chai');

const { challenge1 } = require('./index');

describe('Day 9', () => {
  describe('Challenge 1', () => {
    it('Examples', () => {
      expect(challenge1(9, 25)).to.equal(32);
      expect(challenge1(10, 1618)).to.equal(8317);
      expect(challenge1(13, 7999)).to.equal(146373);
      expect(challenge1(17, 1104)).to.equal(2764);
      expect(challenge1(21, 6111)).to.equal(54718);
      expect(challenge1(30, 5807)).to.equal(37305);
    });

    it('Input', async () => {
      expect(challenge1(455, 71223)).to.equal(384288);
    });
  });

  describe('Challenge 2', () => {
    it('Input', async () => {
      expect(challenge1(455, 7122300)).to.equal(3189426841);
    });
  });
});
