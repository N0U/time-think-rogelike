import { Display, KEYS, Scheduler } from 'rot-js';
import Cord from './utils/cord';
import EventBus from './event-bus';
import MoveInputEvent from './events/move-input-event';
import Player from './actors/player/player';
import TimeMachine from './time-machine';
import DisplayDrawer from './graphics/display-drawer';
import Drawer from './graphics/drawer';
import LevelLoader from './level-loader';

export default class Game {
  constructor() {
    this.drawer = new DisplayDrawer();
    this.gameDrawer = new Drawer(this.drawer);
    this.uiDrawer = new Drawer(this.drawer);
    this.scheduler = new Scheduler.Simple();
    this.eventBus = new EventBus();
    this.eventBus.subscribe(this);
    this.entities = new Set();
    this.timeMachine = new TimeMachine(10);
    this.lock = false;
    this.timeTravel = null;
    this.levelLoad = new LevelLoader(this);
  }

  run() {
    this.levelLoad.getLevel(0)
      .then((level) => {
        this.map = new level.Map(this);
        level.run(this);
        this.player = this.addEntity(new Player(this, new Cord(10, 10)));
        this.loop();
      });
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
    this.draw();
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
        this.timeMachine.saveWorld();
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
      this.draw();
    }
  }

  draw() {
    this.drawer.clear();
    this.gameDrawer.offset = this.player.cord.sub(new Cord(40, 15));
    this.map.draw(this.gameDrawer);
    for (const e of this.entities) {
      e.draw(this.gameDrawer);
    }

    // UI draw
    const color = this.timeTravel !== null ? 'blue' : 'white';
    const pos = this.timeMachine.getHistoryLength() - (this.timeTravel || 0) - 1;
    this.uiDrawer.draw(new Cord(1, 0), '[', color, 'gray');
    let i;
    for (i = 0; i < this.timeMachine.getHistoryLength(); i += 1) {
      this.uiDrawer.draw(new Cord(2 + i, 0), pos === i ? '@' : '*', color, 'gray');
    }
    this.uiDrawer.draw(new Cord(2 + i, 0), ']', color, 'gray');
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
