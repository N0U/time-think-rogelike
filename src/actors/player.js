import { KEYS } from 'rot-js';

export default class Player {
  constructor(game, cord) {
    this.game = game;
    this.prevCord = cord;
    this.cord = cord;
    this.draw();
  }

  draw() {
    if (!this.prevCord.equals(this.cord)) {
      this.game.redrawBackground(this.prevCord);
    }
    this.game.display.draw(this.cord.x, this.cord.y, '@');
    this.prevCord = this.cord;
  }

  act() {
    this.game.engine.lock();
    window.addEventListener('keydown', this);
  }

  handleEvent(e) {
    const keyMap = {};
    keyMap[KEYS.VK_UP] = 0;
    keyMap[KEYS.VK_RIGHT] = 1;
    keyMap[KEYS.VK_DOWN] = 2;
    keyMap[KEYS.VK_LEFT] = 3;

    const code = e.keyCode;

    if (!(code in keyMap)) { return; }

    this.cord = this.cord.moveToDirection(keyMap[code]);
    this.draw();
    this.game.engine.unlock();
  }
}
