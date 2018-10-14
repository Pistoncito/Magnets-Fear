MagnetsFear.levelState = function(game) {
}

//Variables
var bg;
var player;
var proyectile;
var proyectiles;
var base;
var bases;
var numProyectiles = 4;
var numPlayerBases = 3;
var possible_keys = [
  Phaser.Keyboard.W,
  Phaser.Keyboard.A,
  Phaser.Keyboard.S,
  Phaser.Keyboard.D]
var wKeyDown = false;
var aKeyDown = false;
var sKeyDown = false;
var dKeyDown = false;

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

//FUNCIONES

//Detección de Colisiones entre círculos
function collidesCircleCircle(body1, body2){
  var radius1 = body1.width * 0.5;
  var radius2 = body2.width * 0.5;
  var distance = getDistance(body1.x, body1.y, body2.x, body2.y);
  if (distance <= (radius1 + radius2)*(radius1 + radius2)){
    return true;

  }  
  return false;
};
//Distancia entre centros
function getPowDistance(fromX, fromY, toX, toY){
  var a = Math.abs(fromX - toX);
  var b = Math.abs(fromY - toY);
  return Math.abs((a * a) + (b * b));
};

//Resolución de Solapado
//Resolución de Colisiones


function solveStaticColission(body1, body2){
  var radius1 = body1.width * 0.5;
  var radius2 = body2.width * 0.5;
  var distance = Math.sqrt(getDistance(body1.x, body1.y, body2.x, body2.y)) || 1;
  var overlap = 0.5 * (distance-radius1-radius2);
  //Desplazar 1er objeto
  body1.x -= overlap * ((body1.x - body2.x)/distance);
  body1.y -= overlap * ((body1.y - body2.y)/distance);
  //Desplazar 2º objeto
  body2.x += overlap * ((body1.x - body2.x)/distance);
  body2.y += overlap * ((body1.y - body2.y)/distance);
}
//Resolución Impacto en Movimiento
function solveDynamicColission(body1, body2){
  //Normal
  var distance = Math.sqrt(getDistance(body1.x, body1.y, body2.x, body2.y));
  var nx = (body2.x - body1.x)/distance;
  var ny = (body2.y - body1.y)/distance;
  //Tangente
  var tx = -ny;
  var ty = nx;
  //Producto escalar Normales
  var dpNorm1 = body1.body.velocity.x * nx + body1.body.velocity.y * ny;
  var dpNorm2 = body2.body.velocity.x * nx + body2.body.velocity.y * ny;
  //Producto escalar Tangetes
  var dpTan1 = body1.body.velocity.x * tx + body1.body.velocity.y * ty;
  var dpTan2 = body2.body.velocity.x * tx + body2.body.velocity.y * ty;
  //Conservación del momento
  var m1 = (dpNorm1 * (body1.body.mass - body2.body.mass) + 2 * body2.body.mass * dpNorm2) / (body1.body.mass + body2.body.mass);
  var m2 = (dpNorm2 * (body1.body.mass - body2.body.mass) + 2 * body2.body.mass * dpNorm1) / (body1.body.mass + body2.body.mass);
  //Actualizar Velocidades
  body1.body.velocity.x = tx * dpTan1 + nx * m1;
  body1.body.velocity.y = ty * dpTan1 + ny * m1;
  body2.body.velocity.x = tx * dpTan2 + nx * m2;
  body2.body.velocity.y = ty * dpTan2 + ny * m2;
}

function colissionHandler(){
  //game.physics.arcade.collide(proyectiles,proyectiles);
  for(var i = 0; i < numProyectiles; i++) {
    for (var j = 0; j < numProyectiles; j++){
      if(i == j) continue;
      if(collidesCircleCircle(proyectiles.children[i],proyectiles.children[j])){
        solveStaticColission(proyectiles.children[i],proyectiles.children[j]);
        //solveDynamicColission(proyectiles.children[i],proyectiles.children[j]);
      }
    }
  }
}

function proyectileHitsPlayer(player,proyectile){
}

function PolarityHandler(player,proyectile){  
}

function keyDownHandler(){
  if(this.wKey.isDown){
        wKeyDown = true;
    }
  if(this.sKey.isDown){
        sKeyDown = true;
    }
  if(this.aKey.isDown){
        aKeyDown = true;
    }
  if(this.dKey.isDown){
        dKeyDown = true;
    }
}

function keyUpHandler(){
  if(this.wKey.isUp){
      wKeyDown = false;
    }
  if(this.sKey.isUp){
        sKeyDown = false;
    }
  if(this.aKey.isUp){
        aKeyDown = false;
    }
  if(this.dKey.isUp){
        dKeyDown = false;
    }
}

function playerControl(player){
  if(wKeyDown){
    player.ay -= 0;
  }
  if(aKeyDown){
    player.ax -= 0;
  }
  if(sKeyDown){
    player.ay += 0;
  }
  if(dKeyDown){
    player.ax += 0;
  }
}
    

MagnetsFear.levelState.prototype = {

    preload: function() {
        //prevents possible keys from propagating to the browser
        game.input.keyboard.addKeyCapture(this.possible_keys);
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        /*
        for(i=0; i< this.keysPressed.length;i++)
            {
                this.keysPressed[i]= game.input.keyboard.addKey(this.possible_keys[i]);
            }
        */
    },

    create: function() {
     
        bg = game.add.image(0,0,'background');
        //sphere = game.add.image(50, 50, 'sphere1-positive');
        //Creación del grupo de proyectiles
        proyectiles = game.add.group();
        proyectiles.enableBody = true;    
        proyectiles.physicsBodyType = Phaser.Physics.ARCADE;

        for(var i = 0; i < numProyectiles; i++) {
          var proyectile = proyectiles.create(
            100 + i * game.rnd.integerInRange(100,400),
            100 + i * game.rnd.integerInRange(100,400),
            'sphere1p');

          proyectile.body.setCircle(50);
          proyectile.body.collideWorldBounds = true;
          proyectile.body.velocity.x = 50;
          proyectile.body.velocity.y = 50;
          proyectile.body.mass = proyectile.width * 0.5 * proyectile.width * 0.5 * proyectile.width * 0.5;
          proyectile.body.bounce.setTo(1);
          proyectile.anchor.setTo(0.5, 0.5);
        }

        
        
      },

    update: function() {
      //Colisión entre proyectiles

      colissionHandler();
      
      //ARCADE
      /*
      game.physics.arcade.collide(proyectiles,proyectiles);
      
      for(var i = 0; i < numProyectiles; i++) {
        game.physics.arcade.collide(proyectiles,proyectiles);
        
      }*/
    },
    


}
