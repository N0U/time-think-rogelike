import Cord, {cordsInRectangle} from './utils/cord';
import Game from './game';
import Drawer from './graphics/drawer';

export class Tile {
  isWall: boolean;
  symbol: string;
  bgColor: string;
  fgColor: string;

  constructor({isWall = false, symbol = '', bgColor = 'black', fgColor = 'white'}) {
    this.isWall = isWall;
    this.symbol = symbol;
    this.bgColor = bgColor;
    this.fgColor = fgColor;
  }
}

export default class GameMap {
  readonly game: Game;
  protected map: any;
  protected minX: number;
  protected minY: number;
  protected maxX: number;
  protected maxY: number;

  constructor(game: Game) {
    this.game = game;
    this.map = {};
    this.minX = 0;
    this.minY = 0;
    this.maxX = 0;
    this.maxY = 0;
    for (const c of cordsInRectangle(0, 0, 50, 50)) {
      if (c.x === 0 || c.y === 0 || c.x === 50 || c.y === 50) {
        this.set(c, new Tile({isWall:true, symbol:'#'}));
      } else {
        this.set(c, new Tile({isWall:false, symbol:'.', bgColor:'black', fgColor:'gray'}));
      }
    }
  }

  set(cord: Cord, tile: Tile) {
    this.minX = Math.min(this.minX, cord.x);
    this.minY = Math.min(this.minY, cord.y);
    this.maxX = Math.max(this.maxX, cord.x);
    this.maxY = Math.max(this.maxY, cord.y);

    this.map[cord.toId()] = tile;
  }

  getTile(cord: Cord): Tile {
    return this.map[cord.toId()];
  }

  draw(drawer: Drawer) {
    for (const c of cordsInRectangle(this.minX, this.minY, this.maxX, this.maxY)) {
      const tile = this.getTile(c);
      if (tile) {
        drawer.draw(c, tile.symbol, tile.fgColor, tile.bgColor);
      }
    }
  }

  isFree(cord: Cord): boolean {
    const tile = this.getTile(cord);
    return !tile || !tile.isWall;
  }
}
