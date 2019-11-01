import { Display, Scheduler, Engine } from 'rot-js';
import Cord from './utils/cord';
import Map from './map';
import Player from './actors/player';

export default class Game {
  constructor() {
    this.display = new Display({ width: 80, height: 30 });
    this.scheduler = new Scheduler.Simple();
    this.engine = new Engine(this.scheduler);
  }

  run() {
    this.map = new Map(this);
    this.player = new Player(this, new Cord(10, 10));
    this.scheduler.add(this.player, true);
    this.engine.start();
  }

  redrawBackground(cord) {
    this.map.redrawTile(cord);
  }
}
