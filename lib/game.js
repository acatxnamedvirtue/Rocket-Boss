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
    var baseXs = [0, 470, 950];
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
  Game.Explosions = [];
  Game.roundNumber = 0;
  Game.roundInProgress = false;

  Game.prototype.drawBackground = function(ctx) {
    Game.prototype.drawSky(ctx);
    Game.prototype.drawGround(ctx);
    Game.prototype.drawObjects("Cities", ctx);
    Game.prototype.drawObjects("Bases", ctx);
  };

  Game.prototype.roundInProgress = function() {
    return Game.roundInProgress;
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

  Game.prototype.drawFriendlyMissile = function(missile, ctx) {
    ctx.beginPath();
    ctx.moveTo(missile.startPos[0], missile.startPos[1]);
    ctx.lineTo(missile.pos[0], missile.pos[1]);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.closePath();
  };

  Game.prototype.drawEnemyMissile = function(missile, ctx) {
    ctx.beginPath();
    ctx.moveTo(missile.startPos[0], missile.startPos[1]);
    ctx.lineTo(missile.pos[0], missile.pos[1]);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.closePath();
  };

  Game.prototype.drawExplosion = function(explosion, ctx) {
    ctx.beginPath();
    ctx.arc(explosion.center[0], explosion.center[1], explosion.radius, 0, 2*Math.PI);
    ctx.fillStyle = "White";
    ctx.fill();
  };

  Game.prototype.drawAllObjects = function(ctx) {
    Game.prototype.drawObjects("Cities", ctx);
    Game.prototype.drawObjects("Bases", ctx);
    Game.prototype.drawObjects("FriendlyMissiles", ctx);
    Game.prototype.drawObjects("EnemyMissiles", ctx);
    Game.prototype.drawObjects("Explosions", ctx);
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
      case "FriendlyMissiles":
        method = "drawFriendlyMissile";
        break;
      case "EnemyMissiles":
        method = "drawEnemyMissile";
        break;
      case "Explosions":
        method = "drawExplosion";
        break;
    };

    for(var i = 0; i < Game[type].length; i++) {
      Game.prototype[method](Game[type][i], ctx);
    }
  };


  Game.prototype.drawPointer = function(ctx, mouseX, mouseY) {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.moveTo(mouseX - 10, mouseY - 10);
    ctx.lineTo(mouseX - 10, mouseY + 10);
    ctx.stroke();
    ctx.lineTo(mouseX + 10, mouseY + 10);
    ctx.stroke();
    ctx.lineTo(mouseX + 10, mouseY - 10);
    ctx.stroke();
    ctx.lineTo(mouseX - 10, mouseY - 10);
    ctx.stroke();
    ctx.closePath();
  };

  Game.prototype.explodeMissile = function(missile, enemy) {
    var explosionCenter = enemy ? missile.endPos : missile.pos;
    Game.Explosions.push(new RocketBoss.Explosion({center: explosionCenter}));
  };

  Game.prototype.checkForExplodedMissiles = function() {
    var missileIndex = 0;
    while(Game.FriendlyMissiles.length > 0 && missileIndex < Game.FriendlyMissiles.length) {
      var missile = Game.FriendlyMissiles[missileIndex];

      if(missile.exploded) {
        this.explodeMissile(missile);
        Game.FriendlyMissiles = Game.FriendlyMissiles.slice(0,missileIndex).concat(Game.FriendlyMissiles.slice(missileIndex+1, Game.FriendlyMissiles.length));
      } else {
        missileIndex++;
      }
    }

    var missileIndex = 0;
    while(Game.EnemyMissiles.length > 0 && missileIndex < Game.EnemyMissiles.length) {
      var missile = Game.EnemyMissiles[missileIndex];

      if(missile.exploded) {
        this.explodeMissile(missile, true);
        Game.EnemyMissiles = Game.EnemyMissiles.slice(0,missileIndex).concat(Game.EnemyMissiles.slice(missileIndex+1, Game.EnemyMissiles.length));
      } else {
        missileIndex++;
      }
    }
  };

  Game.prototype.checkForFinishedExplosions = function() {
    var explosionIndex = 0;
    while(Game.Explosions.length > 0 && explosionIndex < Game.Explosions.length) {
      var explosion = Game.Explosions[explosionIndex];

      if(explosion.finished) {
        Game.Explosions = Game.Explosions.slice(0,explosionIndex).concat(Game.Explosions.slice(explosionIndex+1, Game.Explosions.length));
      } else {
        explosionIndex++;
      }
    }
  };

  Game.prototype.checkForExplosionCollisions = function() {
    var explosionIndex = 0;
    while(Game.Explosions.length > 0 && explosionIndex < Game.Explosions.length) {
      var explosion = Game.Explosions[explosionIndex];

      //check enemy missile explosion collisions
      var missileIndex = 0;
      while(Game.EnemyMissiles.length > 0 && missileIndex < Game.EnemyMissiles.length) {
        var missile = Game.EnemyMissiles[missileIndex];

        var distX = Math.abs(explosion.center[0] - missile.pos[0]);
        var distY = Math.abs(explosion.center[1] - missile.pos[1]);

        var distance = Math.sqrt((distX*distX) + (distY*distY));

        if(distance <= explosion.radius) { missile.explode(); }
        missileIndex++;
      }
      //check city explosion collisions
      for(var i = 0; i < Game.Cities.length; i++) {
        var city = Game.Cities[i];
        if(explosion.center[0] === city.center[0] && explosion.center[1] === city.center[1] && !explosion.damagedBuilding && city.health > 0) {
          city.health -= 25;
          explosion.damagedBuilding = true;
          console.log("damaged city");
          if(city.health === 0) { console.log("city destroyed");}
        }
      }
      //check base explosion collisions
      for(var i = 0; i < Game.Bases.length; i++) {
        var base = Game.Bases[i];
        if(explosion.center[0] === base.center[0] && explosion.center[1] === base.center[1] && base.health > 0) {
          base.numMissiles = 0;
          base.health = 0;
        }
      }
      explosionIndex++;
    }
  };

  Game.prototype.addEnemyMissile = function() {
    var startX = Math.floor(Math.random()*1026);
    var targets = [];
    for(var i = 0; i < Game.Cities.length; i++) {
      var city = Game.Cities[i];
      if(city.health > 0) { targets.push(city); }
    }
    for(var i = 0; i < Game.Bases.length; i++) {
      var base = Game.Bases[i];
      if(base.health > 0) { targets.push(base); }
    }
    var target = targets[Math.floor(Math.random()*targets.length)];
    if(target) {
      var missile = new RocketBoss.Missile({startPos: [startX, 0], endPos: target.center});
      Game.EnemyMissiles.push(missile);
    }
  };

  Game.prototype.stepObjects = function() {
    for(var i = 0; i < Game.FriendlyMissiles.length; i++) {
      Game.FriendlyMissiles[i].step();
    }

    for(var i = 0; i < Game.EnemyMissiles.length; i++) {
      Game.EnemyMissiles[i].step(true);
    }

    Game.prototype.checkForExplodedMissiles();

    for(var i = 0; i < Game.Explosions.length; i++) {
      Game.Explosions[i].step();
    }

    Game.prototype.checkForFinishedExplosions();
    Game.prototype.checkForExplosionCollisions();
  };

  Game.prototype.draw = function(ctx, mouseX, mouseY) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    Game.prototype.drawBackground(ctx);
    Game.prototype.drawAllObjects(ctx);
    Game.prototype.drawPointer(ctx, mouseX, mouseY);
    if(Game.displayingRoundNumber) { Game.prototype.drawRoundNumber(ctx); }
    Game.prototype.drawMissileNumbers(ctx);
  };

  Game.prototype.fireMissile = function(ctx, mouseX, mouseY, base) {
    if(!base) {
      var bases = [];
      for(var i = 0; i < Game.Bases.length; i++) {
        var base = Game.Bases[i];
        if(base.numMissiles !== 0) {
          bases.push(base);
        }
      }
      var fireFromBase = bases[Math.floor(Math.random() * bases.length)];
      if(fireFromBase) {
        Game.FriendlyMissiles.push(new RocketBoss.Missile({startPos: fireFromBase.center, endPos: [mouseX, mouseY]}));
        fireFromBase.numMissiles--;
      }
    }
  };

  Game.prototype.fireEnemyMissileBarrage = function(numMissiles) {
    for(var i = 1; i <= numMissiles; i++) {
      setTimeout(this.addEnemyMissile, 500*i);
    }
  };

  Game.prototype.drawRoundNumber = function(ctx) {
    ctx.font = "48px sanserif";
    ctx.fillStyle = "Red";
    ctx.fillText("Round " + Game.roundNumber, 200, 200);
  };

  Game.prototype.drawMissileNumbers = function(ctx) {
    for(var i = 0; i < Game.Bases.length; i++) {
      var base = Game.Bases[i];
      ctx.font = "12px sanserif";
      ctx.fillStyle = "Blue";
      ctx.fillText("# Missiles: " + base.numMissiles, base.center[0]-35, base.center[1]+50);
    }
  }

  Game.prototype.playRound = function() {
    Game.displayingRoundNumber = false;
    console.log("Playing Round", Game.roundNumber)
    var numMissiles = 0;
    if(Game.roundNumber <= 5) {
      numMissiles = 10;
    } else if(Game.roundNumber <= 10) {
      numMissiles = 15;
    } else if(Game.roundNumber <= 15) {
      numMissiles = 20;
    } else if(Game.roundNumber <= 20) {
      numMissiles = 25;
    }
    Game.prototype.fireEnemyMissileBarrage(numMissiles);

    setTimeout(Game.prototype.endRound, 20000);
  };

  Game.prototype.citiesDestroyed = function() {
    for(var i = 0; i < Game.Cities.length; i++) {
      if(Game.Cities[i].health > 0) { return false; }
    }

    return true;
  };

  Game.prototype.resetBases = function() {
    for(var i = 0; i < Game.Bases.length; i++) {
      Game.Bases[i].numMissiles = 10;
    }
  };

  Game.prototype.startRound = function(ctx) {
    Game.prototype.resetBases();
    Game.roundInProgress = true;
    Game.roundNumber++;
    Game.displayingRoundNumber = true;
    setTimeout(Game.prototype.playRound, 2000);
  };

  Game.prototype.winGame = function() {
    //player wins
    console.log("Player Wins");
  };

  Game.prototype.loseGame = function() {
    //player loses
    console.log("Player Loses");
  };

  Game.prototype.endRound = function() {
    console.log("Ending Round");
    if(Game.roundNumber === 20) {
      Game.prototype.winGame();
    } else if(Game.prototype.citiesDestroyed()) {
      Game.prototype.loseGame();
    } else {
      Game.roundInProgress = false;
    }
  };

})();
