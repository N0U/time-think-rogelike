import { cordsInRectangle } from './utils/cord';

export default class Map {
  constructor(game) {
    this.game = game;
    this.map = {};
    this.minX = 0;
    this.minY = 0;
    this.maxX = 0;
    this.maxY = 0;
    for (const c of cordsInRectangle(0, 0, 50, 50)) {
      if (c.x === 0 || c.y === 0 || c.x === 50 || c.y === 50) {
        this.set(c, { isWall: true, symbol: '#' });
      } else {
        this.set(c, { isWall: false, symbol: '.', fgColor: 'gray' });
      }
    }
  }

  set(cord, {
    isWall = false, symbol, bgColor = 'black', fgColor = 'white',
  }) {
    this.minX = Math.min(this.minX, cord.x);
    this.minY = Math.min(this.minY, cord.y);
    this.maxX = Math.max(this.maxX, cord.x);
    this.maxY = Math.max(this.maxY, cord.y);

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

  render(offset) {
    for (const c of cordsInRectangle(this.minX, this.minY, this.maxX, this.maxY)) {
      const tile = this.getTile(c);
      if (tile) {
        const gCord = c.sub(offset);
        this.game.display.draw(gCord.x, gCord.y, tile.symbol, tile.fgColor, tile.bgColor);
      }
    }
  }

  isFree(cord) {
    const tile = this.getTile(cord);
    return !tile || !tile.isWall;
  }
}
