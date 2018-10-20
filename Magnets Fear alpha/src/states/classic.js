MagnetsFear.classicState = function(game) {
}

//Variables
var bg;

 var esfera1;
 var esfera2;
 var esferas;

 var magnetismos;

 var n_bases;
 var bases1;
 var bases2;

var n_proyectiles;
var proyectiles;

var playerCollisionGroup;
var proyectilesCollisionGroup;
var magnetCollisionGroup

var W, A, S, D, up, left, down, right; 
/*
var possible_keys = [
  Phaser.Keyboard.W,
  Phaser.Keyboard.A,
  Phaser.Keyboard.S,
  Phaser.Keyboard.D]
*/
function collisionEvents(proyectile,player){
  
  //if((body1.sprite.name == 'sphere1'));
} 

MagnetsFear.classicState.prototype = {

    preload: function() {
      //player1
    W= game.input.keyboard.addKey(Phaser.Keyboard.W);
    A= game.input.keyboard.addKey(Phaser.Keyboard.A);
    S= game.input.keyboard.addKey(Phaser.Keyboard.S);
    D= game.input.keyboard.addKey(Phaser.Keyboard.D);
      //player2
    up= game.input.keyboard.addKey(Phaser.Keyboard.UP);
    left= game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    down= game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    right= game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        //prevents possible keys from propagating to the browser
       game.input.keyboard.addKeyCapture([W,A,S,D]);
      
       n_bases=3;
       bases1=[n_bases];
       bases2=[n_bases];
      
       n_proyectiles = 10;
       proyectiles= [n_proyectiles];
    },
    
    create: function() {
     
      //bg = game.add.image(0,0,'background');

      game.physics.p2.setImpactEvents(true);
      game.physics.p2.updateBoundsCollisionGroup();
      game.physics.p2.restitution = 1.0;

    
      playerCollisionGroup=game.physics.p2.createCollisionGroup();
      proyectilesCollisionGroup= game.physics.p2.createCollisionGroup();
      magnetCollisionGroup= game.physics.p2.createCollisionGroup();
  
      esferas= game.add.group();
      esferas.enableBody=true;
      esferas.physicsBodyType= Phaser.Physics.P2JS;

        
  
      esfera1= new Sphere(esferas.create(game.world.height/2-90, 90, 'sphere1'));
      esfera1.PhaserObject.frame = 0;
      esfera1.PhaserObject.animations.add('positive',[0,1,2,3,2,1],10,true);
      esfera1.PhaserObject.animations.add('negative',[4,5,6,7,6,5],10,true);
      esfera1.PhaserObject.animations.play('positive');
      esfera1.PhaserObject.body.setCircle(32);
      esfera1.PhaserObject.body.fixedRotation=true;
      esfera1.PhaserObject.body.mass=8;
      esfera1.PhaserObject.body.damping=0.9;
      esfera1.PhaserObject.body.setCollisionGroup(playerCollisionGroup);
      esfera1.PhaserObject.body.collides([proyectilesCollisionGroup,playerCollisionGroup]);
      esfera2= new Sphere(esferas.create(game.world.width-90, game.world.height/2-90,'sphere2'));
      esfera2.PhaserObject.frame = 0;
      esfera2.PhaserObject.animations.add('positive',[0,1,2,3,2,1],10,true);
      esfera2.PhaserObject.animations.add('negative',[4,5,6,7,6,5],10,true);
      esfera2.PhaserObject.animations.play('negative');
      esfera2.PhaserObject.body.setCircle(32);
      esfera2.PhaserObject.body.fixedRotation=true;
      esfera2.PhaserObject.body.mass=8;
      esfera2.PhaserObject.body.damping= 0.9;
      esfera2.PhaserObject.body.setCollisionGroup(playerCollisionGroup);
      esfera2.PhaserObject.body.collides([proyectilesCollisionGroup,playerCollisionGroup]);
///////////////MAGNETISMOS///////////////
      magnetismos= game.add.group();
      magnetismos.enableBody=true;
      magnetismos.physicsBodyType= Phaser.Physics.P2JS;

      esfera1.magnetism.PhaserObject=magnetismos.create(esfera1.PhaserObject.body.x-500/2,
      esfera1.PhaserObject.body.y - 500/2, 'magnetRangeP');
      esfera1.magnetism.PhaserObject.body.setCircle(250);
      esfera1.magnetism.PhaserObject.body.fixedRotation=true;
      esfera1.magnetism.PhaserObject.body.damping= 0.9;
      esfera1.magnetism.PhaserObject.body.setCollisionGroup(magnetCollisionGroup);
      esfera1.magnetism.PhaserObject.body.collides([]);

      esfera2.magnetism.PhaserObject=magnetismos.create(esfera2.PhaserObject.body.x,
      esfera2.PhaserObject.body.y, 'magnetRangeP');
      esfera2.magnetism.PhaserObject.body.setCircle(250);
      esfera2.magnetism.PhaserObject.body.fixedRotation=true;
      esfera2.magnetism.PhaserObject.body.damping= 0.9;
      esfera2.magnetism.PhaserObject.body.setCollisionGroup(magnetCollisionGroup);
      esfera2.magnetism.PhaserObject.body.collides([]);
///////////////MAGNETISMOS///////////////
      proyectiles= game.add.group();
      proyectiles.enableBody=true;
      proyectiles.physicsBodyType= Phaser.Physics.P2JS;

      for(i=0; i< n_proyectiles; i++)
      {
        proyectiles[i]= new Proyectile(proyectiles.create(game.world.randomX, game.world.randomY,'proyectileSpSheet'));
        proyectiles[i].PhaserObject.frame = 0;
        proyectiles[i].PhaserObject.animations.add('positive',[0,1,2,3,4,5],10,true);
        proyectiles[i].PhaserObject.animations.add('negative',[6,7,8,9,10,11],10,true);
        proyectiles[i].PhaserObject.animations.play('positive');
        proyectiles[i].PhaserObject.body.setCircle(16);
        proyectiles[i].PhaserObject.body.fixedRotation=true;
        proyectiles[i].PhaserObject.body.velocity.x=300;
        proyectiles[i].PhaserObject.body.velocity.y=300;
        proyectiles[i].PhaserObject.body.damping=0;
        proyectiles[i].PhaserObject.body.setCollisionGroup(proyectilesCollisionGroup);
        proyectiles[i].PhaserObject.body.collides([playerCollisionGroup,proyectilesCollisionGroup]);

      }
///////////////EVENTOS DE COLISIÓN///////////////
      //game.physics.p2.setPostBroadphaseCallback(collisionEvents, this);

         /*
              for(i=0; i< n_bases; i++)
              {

              }
          */
        
     
    },

    update: function() {

      var keys_bools1=[0,0,0,0,0];
      var keys_bools2=[0,0,0,0,0];
      if(W.isDown) keys_bools1[0]=1;
      if(A.isDown) keys_bools1[1]=1;
      if(S.isDown) keys_bools1[2]=1;
      if(D.isDown) keys_bools1[3]=1;

      if(up.isDown) keys_bools2[0]=1;
      if(left.isDown) keys_bools2[1]=1;
      if(down.isDown) keys_bools2[2]=1;
      if(right.isDown) keys_bools2[3]=1;
      
        esfera1.Movement(keys_bools1);
        esfera2.Movement(keys_bools2);
        keys_bools1=[0,0,0,0,0];

        for(i=0; i< n_proyectiles; i++)
        {
          proyectiles[i].limitSpeed();
        }

    },
    


}
