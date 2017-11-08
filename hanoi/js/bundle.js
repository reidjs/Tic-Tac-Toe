/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const HanoiGame = __webpack_require__(1);
const HanoiView = __webpack_require__(2);
$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Game {
  constructor() {
    this.towers = [[3, 2, 1], [], []];
  }

  isValidMove(startTowerIdx, endTowerIdx) {
      const startTower = this.towers[startTowerIdx];
      const endTower = this.towers[endTowerIdx];

      if (startTower.length === 0) {
        return false;
      } else if (endTower.length == 0) {
        return true;
      } else {
        const topStartDisc = startTower[startTower.length - 1];
        const topEndDisc = endTower[endTower.length - 1];
        return topStartDisc < topEndDisc;
      }
  }

  isWon() {
      // move all the discs to the last or second tower
      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  }

  move(startTowerIdx, endTowerIdx) {
      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
        return true;
      } else {
        return false;
      }
  }

  print() {
      console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
      this.print();
      reader.question("Enter a starting tower: ", start => {
        const startTowerIdx = parseInt(start);
        reader.question("Enter an ending tower: ", end => {
          const endTowerIdx = parseInt(end);
          callback(startTowerIdx, endTowerIdx);
        });
      });
  }

  run(reader, gameCompletionCallback) {
      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
        if (!this.move(startTowerIdx, endTowerIdx)) {
          console.log("Invalid move!");
        }

        if (!this.isWon()) {
          // Continue to play!
          this.run(reader, gameCompletionCallback);
        } else {
          this.print();
          console.log("You win!");
          gameCompletionCallback();
        }
      });
  }
}

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class View {
  constructor(game, $el) {
    this.game = game;
    this.selectedTower = -1;
    $el.append(this.setupTowers());
    this.render();
    this.bindClicks();
  }

  setupTowers() {
    for(let i = 0; i < 3; i++) {
      let $ul = $("<ul></ul>");
      $ul.attr("id", i);
      $('.hanoi').append($ul);
    }
    for(let i = 3; i > 0; i--) {
      let $li = $("<li></li>");
      // $li.data("stackidx", i);
      $li.attr('id', i);
      $li.addClass(`empty`);
      $('ul').append($li);
    }
  }

  render() {
    let towers = this.game.towers;
    for(let i = 0; i < towers.length; i++) {
      let stack = $($('ul')[i]).children();
      stack = $(Array.from(stack).reverse());
      let discs = towers[i].reverse();
      console.log(towers[i].reverse());
      for(let j = 0; j < 3; j++) {
        if (towers[i][j]) {
          $(stack[j]).addClass(`disc-size-${towers[i][j]}`);
          $(stack[j]).addClass(`disc`);
          $(stack[j]).removeClass(`empty`);
        } else {
          $(stack[j]).removeClass();
          $(stack[j]).addClass(`empty`);
        }
          // $li.addClass(`disc-size-${towers[i][j-1]}`);
      }
      if (this.game.isWon()) {
        $('ul').off("click");
        $('li.disc').addClass("won");
      }
    }
    // $('li').addClass('empty');
    // $('li').removeClass('disc').removeClass('disc-size-3').removeClass('disc-size-2').removeClass('disc-size-1');
    // for(let i = 0; i < towers.length; i++) {
    //   for(let j = 3; j > 0; j--) {
    //     // $(towers[i]).children(`li#${j}`);
    //     let $li = $(`li#${j}`);
    //     if (towers[i][j-1]) {
    //       $li.removeClass(`empty`);
    //       $li.addClass(`disc-size-${towers[i][j-1]}`);
    //       $li.addClass(`disc`);
    //     }
    //   }
    // }
  }

  bindClicks() {
    $('ul').on("click", "li", (e) => {
      this.clickTower(e);
    });
  }

  clickTower(e) {
    if (this.selectedTower < 0) {
      this.selectedTower = Number($(e.target).parent().attr("id"));
      console.log('selected');
    } else {
      this.game.move(this.selectedTower, Number($(e.target).parent().attr("id")));
      this.selectedTower = -1;
      this.render();
      console.log(this.game.towers);
    }
  }

}

module.exports = View;


/***/ })
/******/ ]);