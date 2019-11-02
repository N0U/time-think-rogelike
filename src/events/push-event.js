import Event from './event';

export default class PushEvent extends Event {
  constructor(source, entity, direction) {
    super(source);
    this.entity = entity;
    this.direction = direction;
  }
}
