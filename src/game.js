import { Display } from 'rot-js';
import Map from './map';
import Player from './actors/player';

export default class Game {
  constructor() {
    this.display = new Display({ width: 80, height: 30 });
  }

  run() {
    this.map = new Map(this);
    this.player = new Player(this, 10, 10);
  }

  redrawBackground(x, y) {
    this.display.draw(x, y, ' ');
  }
}
