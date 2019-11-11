import GameEvent from '../events/game-event';

export default interface Action {
  perform();
  onEvent(event: GameEvent): boolean;
}
