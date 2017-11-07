const View = require("./ttt-view.js");
const Game = require("../nodettt/game.js");

$( () => {
  // Your code here
  let game = new Game();
  let $container = $('.ttt');
  let view = new View(game, $container);
  view.bindEvents();
});
