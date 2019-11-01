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
    const mv = DIRS[4][dir];
    return new Cord(this.x + mv[0], this.y + mv[1]);
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
