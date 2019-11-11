import Game from "../game";
import GameMap from "../game-map";
import Action from "../actors/action";

export interface LevelConstructor {
    new(game: Game): BaseLevel;
}

export interface GameConstructor {
    new(p: Game): GameMap;
}

export class BaseLevel {
    game: Game;
    Map : GameConstructor;
    actions: Action[];

    constructor(game){

    }

    run(){

    }
}
