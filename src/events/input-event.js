import Event from './event';

export default class InputEvent extends Event {
  constructor(source, keyCode) {
    super(source);
    this.keyCode = keyCode;
  }
}
