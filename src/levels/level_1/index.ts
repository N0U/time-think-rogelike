import Box from '../../actors/box';
import Cord from '../../utils/cord';
import Level1Map from './map';

export default class Level {
  constructor(gameEngine) {
    this.gameEngine = gameEngine;
    this.Map = Level1Map;
    this.actiions = [];
  }

  run() {
    for (let i = 0; i < 10; i += 1) {
      this.gameEngine.addEntity(new Box(this.gameEngine, new Cord(12, 10 + i)));
    }
  }

  eventHandler(event) {

  }
}
