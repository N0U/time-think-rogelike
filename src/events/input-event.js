import Event from './event';

export default class InputEvent extends Event{
  constructor(source, keyCode, callback) {
    super(source, callback);
    this.keyCode = keyCode;
  }
}
