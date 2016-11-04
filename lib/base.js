(function() {
  window.RocketBoss = window.RocketBoss || {};

  var Base = window.RocketBoss.Base = function(args) {
    //startX is the bottom left x coord of the base
    this.startX = args.startX;
    this.numMissiles = 10;
    this.health = 100;
  };

  Base.COLOR = "yellow";
})();
