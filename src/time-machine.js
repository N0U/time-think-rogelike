export default class TimeMachine {
  constructor() {
    this.serializables = new Set();
    this.worldSnapshots = [];
  }

  add(o) {
    if (typeof o.serialize !== 'function' || typeof o.deserialize !== 'function') {
      throw new Error('Invalid serializable object');
    }
    this.serializables.add(o);
  }

  saveWorld() {
    const snapshot = new Map();
    for (const s of this.serializables) {
      snapshot.set(s, s.serialize());
    }
    this.worldSnapshots.push(snapshot);
  }

  restoreWorld(n) {
    const snapshot = this.worldSnapshots[this.worldSnapshots.length - n - 1];
    if (!snapshot) {
      throw new Error(`Invalid snapshot number: ${n}`);
    }
    for (const [ key, value ] of snapshot) {
      key.deserialize(value);
    }
  }

  forgetAfter(n) {
    if (n > this.worldSnapshots.length) {
      throw new Error(`Cannot forget more elements than there are in history`);
    }
    this.worldSnapshots = this.worldSnapshots.slice(0, this.worldSnapshots.length - n);
  }

  getHistoryLength() {
    return this.worldSnapshots.length;
  }
}
