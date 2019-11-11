import Cord from '../utils/cord';

export default interface Drawer {
  offset: Cord;
  moveCard: boolean
  draw(cord: Cord, symbol: string, fg?: string, bg?: string);
}
