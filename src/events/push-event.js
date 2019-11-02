import Event from './event';

export default class PushEvent extends Event {
  constructor(source, entity, direction, callback) {
    super(source, callback);
    this.entity = entity;
    this.direction = direction;
  }
}
