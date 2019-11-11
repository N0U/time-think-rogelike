import Game from '../game';
import Cord from '../utils/cord';
import Action from './action';
import GameEvent from '../events/game-event';
import EventListener from '../events/event-listener';
import Drawer from '../graphics/drawer';
import Serializable from '../time-machine/serializable';

export default class Entity implements EventListener, Serializable {
  readonly game: Game;
  cord: Cord;
  symbol: string;
  color: string;
  actions: Action[];
  dead: boolean;

  constructor(game, cord, symbol, color = 'white') {
    this.game = game;
    this.cord = cord;
    this.symbol = symbol;
    this.color = color;
    this.actions = [];
    this.dead = false;
  }

  draw(drawer: Drawer) {
    drawer.draw(this.cord, this.symbol, this.color);
  }

  resetActions() {
    this.actions = [];
  }

  onEvent(event: GameEvent) {
    for (const a of this.actions) {
      if (a.onEvent(event)) {
        return true;
      }
    }
    return false;
  }

  serialize(): any {
    const { cord, symbol, color, dead } = this;
    return {
      cord,
      symbol,
      color,
      dead,
    };
  }

  deserialize(o: any) {
    this.cord = o.cord;
    this.symbol = o.symbol;
    this.color = o.color;
    this.dead = o.dead;
  }
}
