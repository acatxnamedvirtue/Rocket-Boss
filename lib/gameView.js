(function() {
  window.RocketBoss = window.RocketBoss || {};

  var GameView = window.RocketBoss.GameView = function(canvasEl) {
    this.game = new window.RocketBoss.Game(this);
    this.ctx = canvasEl.getContext("2d");
  }

  GameView.prototype.start = function() {
    this.game.draw(this.ctx);
    var viewInterval = window.setInterval((function() {
      this.game.draw(this.ctx);
    }).bind(this), 1000);

    setTimeout(clearInterval(viewInterval), 2000);
  };
})();
