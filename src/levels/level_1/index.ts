import Box from '../../actors/box';
import Cord from '../../utils/cord';
import {Level} from "../level";
import Game from "../../game";
import GameMap, {Tile} from "../../game-map";
import Player from "../../actors/player/player";
import GameEvent from "../../events/game-event";

export default class Level1 implements Level {
  readonly game: Game;
  readonly map: GameMap;

  constructor(game: Game) {
    this.game = game;
    this.map = new GameMap(game);

    this.game.addEntity(new Player(this.game, new Cord(1, 1)));
    this.game.addEntity(new Box(this.game, new Cord(3, 1)));
  }

  onEvent(event: GameEvent) {
  }
}
