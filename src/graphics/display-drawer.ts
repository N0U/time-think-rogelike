import {Display} from 'rot-js';
import Cord from '../utils/cord';
import Drawer from './drawer';

export default class DisplayDrawer implements Drawer {
  readonly display: Display;
  offset: Cord;
  moveCard: boolean;

  constructor(width = 80, height = 30) {
    this.display = new Display({ width, height });
    this.offset = new Cord(0, 0);
    this.moveCard = false;
  }

  draw(cord: Cord, symbol: string = '?', fg: string = null, bg: string = null) {
    const gCord = this.moveCard ? cord : cord.sub(this.offset);
    this.display.draw(gCord.x, gCord.y, symbol, fg, bg);
  }

  clear() {
    this.display.clear();
  }
}
