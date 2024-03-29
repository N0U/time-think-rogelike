import { DIRS } from 'rot-js';

export default class Cord {
  x:number;
  y:number;

  constructor(x?: number | Cord, y?: number) {
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

  toString(): string {
    return `${this.x}x${this.y}`;
  }

  toId(): string {
    return this.toString();
  }

  moveToDirection(dir: number): Cord {
    return this.add(Cord.fromDirection(dir));
  }

  add(cord: Cord): Cord {
    return new Cord(this.x + cord.x, this.y + cord.y);
  }

  sub(cord): Cord{
    return new Cord(this.x - cord.x, this.y - cord.y);
  }

  static fromDirection(dir: number): Cord {
    if (dir < 0 || dir >= 4) {
      throw new Error('Direction must be between 0 and 3');
    }
    const mv = DIRS[4][dir];
    return new Cord(mv[0], mv[1]);
  }

  equals(cord): boolean {
    if (!cord || !(cord instanceof Cord)) {
      return false;
    }

    return this.x === cord.x && this.y === cord.y;
  }
}

export function* cordsInRectangle(x0, y0, x1, y1) {
  for (let x = x0; x <= x1; x += 1) {
    for (let y = y0; y <= y1; y += 1) {
      yield new Cord(x, y);
    }
  }
}
