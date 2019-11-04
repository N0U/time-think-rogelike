import { KEYS } from 'rot-js';
import Entity from '../entity';
import InputEvent from '../../events/input-event';
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

    if (event instanceof InputEvent) {
      const keyMap = {};
      keyMap[KEYS.VK_UP] = 0;
      keyMap[KEYS.VK_RIGHT] = 1;
      keyMap[KEYS.VK_DOWN] = 2;
      keyMap[KEYS.VK_LEFT] = 3;
      if (!(event.keyCode in keyMap)) {
        return false;
      }
      const action = new MoveAction(this, keyMap[event.keyCode]);
      action.perform();
      this.actions.push(action);
      return true;
    }
    return false;
  }


  move(cord) {
    this.cord = cord;
  }
}
