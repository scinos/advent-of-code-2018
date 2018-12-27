const { expect } = require('chai');
const fs = require('fs').promises;
const path = require('path');

const { challenge } = require('./index');

describe('Day 12', () => {
  describe('Challenge 1', () => {
    it('Examples', () => {
      expect(
        challenge({
          state: '#..#.#..##......###...###',
          rules: [
            '...## => #',
            '..#.. => #',
            '.#... => #',
            '.#.#. => #',
            '.#.## => #',
            '.##.. => #',
            '.#### => #',
            '#.#.# => #',
            '#.### => #',
            '##.#. => #',
            '##.## => #',
            '###.. => #',
            '###.# => #',
            '####. => #',
          ],
          maxGen: 20,
        }),
      ).to.equal(325);
    });

    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      let initialState;
      const rules = [];
      input.forEach(line => {
        let match;
        if ((match = line.match(/^initial state: ([.#]+)/))) {
          [, initialState] = match;
        } else if (line.match('=>')) {
          rules.push(line);
        }
      });

      expect(
        challenge({
          state: initialState,
          rules,
          maxGen: 20,
        }),
      ).to.equal(2349);
    });
  });

  describe('Challenge 2', () => {
    it('Input', async () => {
      const input = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
      let initialState;
      const rules = [];
      input.forEach(line => {
        let match;
        if ((match = line.match(/^initial state: ([.#]+)/))) {
          [, initialState] = match;
        } else if (line.match('=>')) {
          rules.push(line);
        }
      });

      expect(
        challenge({
          state: initialState,
          rules,
          maxGen: 50000000000,
        }),
      ).to.equal(2100000001168);
    });
  });
});
