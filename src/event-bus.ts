export default class EventBus {
  constructor() {
    this.queue = [];
    this.listiners = new Set();
  }

  subscribe(l) {
    if (!l.onEvent) {
      throw new Error('Invalid subscriber');
    }
    this.listiners.add(l);
  }

  emit(e) {
    this.queue.push(e);
  }

  loop() {
    while (this.queue.length > 0) {
      const e = this.queue.shift();
      for (const l of this.listiners) {
        l.onEvent(e);
      }
    }
  }
}
