import { KEYS } from 'rot-js';
import Entity from '../entity';
import MoveInputEvent from '../../events/move-input-event';
import MoveAction from './move-action';

export default class Player extends Entity {
  constructor(game, cord) {
    super(game, cord, '@');
    this.prevCord = null;
  }

  act() {
    this.game.waitInput();
  }

  render(offset) {
    super.render(offset);

    if (this.prevCord) {
      const gCord = this.prevCord.sub(offset);
      this.game.display.draw(gCord.x, gCord.y, this.symbol, 'blue');
    }
  }

  onEvent(event) {
    if (super.onEvent(event)) {
      return true;
    }

    if (event instanceof MoveInputEvent) {
      this.prevCord = null;
      const action = new MoveAction(this, event.direction);
      action.perform();
      this.actions.push(action);
      return true;
    }
    return false;
  }

  move(cord) {
    this.cord = cord;
  }

  deserialize(o) {
    this.prevCord = o.cord;
  }
}
