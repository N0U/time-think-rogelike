export default class Event {
  constructor(source, callback) {
    this.source = source;
    this.callback = callback;
  }

  toString() {
    return `${this.constructor.name} ${this.source.constructor.name}`;
  }

  done(results) {
    if (this.callback) {
      this.callback(results);
    }
  }
}
