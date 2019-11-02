import Entity from './entity';
import PushEvent from '../events/push-event';

export default class Box extends Entity {
  constructor(game, cord) {
    super(game, cord, 'X');
  }

  onEvent(event) {
    if (event instanceof PushEvent && event.entity === this) {
      const newCord = this.cord.moveToDirection(event.direction);
      const collision = this.game.checkCollision(newCord);
      if (!collision) {
        this.cord = newCord;
        this.draw();
        event.done(true);
      } else {
        event.done(false);
      }
    }
  }
}
