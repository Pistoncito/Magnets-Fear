MagnetsFear.classicState = function(game) {
}

//Variables
var bg;


 var esfera1;
 var esfera2;

 var n_bases;
 var bases1;
 var bases2;

var n_proyectiles;
var proyectiles;


var colisionables;

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


//FUNCIONES


//Distancia entre centros
function getPowDistance(fromX, fromY, toX, toY){
  var a = Math.abs(fromX - toX);
  var b = Math.abs(fromY - toY);
  return Math.abs((a * a) + (b * b));
};

function getDistance(fromX, fromY, toX, toY){
  var a = Math.abs(fromX - toX);
  var b = Math.abs(fromY - toY);
  return Math.sqrt((a * a) + (b * b));
};

//Resolución de Solapado
//Resolución de Colisiones



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
    

MagnetsFear.classicState.prototype = {

    preload: function() {

        //prevents possible keys from propagating to the browser
        game.input.keyboard.addKeyCapture(this.possible_keys);
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

      
       n_bases=3;
       bases1=[n_bases];
       bases2=[n_bases];
      
       n_proyectiles = 1;
       proyectiles= [n_proyectiles];
  
   
   

    },

    create: function() {
     
        bg = game.add.image(0,0,'background');

        //Creación del grupo de proyectiles
  
        colisionables= game.add.physicsGroup(Phaser.Physics.P2JS);
        colisionables.collideWorldBounds = true;
        game.physics.p2.restitution = 1.0;

        esfera1= new Sphere(colisionables.create(game.world.height/2-90,90,'sphere1p'));
        esfera2= new Sphere(colisionables.create(game.world.width-90, game.world.height/2-90,'sphere2p'));

        esfera1.PhaserObject.body.setCircle(45);
        esfera1.PhaserObject.body.fixedRotation=true;
        esfera1.PhaserObject.body.mass=100;
         esfera1.PhaserObject.body.damping=0.4;

        esfera2.PhaserObject.body.setCircle(45);
        esfera2.PhaserObject.body.fixedRotation=true;
        esfera2.PhaserObject.body.mass=100;

    

      for(i=0; i< n_proyectiles; i++)
      {
        proyectiles[i]= new Proyectile(colisionables.create(game.world.randomX, game.world.randomY,'proyectile1'));
        proyectiles[i].PhaserObject.body.setCircle(30);
        proyectiles[i].PhaserObject.body.fixedRotation=true;
        proyectiles[i].PhaserObject.body.velocity.x=300;
        proyectiles[i].PhaserObject.body.velocity.y=300;
        proyectiles[i].PhaserObject.body.damping=0;
        proyectiles[i].PhaserObject.body.maxVelocity=50;//NO FUNCIONA!!!
      }


               /*
              for(i=0; i< n_bases; i++)
              {

              }
          */

        
        
      },

    update: function() {
      //esfera1.Movement();
      var foo=[0,0,0,0,0];
      var W= game.input.keyboard.addKey(Phaser.Keyboard.W);
      var A= game.input.keyboard.addKey(Phaser.Keyboard.A);
      var S= game.input.keyboard.addKey(Phaser.Keyboard.S);
      var D= game.input.keyboard.addKey(Phaser.Keyboard.D);
      if(W.isDown)foo[0]=1;
      if(A.isDown)foo[1]=1;
      if(S.isDown)foo[2]=1;
      if(D.isDown)foo[3]=1;
      
     // alert("foo equals: " + foo[0] + ", " +foo[1] + ", " +foo[2] + ", " +foo[3] + ", " +foo[4] + ", ")
        esfera1.Movement(foo);
        //Phaser.Input.Keyboard.onDownCallback(esfera1.Movement());
        foo=[0,0,0,0,0];
    },
    


}
