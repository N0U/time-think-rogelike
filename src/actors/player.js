export default class Player {
  constructor(game, x, y) {
    this.game = game;
    this.prevX = x;
    this.prevY = y;
    this.x = x;
    this.y = y;
    this.draw();
  }

  draw() {
    if(this.prevX !== this.prevX || this.prevY !== this.prevY) {
      this.game.redrawBackground(this.prevX, this.prevY);
    }
    this.game.display.draw(this.x, this.y, '@');
  }
}
