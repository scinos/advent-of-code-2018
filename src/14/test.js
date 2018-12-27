const { expect } = require('chai');

const { challenge1, challenge2 } = require('./index');

describe('Day 14', () => {
  describe('Challenge 1', () => {
    it('Examples', () => {
      expect(challenge1(9)).to.equal('5158916779');
      expect(challenge1(5)).to.equal('0124515891');
      expect(challenge1(18)).to.equal('9251071085');
      expect(challenge1(2018)).to.equal('5941429882');
    });

    it('Input', async () => {
      expect(challenge1(290431)).to.equal('1776718175');
    });
  });

  describe('Challenge 2', () => {
    it('Examples', () => {
      expect(challenge2('51589')).to.equal(9);
      expect(challenge2('01245')).to.equal(5);
      expect(challenge2('92510')).to.equal(18);
      expect(challenge2('59414')).to.equal(2018);
    });

    it('Input', async () => {
      expect(challenge2('290431')).to.equal(20220949);
    });
  });
});
