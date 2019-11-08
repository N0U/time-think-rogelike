import Event from './event';

export default class MoveInputEvent extends Event {
  constructor(source, direction) {
    super(source);
    this.direction = direction;
  }
}
