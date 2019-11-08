import Level from './levels/level_1';

const levels = [];

export default class LevelLoader {
  constructor(engine) {
    this.engine = engine;
    this.currentLevel = undefined;
    this.currentNum = undefined;
  }

  getLevel(number) {
    if (number === this.currentNum) {
      return this.currentLevel;
    }
    this.currentNum = number;
    if (!levels[number]) {
      return new Promise((resolve, reject) => {
        resolve(this.currentLevel = new levels[number](this.engine));
      });
    }
    this.currentLevel = new levels[number](this.engine);
    return Promise.resolve(this.currentLevel);
  }
}

function register(level) {
  levels.push(level);
};


register(Level);
