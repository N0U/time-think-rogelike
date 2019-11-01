import Entity from './entity';

export default class Box extends Entity {
  constructor(game, cord) {
    super(game, cord, 'X');
  }

  push(dir) {
    const newCord = this.cord.moveToDirection(dir);
    const collision = this.game.checkCollision(newCord);
    if (!collision) {
      this.cord = newCord;
      this.draw();
      return true;
    }
    return false;
  }
}
