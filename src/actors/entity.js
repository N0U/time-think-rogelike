export default class Entity {
  constructor(game, cord, symbol, color = 'white') {
    this.game = game;
    this.prevCord = cord;
    this.cord = cord;
    this.symbol = symbol;
    this.color = color;
    this.draw();
  }

  draw() {
    if (!this.prevCord.equals(this.cord)) {
      this.game.redrawBackground(this.prevCord);
    }
    this.game.display.draw(this.cord.x, this.cord.y, this.symbol, this.color);
    this.prevCord = this.cord;
  }
}
