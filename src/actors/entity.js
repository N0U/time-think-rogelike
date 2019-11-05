export default class Entity {
  constructor(game, cord, symbol, color = 'white') {
    this.game = game;
    this.cord = cord;
    this.symbol = symbol;
    this.color = color;
    this.actions = [];
    this.dead = false;
  }

  draw(drawer) {
    drawer.draw(this.cord, this.symbol, this.color);
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

  serialize() {
    const { cord, symbol, color, dead } = this;
    return {
      cord,
      symbol,
      color,
      dead,
    };
  }

  deserialize(o) {
    this.cord = o.cord;
    this.symbol = o.symbol;
    this.color = o.color;
    this.dead = o.dead;
  }
}
