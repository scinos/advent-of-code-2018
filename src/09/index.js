module.exports.challenge1 = (numPlayers, maxMarble) => {
  const position0 = {};
  position0.next = position0;
  position0.prev = position0;
  position0.val = 0;

  const players = Array.from({ length: numPlayers }, () => 0);
  let current = position0;
  let marble = 1;
  let currentPlayer = 0;

  while (marble <= maxMarble) {
    if (marble % 23 === 0) {
      const toRemove = current.prev.prev.prev.prev.prev.prev.prev;
      const { next, prev, val } = toRemove;
      prev.next = next;
      next.prev = prev;
      current = next;
      players[currentPlayer] += val + marble;
    } else {
      const toAdd = {
        val: marble,
        next: current.next.next,
        prev: current.next,
      };
      const { next, prev } = toAdd;
      next.prev = toAdd;
      prev.next = toAdd;
      current = toAdd;
    }
    marble += 1;
    currentPlayer = (currentPlayer + 1) % players.length;
  }

  return Math.max(...players);
};
