import Level from './levels/level_1';
import Level2 from './levels/level_2';
import Game from "./game";
import {BaseLevel, LevelConstructor} from "./levels/abc";

const levels: LevelConstructor[] = [];

export default class LevelLoader {
    public currentLevel: BaseLevel | undefined;
    public currentNum: number | undefined;

    constructor(public game: Game) {
        this.game = game;
        this.currentLevel = undefined;
        this.currentNum = undefined;
    }

    getLevel(number: number): Promise<BaseLevel> {
        if (number === this.currentNum) {
            return Promise.resolve(this.currentLevel);
        }
        this.currentNum = number;
        if (!levels[number]) {
            return new Promise((resolve, reject) => {
                resolve(this.currentLevel = new levels[number](this.game));
            });
        }
        this.currentLevel = new levels[number](this.game);
        return Promise.resolve(this.currentLevel);
    }
}

function register(level: LevelConstructor) {
    levels.push(level);
};


register(Level);
register(Level2);
