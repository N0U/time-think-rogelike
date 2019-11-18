import Entity from "./entity";
import Cord from "../utils/cord";
import Game from "../game";
import GameEvent from "../events/game-event";

export default class Terminal extends Entity {
  constructor(game: Game,cord: Cord) {
    super(game, cord, 'T', 'orange');
  }

  onEvent(event: GameEvent): boolean {
    if (super.onEvent(event)) {
      return true;
    }

    return false;
  }
}
