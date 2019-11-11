import GameEvent from './game-event';

export default interface EventListener {
  onEvent(event: GameEvent);
}
