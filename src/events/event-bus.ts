import GameEvent from './game-event';
import EventListener from './event-listener';

export default class EventBus {
  private queue: GameEvent[];
  private listeners: Set<EventListener>;

  constructor() {
    this.queue = [];
    this.listeners = new Set();
  }

  subscribe(listener: EventListener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener: EventListener) {
    this.listeners.delete(listener);
  }

  emit(event: GameEvent) {
    this.queue.push(event);
  }

  loop() {
    while (this.queue.length > 0) {
      const e = this.queue.shift();
      for (const l of this.listeners) {
        l.onEvent(e);
      }
    }
  }
}
