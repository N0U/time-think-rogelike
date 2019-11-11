import Box from '../../actors/box';
import Cord from '../../utils/cord';
import {BaseLevel, GameConstructor} from "../abc";
import Game from "../../game";
import Action from "../../actors/action";
import GameMap from "../../game-map";

export default class Level extends BaseLevel {
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
        for (let i = 0; i < 10; i += 1) {
            this.game.addEntity(new Box(this.game, new Cord(12, 10 + i)));
        }
    }
}
