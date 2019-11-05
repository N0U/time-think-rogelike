import Game from './game';

const game = new Game();
document.getElementById('root').appendChild(game.drawer.display.getContainer());

game.run();
