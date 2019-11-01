import { Display, Scheduler, Engine } from 'rot-js';
import Cord from './utils/cord';
import Map from './map';
import Player from './actors/player';
import Box from './actors/box';

export default class Game {
  constructor() {
    this.display = new Display({ width: 80, height: 30 });
    this.scheduler = new Scheduler.Simple();
    this.engine = new Engine(this.scheduler);
    this.entities = new Set();
  }

  run() {
    this.map = new Map(this);
    this.player = this.addEntity(new Player(this, new Cord(10, 10)));
    for (let i = 0; i < 10; i += 1) {
      this.addEntity(new Box(this, new Cord(12, 10 + i)));
    }
    this.scheduler.add(this.player, true);
    this.engine.start();
  }

  redrawBackground(cord) {
    this.map.redrawTile(cord);
  }

  addEntity(entity) {
    this.entities.add(entity);
    return entity;
  }

  checkCollision(cord) {
    if (!this.map.isFree(cord)) {
      return true;
    }
    for (const e of this.entities) {
      if (e.cord.equals(cord)) {
        return e;
      }
    }
    return false;
  }
}
