import GameEvent from './game-event';
import EventListener from './event-listener';
import Entity from '../actors/entity';

export default class PushEvent extends GameEvent {
  readonly entity: Entity;
  readonly direction: number;

  constructor(source: EventListener, entity: Entity, direction: number) {
    super(source);
    this.entity = entity;
    this.direction = direction;
  }
}
