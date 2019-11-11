import Entity from '../entity';
import MoveInputEvent from '../../events/move-input-event';
import MoveAction from './move-action';
import Cord from '../../utils/cord';
import Game from '../../game';
import Actor from '../actor';
import Drawer from "../../graphics/drawer";
import GameEvent from '../../events/game-event';

export default class Player extends Entity implements Actor {
  private prevCord: Cord;

  constructor(game: Game, cord: Cord) {
    super(game, cord, '@');
    this.prevCord = null;
  }

  act() {
    this.game.waitInput();
  }

  draw(drawer: Drawer) {
    super.draw(drawer);

    if (this.prevCord) {
      drawer.draw(this.prevCord, this.symbol, 'blue');
    }
  }

  onEvent(event: GameEvent) {
    if (super.onEvent(event)) {
      return true;
    }

    if (event instanceof MoveInputEvent) {
      const inputEvent = event as MoveInputEvent;
      this.prevCord = null;
      const action = new MoveAction(this, inputEvent.direction);
      action.perform();
      this.actions.push(action);
      return true;
    }
    return false;
  }

  move(cord) {
    this.cord = cord;
  }

  deserialize(o) {
    this.prevCord = o.cord;
  }
}
