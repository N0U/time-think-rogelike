import Level1 from './levels/level_1';
import Game from "./game";
import {Level, LevelConstructor} from "./levels/level";

const LEVELS: LevelConstructor[] = [
  Level1,
];

export default class LevelLoader {
  private currentLevelIndex: number;

  constructor() {
    this.currentLevelIndex = 0;
  }

  get levelIndex(): number {
    return this.currentLevelIndex;
  }

  loadLevel(game: Game): Level {
    const NextLevel = LEVELS[this.currentLevelIndex];
    return new NextLevel(game);
  }

  nextLevel() {
    this.currentLevelIndex += 1;
  }
}
