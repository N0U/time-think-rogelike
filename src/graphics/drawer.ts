import Cord from '../utils/cord';

export default class Drawer {
  constructor(parent) {
    this.drawer = parent;
    this.offset = new Cord(0, 0);
  }

  draw(cord, symbol = '?', fg = null, bg = null) {
    this.drawer.draw(cord.sub(this.offset), symbol, fg, bg);
  }
}
