import Box from '../box';
import PushEvent from '../../events/push-event';
import MoveEvent from '../../events/move-event';
import Action from '../action';
import Cord from '../../utils/cord';
import Player from './player';
import GameEvent from "../../events/game-event";

export default class MoveAction implements Action {
  readonly entity: Player;
  readonly direction: number;
  private newCord: Cord;
  private collision: Box;

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
      this.entity.game.emit(new PushEvent(this.entity, collision, this.direction));
    }
  }

  onEvent(event: GameEvent): boolean {
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
