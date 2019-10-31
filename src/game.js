import { Display } from 'rot-js';
import Player from './actors/player';

export default class Game {
  constructor() {
    this.display = new Display({ width: 100, height:30 });
  }

  run() {
    this.player = new Player(this, 10, 10);

  }

  redrawBackground(x, y) {
    this.display.draw(x, y, ' ');
  }
}
