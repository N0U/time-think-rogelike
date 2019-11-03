import { Display, Scheduler } from 'rot-js';
import Cord from './utils/cord';
import EventBus from './event-bus';
import InputEvent from './events/input-event';
import Map from './map';
import Player from './actors/player/player';
import Box from './actors/box';

export default class Game {
  constructor() {
    this.display = new Display({ width: 80, height: 30 });
    this.scheduler = new Scheduler.Simple();
    this.eventBus = new EventBus();
    this.eventBus.subscribe(this);
    this.entities = new Set();
    this.lock = false;
  }

  run() {
    this.map = new Map(this);
    this.player = this.addEntity(new Player(this, new Cord(10, 10)));
    for (let i = 0; i < 10; i += 1) {
      this.addEntity(new Box(this, new Cord(12, 10 + i)));
    }

    this.loop();
  }

  loop() {
    while (!this.lock) {
      this.eventBus.loop();
      const actor = this.scheduler.next();
      if (!actor) {
        break;
      }
      actor.act();
    }
  }

  waitInput() {
    this.render();
    this.lock = true;
    window.addEventListener('keydown', this);
  }

  emit(e) {
    this.eventBus.emit(e);
  }

  handleEvent(event) {
    const inputEvent = new InputEvent(this, event.keyCode);
    this.emit(inputEvent);
    window.removeEventListener('keydown', this);
    this.lock = false;
    this.loop();
  }

  render() {
    this.display.clear();
    const offset = this.player.cord.sub(new Cord(40, 15));
    this.map.render(offset);
    for (const e of this.entities) {
      e.render(offset);
    }
  }

  redrawBackground(cord) {
    //this.map.redrawTile(cord);
  }

  addEntity(entity) {
    this.entities.add(entity);
    if (entity.act) {
      this.scheduler.add(entity, true);
    }
    if (entity.onEvent) {
      this.eventBus.subscribe(entity);
    }
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

  // eslint-disable-next-line class-methods-use-this
  onEvent(e) {
    console.log(e.toString());
  }
}
