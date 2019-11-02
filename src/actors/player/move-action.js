import Box from '../box';
import PushEvent from '../../events/push-event';
import MoveEvent from '../../events/move-event';

export default class MoveAction {
  constructor(entity, direction) {
    this.entity = entity;
    this.direction = direction;
  }

  perform() {
    const newCord = this.entity.cord.moveToDirection(this.direction);
    this.newCord = newCord;
    const collision = this.entity.game.checkCollision(newCord);
    if (!collision) {
      this.entity.move(newCord);
    } else if (collision instanceof Box) {
      this.collision = collision;
      this.entity.game.emit(new PushEvent(this, collision, this.direction));
    }
  }

  onEvent(event) {
    if (event instanceof MoveEvent && event.source === this.collision) {
      const collision = this.entity.game.checkCollision(this.newCord);
      if (!collision) {
        this.entity.move(this.newCord);
      }
      return true;
    }
    return false;
  }
}
