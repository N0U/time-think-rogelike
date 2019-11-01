export default class Cord {
  constructor(x, y) {
    if (x !== undefined && y !== undefined) {
      this.x = x;
      this.y = y;
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
