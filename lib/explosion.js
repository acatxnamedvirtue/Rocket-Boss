(function() {
  window.RocketBoss = window.RocketBoss || {};

  var Explosion = window.RocketBoss.Explosion = function(args) {
    this.center = args.center;
    this.radius = 0;
    this.speed = 1;
    this.expanding = true;
    this.maxRadius = 50;
    this.finished = false;
  };

  Explosion.prototype.step = function() {
    if(this.expanding) {
      this.radius += this.speed;
      if(this.radius > this.maxRadius) {
        this.expanding = false;
      }
    } else if(!this.expanding && this.radius > 0) {
      this.radius -= this.speed;
    } else if(this.radius < 0) {
      this.finished = true;
    }
  };
})();
