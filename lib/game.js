(function() {
  window.RocketBoss = window.RocketBoss || {};

  var setupCities = this.setupCities = function() {
    var cities = [];
    var cityXs = [150, 250, 350, 625, 725, 825];
    for(var i = 0; i < cityXs.length; i++) {
      cities.push(new window.RocketBoss.City({startX: cityXs[i]}));
    }
    return cities;
  };

  var setupBases = this.setupBases = function() {
    var bases = [];
    var baseXs = [0, 475, 950];
    for(var i = 0; i < baseXs.length; i++) {
      bases.push(new window.RocketBoss.Base({startX: baseXs[i]}));
    }
    return bases;
  };

  var Game = window.RocketBoss.Game = function() {
  };

  Game.DIM_X = 1026;
  Game.DIM_Y = 600;
  Game.Cities = setupCities();
  Game.Bases = setupBases();

  Game.prototype.drawBackground = function(ctx) {
    Game.prototype.drawSky(ctx);
    Game.prototype.drawGround(ctx);
    Game.prototype.drawObjects("Cities", ctx);
    Game.prototype.drawObjects("Bases", ctx);
  };

  Game.prototype.drawSky = function(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y-50);
  };

  Game.prototype.drawGround = function(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 550, Game.DIM_X, Game.DIM_Y);
  };

  Game.prototype.drawBase = function(base, ctx) {
    ctx.beginPath();
    ctx.moveTo(base.startX+1, 550);
    ctx.lineTo(base.startX+10, 525);
    ctx.lineTo(base.startX+20, 530);
    ctx.lineTo(base.startX+55, 530);
    ctx.lineTo(base.startX+65, 525);
    ctx.lineTo(base.startX+75, 550);
    ctx.fillStyle = window.RocketBoss.Base.COLOR;
    ctx.fill();
  };

  Game.prototype.drawCity = function(city, ctx) {
    ctx.beginPath();
    ctx.moveTo(city.startX, 550);
    ctx.lineTo(city.startX, 540);
    ctx.lineTo(city.startX+10, 540);
    ctx.lineTo(city.startX+10, 510);
    ctx.lineTo(city.startX+20, 520);
    ctx.lineTo(city.startX+20, 500);
    ctx.lineTo(city.startX+25, 490);
    ctx.lineTo(city.startX+30, 500);
    ctx.lineTo(city.startX+30, 520);
    ctx.lineTo(city.startX+40, 510);
    ctx.lineTo(city.startX+40, 540);
    ctx.lineTo(city.startX+50, 540);
    ctx.lineTo(city.startX+50, 550);
    ctx.fillStyle = window.RocketBoss.City.COLOR;
    ctx.fill();
  };

  Game.prototype.drawObjects = function(type, ctx) {
    var method = "";
    switch(type) {
      case "Cities":
        method = "drawCity";
        break;
      case "Bases":
        method = "drawBase";
        break;
      case "Missiles":
        method = "drawMissiles";
        break;
    };

    for(var i = 0; i < Game[type].length; i++) {
      Game.prototype[method](Game[type][i], ctx);
    }
  };

  Game.prototype.drawPointer = function(ctx) {

  }


  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    Game.prototype.drawBackground(ctx);
    Game.prototype.drawPointer(ctx);
  };


})();
