import _ from 'lodash';

export default class Entity {
  constructor(game, cord, symbol, color = 'white') {
    this.game = game;
    this.prevCord = cord;
    this.cord = cord;
    this.symbol = symbol;
    this.color = color;
    this._call_action = [];
    this.actions = {};
    this.draw();
  }

  draw() {
    if (!this.prevCord.equals(this.cord)) {
      this.game.redrawBackground(this.prevCord);
    }
    this.game.display.draw(this.cord.x, this.cord.y, this.symbol, this.color);
    this.prevCord = this.cord;
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
