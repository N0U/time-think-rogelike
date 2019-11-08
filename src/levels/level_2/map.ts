import * as ROT from 'rot-js';
import Cord from '../../utils/cord';
import GameMap, {Tile} from "../../game-map";
import Game from "../../game";
import {DisplayOptions} from "../../../node_modules/rot-js/lib/display/types";
import Cellular from "../../../node_modules/rot-js/lib/map/cellular";

export default class Level1Map extends GameMap {
  dispalyOptions: DisplayOptions;
  cellular: Cellular;

  constructor(game: Game) {
    super(game);
    this.map = {};
    this.dispalyOptions = game.drawer.display.getOptions();
    this.dispalyOptions.layout = 'hex';
    this.dispalyOptions.width = 300;
    this.dispalyOptions.height = 100;
    this.dispalyOptions.fontSize = 10;
    game.drawer.display.setOptions(this.dispalyOptions);
    this.game.refrech();
    this.cellular = new ROT.Map.Cellular(this.dispalyOptions.width, this.dispalyOptions.height, {
      topology: 6,
      born: [4, 5, 6],
      survive: [3, 4, 5, 6],
    });

    this.initCellular();
    this.draw(game.drawer);
  }

  * genDescendingSequence() {
    let {width, height} = this.dispalyOptions;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        yield [i, j, i / width - 0.5, j / height - 0.5];
      }
    }
  }

  initCellular() {
    /* initialize with irregularly random values */
    for (const [i, j, dx, dy] of this.genDescendingSequence()) {
      let dist = Math.pow(dx * dx + dy * dy, 0.3);
      if (ROT.RNG.getUniform() < dist) {
        this.cellular.set(i, j, 1);
      }
    }
    const colors = [this.dispalyOptions.bg, this.dispalyOptions.fg];
    for (let i = 4; i >= 0; i--) {
      this.cellular.create(i ? null : (i, j, what) => {
        this.set(new Cord(i, j), new Tile({
          isWall: false,
          bgColor: colors[what % colors.length]
        }));
      });
    }
  }
}
