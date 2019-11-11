import Entity from './entity';
import PushEvent from '../events/push-event';
import MoveEvent from '../events/move-event';
import GameEvent from '../events/game-event';
import Game from '../game';
import Cord from '../utils/cord';

export default class Box extends Entity {
  constructor(game: Game, cord: Cord) {
    super(game, cord, 'X');
  }

  onEvent(event: GameEvent) {
    if (super.onEvent(event)) {
      return true;
    }

    if (event instanceof PushEvent) {
      const pushEvent = event as PushEvent;
      if(pushEvent.entity === this) {
        const newCord = this.cord.moveToDirection(event.direction);
        const collision = this.game.checkCollision(newCord);
        if (!collision) {
          const e = new MoveEvent(this, this.cord, newCord);
          this.cord = newCord;
          this.game.emit(e);
          return true;
        }
      }
    }
    return false;
  }
}
