//CONSTRUCTORES

function createPlayer(x,y,radius,sprites,player){
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.mass = radius * radius * radius
  this.radius = radius;
  this.polarity = 0;
  this.sprites = sprites;
  this.player = player;
}

function createProyectiles(x,y,radius,sprites,num){
  this.num = num;
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.mass = radius * radius * radius
  this.radius = radius;
  this.polarity = 0;
  this.sprites = sprites;
  for(var i = 0; i < num; i++) {
    var proyectile = proyectiles.create(
      100 + i * game.rnd.integerInRange(100,400),
      100 + i * game.rnd.integerInRange(100,400),
      sprites[i%2]);
    proyectile.body.collideWorldBounds = true;
    proyectile.body.gravity.x = game.rnd.integerInRange(-20,20) * i;
    proyectile.body.gravity.y = game.rnd.integerInRange(-20,20) * i;
    proyectile.body.bounce.setTo(1);
    proyectile.anchor.setTo(0.5, 0.5);
  }
}

function createBases(x,y,sprites,player,num){
  this.num = num;
  this.x = x;
  this.y = y;
  this.sprites = sprites;
  this.player = player;
  for(var i = 0; i < num; i++) {
    var base = bases.create(
      100 + i * game.rnd.integerInRange(100,400),
      100 + i * game.rnd.integerInRange(100,400),
      sprite[player]);
    proyectile.anchor.setTo(0.5, 0.5);
  }
}