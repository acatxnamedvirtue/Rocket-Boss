(function() {
  window.RocketBoss = window.RocketBoss || {};

  var City = window.RocketBoss.City = function(args) {
    //startX is the bottom left x coord of the city
    this.startX = args.startX;
    this.center = [this.startX + 25, 525];
    this.health = 100;
    this.hurtRecently = false;
  };
  
  City.COLOR = "purple";
})();
