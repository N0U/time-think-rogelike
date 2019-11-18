import Box from '../../actors/box';
import Cord from '../../utils/cord';
import {Level} from "../level";
import Game from "../../game";
import GameMap, {Tile} from "../../game-map";
import Player from "../../actors/player/player";
import GameEvent from "../../events/game-event";
import Level1Csv from '../../assets/level1.csv';
import PushEvent from "../../events/push-event";

export default class Level1 extends Level {

  constructor(game: Game) {
    super(game, Level1Csv);
  }

  onEvent(event: GameEvent) {
  }
}
