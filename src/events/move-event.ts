import GameEvent from './game-event';
import Cord from '../utils/cord';
import EventListener from './event-listener';

export default class MoveEvent extends GameEvent {
  prevPos: Cord;
  pos: Cord;

  constructor(source: EventListener, prevPos: Cord, pos: Cord) {
    super(source);
    this.prevPos = prevPos;
    this.pos = pos;
  }
}
