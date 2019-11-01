import { KEYS } from 'rot-js';
import Entity from './entity';
import Box from './box';

export default class Player extends Entity {
  constructor(game, cord) {
    super(game, cord, '@');
  }

  act() {
    this.game.engine.lock();
    window.addEventListener('keydown', this);
  }

  handleEvent(event) {
    const keyMap = {};
    keyMap[KEYS.VK_UP] = 0;
    keyMap[KEYS.VK_RIGHT] = 1;
    keyMap[KEYS.VK_DOWN] = 2;
    keyMap[KEYS.VK_LEFT] = 3;

    const code = event.keyCode;

    if (!(code in keyMap)) { return; }

    const dir = keyMap[code];
    const newCord = this.cord.moveToDirection(keyMap[code]);
    const collision = this.game.checkCollision(newCord);
    if (!collision) {
      this.cord = newCord;
      this.draw();
    } else if (collision instanceof Box) {
      const e = collision;
      if (e.push(dir)) {
        this.cord = newCord;
        this.draw();
      }
    }
    this.game.engine.unlock();
  }
}
