import Cord from '../utils/cord';

export default interface Drawer {
  offset: Cord;
  draw(cord: Cord, symbol: string, fg?: string, bg?: string);
}
