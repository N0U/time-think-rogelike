import Box from '../../actors/box';
import Cord from '../../utils/cord';
import Level1Map from './map';
import {BaseLevel} from "../abc";

export default class Level extends BaseLevel{
  constructor(game) {
    super(game);
    this.game = game;
    this.Map = Level1Map;
    this.actions = [];
  }

  run() {
    for (let i = 0; i < 10; i += 1) {
      this.game.addEntity(new Box(this.game, new Cord(12, 10 + i)));
    }
  }
}
