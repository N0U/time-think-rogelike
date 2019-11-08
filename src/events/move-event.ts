import Event from './event';

export default class MoveEvent extends Event {
  constructor(source, prevPos, pos) {
    super(source);
    this.prevPos = prevPos;
    this.pos = pos;
  }
}
