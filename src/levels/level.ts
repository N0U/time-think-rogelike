import * as Papa from 'papaparse';
import Game from "../game";
import GameMap, {Tile} from "../game-map";
import EventListener from '../events/event-listener';
import Cord from "../utils/cord";
import Entity from "../actors/entity";
import Box from "../actors/box";
import Player from "../actors/player/player";
import GameEvent from "../events/game-event";

export abstract class Level implements EventListener {
  readonly game: Game;
  readonly map: GameMap;
  readonly entities: any;

  protected constructor(game, csv) {
    this.game = game;
    this.map = new GameMap(game);
    this.entities = {};

    const result = Papa.parse(csv);
    if(result.data) {
      for(let i = 0; i < result.data.length; i += 1) {
        for(let j = 0; j < result.data[i].length; j += 1) {
          const cord = new Cord(j, i);
          const c: string[] = result.data[i][j].trim().split(' ');
          switch(c[0]) {
            case '#':
              this.map.set(cord, new Tile(true, '#', 'black', 'white'));
              break;
            case 'X':
              this.addEntity(new Box(game, cord), c[1]);
              break;
            case '@':
              this.addEntity(new Player(game, cord), 'player');
              break;
          }
        }
      }
    }
  }

  private addEntity(entity: Entity, name?: string) {
    this.game.addEntity(entity);
    if(name) {
      this.entities[name] = entity;
    }
  }

  abstract onEvent(event: GameEvent);
}

export interface LevelConstructor {
  new(game: Game): Level;
}
