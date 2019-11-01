import { DIRS } from 'rot-js';

export default class Cord {
  constructor(x, y) {
    if (typeof x === 'number' && typeof y === 'number') {
      this.x = x;
      this.y = y;
    } else if (x instanceof Cord) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = 0;
      this.y = 0;
    }
  }

  toString() {
    return `${this.x}x${this.y}`;
  }

  toId() {
    return this.toString();
  }

  moveToDirection(dir) {
    return this.add(Cord.fromDirection(dir));
  }

  add(cord) {
    return new Cord(this.x + cord.x, this.y + cord.y);
  }

  static fromDirection(dir) {
    if (dir < 0 || dir >= 4) {
      throw new Error('Direction must be between 0 and 3');
    }
    const mv = DIRS[4][dir];
    return new Cord(mv[0], mv[1]);
  }

  equals(cord) {
    if (!cord || !(cord instanceof Cord)) {
      return false;
    }

    return this.x === cord.x && this.y === cord.y;
  }
}

export function* cordsInRectangle(x, y, w, h) {
  const x1 = x + w;
  const y1 = y + h;
  for (let i = x; i < x1; i += 1) {
    for (let j = y; j < y1; j += 1) {
      yield new Cord(i, j);
    }
  }
}
