import Game from './game';

const game = new Game();
document.getElementById('root').appendChild(game.display.getContainer());

game.run();
