export default class Event {
  constructor(source) {
    this.source = source;
  }

  toString() {
    return `${this.constructor.name} ${this.source.constructor.name}`;
  }
}
