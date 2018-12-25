const { expect } = require('chai');
const fs = require('fs').promises;
const path = require('path');

const { challenge1, challenge2 } = require('./index');

describe('Day 7', () => {
  describe('Challenge 1', () => {
    it('Examples', () => {
      expect(
        challenge1([
          'Step C must be finished before step A can begin.',
          'Step C must be finished before step F can begin.',
          'Step A must be finished before step B can begin.',
          'Step A must be finished before step D can begin.',
          'Step B must be finished before step E can begin.',
          'Step D must be finished before step E can begin.',
          'Step F must be finished before step E can begin.',
        ]),
      ).to.equal('CABDFE');
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge1(input)).to.equal('CFGHAEMNBPRDISVWQUZJYTKLOX');
    });
  });

  describe('Challenge 2', () => {
    it('Examples', () => {
      expect(
        challenge2(
          [
            'Step C must be finished before step A can begin.',
            'Step C must be finished before step F can begin.',
            'Step A must be finished before step B can begin.',
            'Step A must be finished before step D can begin.',
            'Step B must be finished before step E can begin.',
            'Step D must be finished before step E can begin.',
            'Step F must be finished before step E can begin.',
          ],
          0,
          2,
        ),
      ).to.equal(15);
    });
    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      expect(challenge2(input, 60, 5)).to.equal(828);
    });
  });
});
