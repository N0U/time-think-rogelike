import _ from 'lodash';

export default class Entity {
  constructor(game, cord, symbol, color = 'white') {
    this.game = game;
    this.cord = cord;
    this.symbol = symbol;
    this.color = color;
    this._call_action = [];
    this.actions = {};
  }

  render(offset) {
    const gCord = this.cord.sub(offset);
    this.game.display.draw(gCord.x, gCord.y, this.symbol, this.color);
  }

  onEvent(onEvent) {
    this.runEvent('', onEvent);
  }

  runEvent(eventType, event) {
    this.actions[eventType] && this.actions[eventType].forEach((actionClass) => {
      // eslint-disable-next-line new-cap
      const action = new actionClass(this);
      this._call_action.push(action);
      action.perform(event);
    });
  }
}
