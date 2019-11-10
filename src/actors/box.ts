import Entity from './entity';
import PushEvent from '../events/push-event';
import MoveEvent from '../events/move-event';

export default class Box extends Entity {
  constructor(game, cord) {
    super(game, cord, 'X');
  }

  onEvent(event) {
    if (super.onEvent(event)) {
      return true;
    }

    if (event instanceof PushEvent && event.entity === this) {
      const newCord = this.cord.moveToDirection(event.direction);
      const collision = this.game.checkCollision(newCord);
      if (!collision) {
        const e = new MoveEvent(this, this.cord, newCord);
        this.cord = newCord;
        this.game.emit(e);
        return true;
      }
    }
    return false;
  }
}
