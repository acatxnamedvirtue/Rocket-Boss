(function() {
  window.RocketBoss = window.RocketBoss || {};

  var City = window.RocketBoss.City = function(args) {
    //startX is the bottom left x coord of the city
    this.startX = args.startX;
    this.health = 100;
  };

  City.COLOR = "purple";
})();
