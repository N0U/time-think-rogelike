export default class Event {
  constructor(source) {
    this.source = source;
    this.data = {};
  }

  toString() {
    return `${this.constructor.name} ${this.source.constructor.name}`;
  }
}
