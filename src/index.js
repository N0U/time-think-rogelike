import { Display } from 'rot-js';

const options = {
  width: 100,
  height: 30,
};

const display = new Display(options);

document.getElementById('root').appendChild(display.getContainer());

for (let i = 0; i<options.width; i++) {
  for (let j=0; j<options.height; j++) {
    if (!i || !j || i+1 === options.width || j+1 === options.height) {
      display.draw(i, j, "#", "gray");
    } else {
      display.draw(i, j, ".", "#666");
    }
  }
}
display.draw(options.width >> 1, options.height >> 1, "@", "goldenrod");
