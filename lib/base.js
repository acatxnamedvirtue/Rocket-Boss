(function() {
  window.RocketBoss = window.RocketBoss || {};

  var setupMissiles = this.setupMissiles = function() {
    var missiles = [];

    for(var i = 0; i < 10; i++) {
      missiles.push(new window.RocketBoss.Missile([this.startX+25, 550]));
    }

    return missiles;
  };

  var Base = window.RocketBoss.Base = function(args) {
    //startX is the bottom left x coord of the base
    this.startX = args.startX;
    this.missiles = setupMissiles();
    this.numMissiles = 10;
    this.health = 100;
  };

  Base.COLOR = "yellow";
})();
