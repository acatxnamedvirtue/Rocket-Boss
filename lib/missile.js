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
  Missile.PossibleEnemyMissileEndPos = [[40,525],[175,525],[275,525],[375,525],[510,525],[650,525],[750,525],[850,525],[990,525]];
  Missile.FriendlySpeed = 3;
  Missile.EnemySpeed = 3;

  Missile.prototype.step = function(enemy) {
    var startX = this.startPos[0];
    var startY = this.startPos[1];
    var posX = this.pos[0];
    var posY = this.pos[1];
    var endX = this.endPos[0];
    var endY = this.endPos[1];
    var direction = enemy ? 1 : -1;
    var speed = enemy ? Missile.EnemySpeed : Missile.FriendlySpeed;

    var xStep = Math.abs(speed/(1+this.slope));
    var yStep = direction*(speed - xStep);
    if(endX < startX) { xStep *= -1; }

    var newPosX = posX + xStep;
    var newPosY = posY + yStep;

    this.pos = [newPosX, newPosY];
    this.checkExplode(enemy);
  };

  Missile.prototype.checkExplode = function(enemy) {
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
    if(posY < endY && !enemy) {
      passedY = true;
    }
    if(posY > endY && enemy) {
      passedY = true;
    }

    if(passedX && passedY) {
      this.explode();
    }
  };

  Missile.prototype.explode = function() {
    this.exploded = true;
  }
})();
