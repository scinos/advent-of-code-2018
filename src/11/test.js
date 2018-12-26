const { expect } = require('chai');

const { challenge1, challenge2, powerLevel } = require('./index');

describe('Day 11', () => {
  describe('Challenge 1', () => {
    it('Test power level', () => {
      expect(powerLevel([3, 5], 8)).to.equal(4);
      expect(powerLevel([122, 79], 57)).to.equal(-5);
      expect(powerLevel([217, 196], 39)).to.equal(0);
      expect(powerLevel([101, 153], 71)).to.equal(4);
    });
    it('Examples', () => {
      expect(challenge1(18)).to.equal('33,45');
      expect(challenge1(42)).to.equal('21,61');
    });

    it('Input', async () => {
      expect(challenge1(5535)).to.equal('19,41');
    });
  });

  describe('Challenge 2', () => {
    it('Examples', () => {
      expect(challenge2(18)).to.equal('90,269,16');
      expect(challenge2(42)).to.equal('232,251,12');
    });

    it('Input', async () => {
      expect(challenge2(5535)).to.equal('237,284,11');
    });
  });
});
