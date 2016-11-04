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

  var Game = window.RocketBoss.Game = function(gameView) {
    this.gameView = gameView;
  };

  Game.DIM_X = 1026;
  Game.DIM_Y = 600;
  Game.Cities = setupCities();
  Game.Bases = setupBases();
  Game.FriendlyMissiles = [];
  Game.EnemyMissiles = [];

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

  Game.prototype.drawFriendlyMissiles = function(ctx) {

  }
  
  Game.prototype.drawAllObjects = function(ctx) {
    Game.prototype.drawObjects("Cities", ctx);
    Game.prototype.drawObjects("Bases", ctx);
    Game.prototype.drawObjects("FriendlyMissiles");
  }

  Game.prototype.drawObjects = function(type, ctx) {
    var method = "";
    switch(type) {
      case "Cities":
        method = "drawCity";
        break;
      case "Bases":
        method = "drawBase";
        break;
      case "FriendlyMissiles":
        method = "drawFriendlyMissiles";
        break;
    };

    for(var i = 0; i < Game[type].length; i++) {
      Game.prototype[method](Game[type][i], ctx);
    }
  };


  Game.prototype.drawPointer = function(ctx, mouseX, mouseY) {
    ctx.beginPath();
    ctx.moveTo(mouseX - 10, mouseY - 10);
    ctx.lineTo(mouseX - 10, mouseY + 10);
    ctx.lineTo(mouseX + 10, mouseY + 10);
    ctx.lineTo(mouseX + 10, mouseY - 10);
    ctx.lineTo(mouseX - 10, mouseY - 10);
    ctx.fillStyle = "Blue";
    ctx.fill();
  }


  Game.prototype.draw = function(ctx, mouseX, mouseY) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    Game.prototype.drawBackground(ctx);
    Game.prototype.drawAllObjects(ctx);
    Game.prototype.drawPointer(ctx, mouseX, mouseY);
  };

  Game.prototype.fireMissile = function(ctx, mouseX, mouseY, base) {
    if(base === null) {
      basePosArray = Game.Missile.PossibleFriendlyMissileStartPos;
      var base = basePosArray[Math.floor(Math.random() * basePosArray.length)];
    }

    Game.FriendlyMissiles.push(new Game.Missile({startPos: base, endPos = [mouseX, mouseY]}));
  }


})();
