import GameEvent from './game-event';
import EventListener from './event-listener';

export default class MoveInputEvent extends GameEvent {
  readonly direction: number;
  constructor(source: EventListener, direction: number) {
    super(source);
    this.direction = direction;
  }
}
