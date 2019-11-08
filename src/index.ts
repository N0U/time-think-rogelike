import Game from './game';

const game = new Game();

game.onInit((game) => document.getElementById('root')
  .appendChild(game.drawer.display.getContainer()));


game.run();
