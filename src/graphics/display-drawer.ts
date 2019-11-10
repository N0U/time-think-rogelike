import {Display} from 'rot-js';
import Cord from '../utils/cord';

export default class DisplayDrawer {
  constructor(width = 80, height = 30) {
    this.display = new Display({ width, height });
    this.offset = new Cord(0, 0);
  }

  draw(cord, symbol = '?', fg = null, bg = null) {
    const gCord = cord.sub(this.offset);
    this.display.draw(gCord.x, gCord.y, symbol, fg, bg);
  }

  clear() {
    this.display.clear();
  }
}
