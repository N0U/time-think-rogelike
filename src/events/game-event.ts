import EventListener from './event-listener';

export default class GameEvent {
  readonly source: EventListener;
  constructor(source: EventListener) {
    this.source = source;
  }

  toString(): string {
    return `${this.constructor.name} ${this.source.constructor.name}`;
  }
}
