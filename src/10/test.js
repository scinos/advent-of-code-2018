const { expect } = require('chai');
const fs = require('fs').promises;
const path = require('path');

const { challenge1 } = require('./index');

describe('Day 10', () => {
  describe('Challenge 1', () => {
    it('Examples', () => {
      expect(
        challenge1([
          'position=< 9,  1> velocity=< 0,  2>',
          'position=< 7,  0> velocity=<-1,  0>',
          'position=< 3, -2> velocity=<-1,  1>',
          'position=< 6, 10> velocity=<-2, -1>',
          'position=< 2, -4> velocity=< 2,  2>',
          'position=<-6, 10> velocity=< 2, -2>',
          'position=< 1,  8> velocity=< 1, -1>',
          'position=< 1,  7> velocity=< 1,  0>',
          'position=<-3, 11> velocity=< 1, -2>',
          'position=< 7,  6> velocity=<-1, -1>',
          'position=<-2,  3> velocity=< 1,  0>',
          'position=<-4,  3> velocity=< 2,  0>',
          'position=<10, -3> velocity=<-1,  1>',
          'position=< 5, 11> velocity=< 1, -2>',
          'position=< 4,  7> velocity=< 0, -1>',
          'position=< 8, -2> velocity=< 0,  1>',
          'position=<15,  0> velocity=<-2,  0>',
          'position=< 1,  6> velocity=< 1,  0>',
          'position=< 8,  9> velocity=< 0, -1>',
          'position=< 3,  3> velocity=<-1,  1>',
          'position=< 0,  5> velocity=< 0, -1>',
          'position=<-2,  2> velocity=< 2,  0>',
          'position=< 5, -2> velocity=< 1,  2>',
          'position=< 1,  4> velocity=< 2,  1>',
          'position=<-2,  7> velocity=< 2, -2>',
          'position=< 3,  6> velocity=<-1, -1>',
          'position=< 5,  0> velocity=< 1,  0>',
          'position=<-6,  0> velocity=< 2,  0>',
          'position=< 5,  9> velocity=< 1, -2>',
          'position=<14,  7> velocity=<-2,  0>',
          'position=<-3,  6> velocity=< 2, -1>',
        ]).area,
      ).to.equal(80);
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge1(input).area).to.equal(620);
    });
  });

  describe('Challenge 2', () => {
    it('Examples', () => {
      expect(
        challenge1([
          'position=< 9,  1> velocity=< 0,  2>',
          'position=< 7,  0> velocity=<-1,  0>',
          'position=< 3, -2> velocity=<-1,  1>',
          'position=< 6, 10> velocity=<-2, -1>',
          'position=< 2, -4> velocity=< 2,  2>',
          'position=<-6, 10> velocity=< 2, -2>',
          'position=< 1,  8> velocity=< 1, -1>',
          'position=< 1,  7> velocity=< 1,  0>',
          'position=<-3, 11> velocity=< 1, -2>',
          'position=< 7,  6> velocity=<-1, -1>',
          'position=<-2,  3> velocity=< 1,  0>',
          'position=<-4,  3> velocity=< 2,  0>',
          'position=<10, -3> velocity=<-1,  1>',
          'position=< 5, 11> velocity=< 1, -2>',
          'position=< 4,  7> velocity=< 0, -1>',
          'position=< 8, -2> velocity=< 0,  1>',
          'position=<15,  0> velocity=<-2,  0>',
          'position=< 1,  6> velocity=< 1,  0>',
          'position=< 8,  9> velocity=< 0, -1>',
          'position=< 3,  3> velocity=<-1,  1>',
          'position=< 0,  5> velocity=< 0, -1>',
          'position=<-2,  2> velocity=< 2,  0>',
          'position=< 5, -2> velocity=< 1,  2>',
          'position=< 1,  4> velocity=< 2,  1>',
          'position=<-2,  7> velocity=< 2, -2>',
          'position=< 3,  6> velocity=<-1, -1>',
          'position=< 5,  0> velocity=< 1,  0>',
          'position=<-6,  0> velocity=< 2,  0>',
          'position=< 5,  9> velocity=< 1, -2>',
          'position=<14,  7> velocity=<-2,  0>',
          'position=<-3,  6> velocity=< 2, -1>',
        ]).counter,
      ).to.equal(3);
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge1(input).counter).to.equal(10886);
    });
  });
});
