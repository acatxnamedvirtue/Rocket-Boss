(function() {
  window.RocketBoss = window.RocketBoss || {};

  var Missile = window.RocketBoss.Missile = function(args) {
    this.startPos = args.startPos;
    this.endPos = args.endPos;
    this.pos = args.startPos;
    this.totalDistance = Math.floor(Math.hypot(this.endPos[0]-this.startPos[0], this.endPos[1]-this.endPos[0]));
    this.xDistance = this.endPos[0]-this.startPos[0];
    this.yDistance = this.endPos[1]-this.startPos[1];
    this.slope = this.yDistance/this.xDistance;
    this.exploded = false;
  };

  Missile.PossibleFriendlyMissileStartPos = [[40,525], [510,525], [990,525]];
  Missile.ExplosionRadius = 100;
  Missile.ExplosionSpeed = 2;
  Missile.TravelSpeed = 5;
})();
