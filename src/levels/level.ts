import Game from "../game";
import GameMap from "../game-map";
import Action from "../actors/action";
import EventListener from '../events/event-listener';

export interface Level extends EventListener {
  readonly map: GameMap;
}

export interface LevelConstructor {
  new(game: Game): Level;
}
