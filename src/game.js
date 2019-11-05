import {Display, KEYS, Scheduler} from 'rot-js';
import Cord from './utils/cord';
import EventBus from './event-bus';
import MoveInputEvent from './events/move-input-event';
import Map from './map';
import Player from './actors/player/player';
import Box from './actors/box';
import TimeMachine from './time-machine';

export default class Game {
  constructor() {
    this.display = new Display({ width: 80, height: 30 });
    this.scheduler = new Scheduler.Simple();
    this.eventBus = new EventBus();
    this.eventBus.subscribe(this);
    this.entities = new Set();
    this.timeMachine = new TimeMachine();
    this.lock = false;
    this.timeTravel = null;
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
      this.entities.forEach((e) => e.resetActions());
      const actor = this.scheduler.next();
      if (!actor) {
        break;
      }
      actor.act();
    }
  }

  waitInput() {
    this.timeMachine.saveWorld();
    this.render();
    this.lock = true;
    window.addEventListener('keydown', this);
  }

  emit(e) {
    this.eventBus.emit(e);
  }

  handleEvent(event) {
    const keyMap = {};
    keyMap[KEYS.VK_UP] = 0;
    keyMap[KEYS.VK_RIGHT] = 1;
    keyMap[KEYS.VK_DOWN] = 2;
    keyMap[KEYS.VK_LEFT] = 3;
    if (event.keyCode in keyMap) {
      if (this.timeTravel) {
        this.timeMachine.forgetAfter(this.timeTravel);
        this.timeTravel = null;
      }

      const moveInputEvent = new MoveInputEvent(this, keyMap[event.keyCode]);
      this.emit(moveInputEvent);
      window.removeEventListener('keydown', this);
      this.lock = false;
      this.loop();
      return;
    }

    if (event.keyCode === KEYS.VK_Q && this.timeTravel === null) {
      this.timeTravel = 0;
    }

    if (this.timeTravel !== null) {
      switch (event.keyCode) {
        case KEYS.VK_Q:
          if (this.timeMachine.getHistoryLength() > this.timeTravel + 1) {
            this.timeTravel += 1;
          }
          break;
        case KEYS.VK_W:
          if (this.timeTravel > 0) {
            this.timeTravel -= 1;
          }
          break;
      }
      this.timeMachine.restoreWorld(this.timeTravel);
      this.render();
    }
  }

  render() {
    this.display.clear();
    const offset = this.player.cord.sub(new Cord(40, 15));
    this.map.render(offset);
    for (const e of this.entities) {
      e.render(offset);
    }

    // UI render
    const color = this.timeTravel !== null ? 'blue' : 'white';
    const pos = this.timeMachine.getHistoryLength() - (this.timeTravel || 0) - 1;
    this.display.draw(1, 0, '[', color, 'gray');
    let i;
    for (i = 0; i < this.timeMachine.getHistoryLength(); i += 1) {
      this.display.draw(2 + i, 0, pos === i ? '@' : '*', color, 'gray');
    }
    this.display.draw(2 + i, 0, ']', color, 'gray');
  }

  addEntity(entity) {
    this.entities.add(entity);
    this.timeMachine.add(entity);
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
