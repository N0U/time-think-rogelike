import { KEYS } from 'rot-js';
import Entity from '../entity';
import Box from '../box';
import InputEvent from '../../events/input-event';
import PushEvent from '../../events/push-event';
import MoveAction from './move-action';

export default class Player extends Entity {
  constructor(game, cord) {
    super(game, cord, '@');
    this.action = null;
    this.actions = { InputEvent: [MoveAction] };
  }

  act() {
    this._call_action = [];
    this.game.waitInput();
  }

  onEvent(event) {
    if (this._call_action && this._call_action.forEach((action) => action.onEvent(event))) {
      return; // Event handled by action
    }

    if (event instanceof InputEvent) {
      const keyMap = {};
      keyMap[KEYS.VK_UP] = 0;
      keyMap[KEYS.VK_RIGHT] = 1;
      keyMap[KEYS.VK_DOWN] = 2;
      keyMap[KEYS.VK_LEFT] = 3;
      if (!(event.keyCode in keyMap)) {
        return;
      }
      event.data.direction = keyMap[event.keyCode];
      this.runEvent(event.constructor.name, event);

    }

    super.onEvent(event);
  }


  move(cord) {
    this.cord = cord;
    this.draw();
  }
}
