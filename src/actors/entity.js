import _ from 'lodash';

export default class Entity {
  constructor(game, cord, symbol, color = 'white') {
    this.game = game;
    this.cord = cord;
    this.symbol = symbol;
    this.color = color;
    this.actions = [];
  }

  render(offset) {
    const gCord = this.cord.sub(offset);
    this.game.display.draw(gCord.x, gCord.y, this.symbol, this.color);
  }

  resetActions() {
    this.actions = [];
  }

  onEvent(event) {
    for (const a of this.actions) {
      if (a.onEvent(event)) {
        return true;
      }
    }
    return false;
  }
}
