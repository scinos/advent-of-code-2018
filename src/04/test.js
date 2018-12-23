const { expect } = require('chai');
const fs = require('fs').promises;
const path = require('path');

const { challenge1, challenge2 } = require('./index');

describe('Day 4', () => {
  describe('Challenge 1', () => {
    it('Examples', () => {
      expect(
        challenge1([
          '[1518-11-01 00:00] Guard #10 begins shift',
          '[1518-11-04 00:02] Guard #99 begins shift',
          '[1518-11-01 00:25] wakes up',
          '[1518-11-01 00:30] falls asleep',
          '[1518-11-01 00:55] wakes up',
          '[1518-11-01 23:58] Guard #99 begins shift',
          '[1518-11-02 00:40] falls asleep',
          '[1518-11-02 00:50] wakes up',
          '[1518-11-03 00:05] Guard #10 begins shift',
          '[1518-11-03 00:24] falls asleep',
          '[1518-11-03 00:29] wakes up',
          '[1518-11-05 00:55] wakes up',
          '[1518-11-04 00:36] falls asleep',
          '[1518-11-04 00:46] wakes up',
          '[1518-11-05 00:03] Guard #99 begins shift',
          '[1518-11-05 00:45] falls asleep',
          '[1518-11-01 00:05] falls asleep',
        ]),
      ).to.equal(240);
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge1(input)).to.equal(65489);
    });
  });

  describe('Challenge 2', () => {
    it('Examples', () => {
      expect(
        challenge2([
          '[1518-11-01 00:00] Guard #10 begins shift',
          '[1518-11-04 00:02] Guard #99 begins shift',
          '[1518-11-01 00:25] wakes up',
          '[1518-11-01 00:30] falls asleep',
          '[1518-11-01 00:55] wakes up',
          '[1518-11-01 23:58] Guard #99 begins shift',
          '[1518-11-02 00:40] falls asleep',
          '[1518-11-02 00:50] wakes up',
          '[1518-11-03 00:05] Guard #10 begins shift',
          '[1518-11-03 00:24] falls asleep',
          '[1518-11-03 00:29] wakes up',
          '[1518-11-05 00:55] wakes up',
          '[1518-11-04 00:36] falls asleep',
          '[1518-11-04 00:46] wakes up',
          '[1518-11-05 00:03] Guard #99 begins shift',
          '[1518-11-05 00:45] falls asleep',
          '[1518-11-01 00:05] falls asleep',
        ]),
      ).to.equal(4455);
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge2(input)).to.equal(3852);
    });
  });
});
