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
