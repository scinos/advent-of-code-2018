class Cart {
  constructor(x, y, direction) {
    this.nextTurn = 'left';
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  move(map, carts) {
    switch (this.direction) {
      case 'R':
        this.x += 1;
        break;
      case 'L':
        this.x -= 1;
        break;
      case 'U':
        this.y -= 1;
        break;
      case 'D':
        this.y += 1;
        break;
      default:
        throw new Error('Unknown direction');
    }

    const nextPosition = map[this.x][this.y];
    switch (nextPosition) {
      case '\\':
        switch (this.direction) {
          case 'L':
            this.direction = 'U';
            break;
          case 'R':
            this.direction = 'D';
            break;
          case 'U':
            this.direction = 'L';
            break;
          case 'D':
            this.direction = 'R';
            break;
          default:
            throw new Error(`Unkonwn direction ${this.direction}`);
        }
        break;
      case '/':
        switch (this.direction) {
          case 'L':
            this.direction = 'D';
            break;
          case 'R':
            this.direction = 'U';
            break;
          case 'U':
            this.direction = 'R';
            break;
          case 'D':
            this.direction = 'L';
            break;
          default:
            throw new Error(`Unkonwn direction ${this.direction}`);
        }
        break;
      case '+':
        switch (this.nextTurn) {
          case 'left':
            this.nextTurn = 'straight';
            switch (this.direction) {
              case 'L':
                this.direction = 'D';
                break;
              case 'R':
                this.direction = 'U';
                break;
              case 'U':
                this.direction = 'L';
                break;
              case 'D':
                this.direction = 'R';
                break;
              default:
                throw new Error(`Unkonwn direction ${this.direction}`);
            }
            break;
          case 'straight':
            this.nextTurn = 'right';
            break;
          case 'right':
            this.nextTurn = 'left';
            switch (this.direction) {
              case 'L':
                this.direction = 'U';
                break;
              case 'R':
                this.direction = 'D';
                break;
              case 'U':
                this.direction = 'R';
                break;
              case 'D':
                this.direction = 'L';
                break;
              default:
                throw new Error(`Unkonwn direction ${this.direction}`);
            }
            break;
          default:
            throw new Error('Unkonwn next turn');
        }
        break;
      case '-':
        break;
      case '|':
        break;
      default:
        throw new Error(`Unkonwn next position ${nextPosition}`);
    }

    const crashCart = carts.find(c => c.x === this.x && c.y === this.y && c !== this);
    if (crashCart) {
      return {
        valid: false,
        cart1: this,
        cart2: crashCart,
      };
    }

    return {
      valid: true,
    };
  }
}

const createMap = input => {
  const width = input.reduce((max, line) => Math.max(max, line.length), 0);
  const height = input.length;
  const carts = [];

  const map = Array.from({ length: width }, () => Array.from({ length: height }, () => ' '));
  input.forEach((line, idxLine) => {
    line.split('').forEach((character, idxCharacter) => {
      switch (character) {
        case '>':
          carts.push(new Cart(idxCharacter, idxLine, 'R'));
          map[idxCharacter][idxLine] = '-';
          break;
        case '<':
          carts.push(new Cart(idxCharacter, idxLine, 'L'));
          map[idxCharacter][idxLine] = '-';
          break;
        case '^':
          carts.push(new Cart(idxCharacter, idxLine, 'U'));
          map[idxCharacter][idxLine] = '|';
          break;
        case 'v':
          carts.push(new Cart(idxCharacter, idxLine, 'D'));
          map[idxCharacter][idxLine] = '|';
          break;
        default:
          map[idxCharacter][idxLine] = character;
          break;
      }
    });
  });

  return { map, carts };
};

const challenge1 = input => {
  const { map, carts } = createMap(input);

  let hasCollision = false;
  let collistionCoords = '';
  while (!hasCollision) {
    carts
      .sort((a, b) => {
        if (a.y === b.y) return a.x - b.x;
        return a.y - b.y;
      })
      .forEach(cart => {
        const { valid } = cart.move(map, carts);
        if (!valid && !hasCollision) {
          collistionCoords = `${cart.x},${cart.y}`;
          hasCollision = true;
        }
      });
  }
  return collistionCoords;
};

const challenge2 = input => {
  const { map, carts } = createMap(input);

  while (carts.length > 1) {
    const cartsToRemove = [];
    carts
      .sort((a, b) => {
        if (a.y === b.y) return a.x - b.x;
        return a.y - b.y;
      })
      .forEach(cart => {
        const { valid, cart1, cart2 } = cart.move(map, carts);
        if (!valid && !cartsToRemove.includes(cart1) && !cartsToRemove.includes(cart2)) {
          cartsToRemove.push(cart1);
          cartsToRemove.push(cart2);
        }
      });
    cartsToRemove.forEach(cart => {
      carts.splice(carts.indexOf(cart), 1);
    });
  }
  return `${carts[0].x},${carts[0].y}`;
};

module.exports = {
  challenge1,
  challenge2,
};
