(function() {
  window.RocketBoss = window.RocketBoss || {};

  var GameView = window.RocketBoss.GameView = function(canvasEl) {
    this.game = new window.RocketBoss.Game(this);
    this.ctx = canvasEl.getContext("2d");
  }

  GameView.mouseX = 0;
  GameView.mouseY = 0;

  GameView.prototype.setMousePosition = function(e) {
    var canvasRect = document.getElementById("canvas").getBoundingClientRect();
    GameView.mouseX = e.clientX - canvasRect.left;
    GameView.mouseY = e.clientY - canvasRect.top;
  };

  GameView.prototype.handleClick = function(e) {
    e.preventDefault();
    this.game.fireMissile(this.ctx, GameView.mouseX, GameView.mouseY, undefined);
  }

  GameView.prototype.start = function() {
    var viewInterval = window.setInterval((function() {
      this.game.stepObjects();
      this.game.draw(this.ctx, GameView.mouseX, GameView.mouseY);
      if(!this.game.roundInProgress()) {
        this.game.startRound(this.ctx); }
    }).bind(this), 10);
  };
})();
