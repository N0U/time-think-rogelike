import { KEYS } from 'rot-js';
import Entity from '../entity';
import Box from '../box';
import InputEvent from '../../events/input-event';
import PushEvent from '../../events/push-event';

export default class Player extends Entity {
  constructor(game, cord) {
    super(game, cord, '@');
  }

  act() {
    this.game.waitInput();
  }

  onEvent(event) {
    if (event instanceof InputEvent) {
      const keyMap = {};
      keyMap[KEYS.VK_UP] = 0;
      keyMap[KEYS.VK_RIGHT] = 1;
      keyMap[KEYS.VK_DOWN] = 2;
      keyMap[KEYS.VK_LEFT] = 3;
      if (!(event.keyCode in keyMap)) {
        event.done(false);
        return;
      }

      const dir = keyMap[event.keyCode];
      const newCord = this.cord.moveToDirection(dir);
      const collision = this.game.checkCollision(newCord);
      if (!collision) {
        this.cord = newCord;
        this.draw();
      } else if (collision instanceof Box) {
        const e = collision;
        this.game.emit(new PushEvent(this, e, dir, (r) => {
          if (r) {
            this.cord = newCord;
            this.draw();
          }
        }));
      }
      event.done(true);
    }
  }
}
