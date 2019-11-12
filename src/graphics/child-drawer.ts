import Cord from '../utils/cord';
import Drawer from './drawer';

export default class ChildDrawer implements Drawer {
  readonly drawer: Drawer;
  offset: Cord;
  constructor(parent: Drawer, public moveCard = false) {
    this.drawer = parent;
    this.offset = new Cord(0, 0);
  }

  draw(cord: Cord, symbol: string = '?', fg: string = null, bg: string = null) {
    this.drawer.draw(this.moveCard ? cord : cord.sub(this.offset), symbol, fg, bg);
  }
}
