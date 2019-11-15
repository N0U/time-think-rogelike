import Box from '../../actors/box';
import Cord from '../../utils/cord';
import {BaseLevel, GameConstructor} from "../abc";
import Game from "../../game";
import Action from "../../actors/action";
import GameMap, {Tile} from "../../game-map";
import Player from "../../actors/player/player";

export default class Level1 extends BaseLevel {
    game: Game;
    actions: Action[];
    Map: GameConstructor;

    constructor(game: Game) {
        super(game);
        this.game = game;
        this.Map = GameMap;
        this.actions = [];
    }

    run() {
        this.game.addEntity(new Player(this.game, new Cord(10, 10)));
        for (let i = 0; i < 10; i += 1) {
            this.game.addEntity(new Box(this.game, new Cord(12, 10 + i)));
        }
    }
}
