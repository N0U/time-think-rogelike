import Serializable from './serializable';

export default class TimeMachine {
  private maxLength: number;
  private serializables: Set<Serializable>;
  private worldSnapshots: Map<Serializable, any>[];

  constructor(maxLength) {
    this.maxLength = maxLength;
    this.serializables = new Set();
    this.worldSnapshots = [];
  }

  add(o: Serializable) {
    this.serializables.add(o);
  }

  saveWorld() {
    const snapshot = new Map();
    for (const s of this.serializables) {
      snapshot.set(s, s.serialize());
    }
    this.worldSnapshots.push(snapshot);
    if (this.worldSnapshots.length > this.maxLength) {
      this.worldSnapshots.shift();
    }
  }

  restoreWorld(n: number) {
    const snapshot = this.worldSnapshots[this.worldSnapshots.length - n - 1];
    if (!snapshot) {
      throw new Error(`Invalid snapshot number: ${n}`);
    }
    for (const [key, value] of snapshot) {
      key.deserialize(value);
    }
  }

  forgetAfter(n: number) {
    if (n > this.worldSnapshots.length) {
      throw new Error('Cannot forget more elements than there are in history');
    }
    this.worldSnapshots = this.worldSnapshots.slice(0, this.worldSnapshots.length - n - 1);
  }

  getHistoryLength(): number {
    return this.worldSnapshots.length;
  }
}
