(function() {
  window.RocketBoss = window.RocketBoss || {};


  var Game = window.RocketBoss.Game = function() {
  };


  Game.DIM_X = 1026;
  Game.DIM_Y = 600;

  Game.Cities = [new window.RocketBoss.City({startX: 150}),
                 new window.RocketBoss.City({startX: 250}),
                 new window.RocketBoss.City({startX: 350}),
                 new window.RocketBoss.City({startX: 625}),
                 new window.RocketBoss.City({startX: 725}),
                 new window.RocketBoss.City({startX: 825})];

  var base1 = new window.RocketBoss.Base({startX: 0});
  var base2 = new window.RocketBoss.Base({startX: 475});
  var base3 = new window.RocketBoss.Base({startX: 950});

  Game.Bases = [base1, base2, base3];

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
    console.log(type);
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


  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    Game.prototype.drawBackground(ctx);
    // var j = 1;
    // for(var i = 0; i < 10; i++) {
    //   setTimeout(function(){
    //     ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    //     ctx.fillStyle = "blue";
    //     ctx.fillRect(10*j, 10*j, 100+(10*j), 100+(10*j));
    //     j++;
    //   }.bind(this),100*i);
    // }
  };


})();
