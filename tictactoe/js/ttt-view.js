class View {
  constructor(game, $el) {
    $el.append(this.setupBoard());
    this.game = game;
    this.xturn = true;
  }

  bindEvents() {
    let $lis = $('li');
    $lis.on("click", (e) => {
      // debugger;
      this.game.playMove($(e.currentTarget).data("pos"));
      this.makeMove($(e.currentTarget));
    });
  }

  makeMove($square) {
    // debugger;
    if (this.xturn) {
      $square.addClass("played");
      $square.removeClass("unplayed");
      $square.append("<h1>x</h1>");
      this.xturn = false;
    } else {
      $square.addClass("played");
      $square.removeClass("unplayed");
      $square.append("<h1>o</h1>");
      this.xturn = true;
    }
    let winner = this.game.winner();
    if (winner) {
      $('li').off("click");
      $('li').each(function(i, el) {
        // debugger
        if ($(el).text() === winner) {
          // $(el).removeClass("played");
          $(el).addClass("winner");
        } else {
          // $(el).removeClass("played");
          $(el).addClass("loser");
        }
      });
      let h3 = `<h3>${winner} wins the game!</h3>`;
      $('body').append(h3);
    }
    if(this.game.isOver() && !winner) {
      $('li').each(function(i, el) {
        $(el).addClass("loser");
      });
      let h3 = `<h3>it's a draw!</h3>`;
      $('body').append(h3);
    }

  }

  setupBoard() {
    let $grid = $("<ul></ul>");
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        let t = $("<li></li>");
        t.addClass("unplayed");
        t.data("pos", [i, j]);
        $grid.append(t);
      }
    }
        return $grid;
  }
}

module.exports = View;
