import { KEYS } from 'rot-js';
import Entity from '../entity';
import MoveInputEvent from '../../events/move-input-event';
import MoveAction from './move-action';

export default class Player extends Entity {
  constructor(game, cord) {
    super(game, cord, '@');
  }

  act() {
    this.game.waitInput();
  }

  onEvent(event) {
    if (super.onEvent(event)) {
      return true;
    }

    if (event instanceof MoveInputEvent) {
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
    // Do nothing coz' player can't be affected by time machine
  }
}
