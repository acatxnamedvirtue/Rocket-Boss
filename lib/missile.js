(function() {
  window.RocketBoss = window.RocketBoss || {};

  var Missile = window.RocketBoss.Missile = function(args) {
    this.startPos = args.startPos;
    this.endPos = args.endPos;
    this.pos = this.startPos;
    this.totalDistance = Math.floor(Math.hypot(this.endPos[0]-this.startPos[0], this.endPos[1]-this.startPos[1]));
    this.xDistance = this.endPos[0]-this.startPos[0];
    this.yDistance = this.endPos[1]-this.startPos[1];
    this.slope = Math.abs(this.yDistance/this.xDistance);
    this.exploded = false;
  };

  Missile.PossibleFriendlyMissileStartPos = [[40,525], [510,525], [990,525]];
  Missile.ExplosionRadius = 100;
  Missile.ExplosionSpeed = 2;
  Missile.TravelSpeed = 4;

  Missile.prototype.step = function() {
    var startX = this.startPos[0];
    var startY = this.startPos[1];
    var posX = this.pos[0];
    var posY = this.pos[1];
    var endX = this.endPos[0];
    var endY = this.endPos[1];

    var xStep = Math.abs(Missile.TravelSpeed/(1+this.slope));
    var yStep = -1*(Missile.TravelSpeed - xStep);
    if(endX < startX) { xStep *= -1; }

    var newPosX = posX + xStep;
    var newPosY = posY + yStep;

    this.pos = [newPosX, newPosY];
    this.checkExplode();
  };

  Missile.prototype.checkExplode = function() {
    var startX = this.startPos[0];
    var posX = this.pos[0];
    var posY = this.pos[1];
    var endX = this.endPos[0];
    var endY = this.endPos[1];

    var passedX = false;
    var passedY = false;

    //check X
    if((startX < endX && posX > endX) || (startX > endX && posX < endX)) {
      passedX = true;
    }
    //check Y
    if(posY < endY) {
      passedY = true;
    }

    if(passedX && passedY) {
      this.exploded = true;
    }
  };
})();
