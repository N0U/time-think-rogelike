import { cordsInRectangle } from './cord';

export default class Map {
  constructor(game) {
    this.game = game;
    this.map = {};

    for (const c of cordsInRectangle(0, 0, 50, 50)) {
      if (c.x === 0 || c.y === 0 || c.x === 49 || c.y === 49) {
        this.set(c, { isWall: true, symbol: '#' });
        this.redrawTile(c);
      }
    }
  }

  set(cord, {
    isWall = false, symbol, bgColor = 'black', fgColor = 'white',
  }) {
    this.map[cord.toId()] = {
      isWall,
      symbol: symbol || (isWall ? '#' : ' '),
      bgColor,
      fgColor,
    };
  }

  getTile(cord) {
    return this.map[cord.toId()];
  }

  redrawTile(cord) {
    const tile = this.getTile(cord);
    if (tile) {
      this.game.display.draw(cord.x, cord.y, tile.symbol, tile.fgColor, tile.bgColor);
    } else {
      this.game.display.draw(cord.x, cord.y, ' ');
    }
  }
}
