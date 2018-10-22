MagnetsFear.classicState = function(game) {
}

//Variables
var time;
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

var W, A, S, D, SPACEBAR, up, left, down, right, ENTER;

//Funciones
function proyCollideSpheres(body_1, body_2, shape_1, shape_2, equation) 
{
  var body1 = equation[0].bodyA.parent;
  var body2 = equation[0].bodyB.parent;
  for(i =0; i< n_proyectiles; i++)
  {
    if(body1!=null && body2 !=null)
    {
      if((proyectiles[i].PhaserObject.body.id== body1.id) &&
       body2.collisionGroup==playerCollisionGroup)
      {
        // alert("body1 es proyectil");
        proyectiles[i].PhaserObject.body.polarity.positive
        *=-1;
        //proyectiles[i].PhaserObject.body.polarity.Swicth();
        if(proyectiles[i].PhaserObject.body.polarity.positive<0)
          {
            proyectiles[i].PhaserObject.animations.play('negative');
          }
        else 
          {
          proyectiles[i].PhaserObject.animations.play("positive");
          }
        break;
      }
    }
    if(body2 !=null && body1 !=null)
    {
      if(proyectiles[i].PhaserObject.body.id == body2.id &&
       body1.collisionGroup == playerCollisionGroup)
      {
        //alert("body2 es proyectil");
        proyectiles[i].PhaserObject.body.polarity.positive
         *=-1;
        // proyectiles[i].PhaserObject.body.polarity.Swicth();
        if(proyectiles[i].PhaserObject.body.polarity.positive<0)
        {
        proyectiles[i].PhaserObject.animations.play('negative');
        }
        else 
        {
        proyectiles[i].PhaserObject.animations.play("positive");
        }
        break;
      }
    }
  }
} 

MagnetsFear.classicState.prototype = {

    preload: function() {
      //player1
    W= game.input.keyboard.addKey(Phaser.Keyboard.W);
    A= game.input.keyboard.addKey(Phaser.Keyboard.A);
    S= game.input.keyboard.addKey(Phaser.Keyboard.S);
    D= game.input.keyboard.addKey(Phaser.Keyboard.D);
    SPACEBAR=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      //player2
    up= game.input.keyboard.addKey(Phaser.Keyboard.UP);
    left= game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    down= game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    right= game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    ENTER=game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        //prevents possible keys from propagating to the browser
       game.input.keyboard.addKeyCapture([W,A,S,D,SPACEBAR, up, left, down, right, ENTER]);
      
       n_bases=3;
       bases1=[n_bases];
       bases2=[n_bases];
      
       n_proyectiles = 1;
       proyectiles= [n_proyectiles];
    },
    
    create: function() {
      time = game.time;
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

        
///////////////ESFERAS///////////////  
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
      esfera1.PhaserObject.body.collisionGroup= playerCollisionGroup;
      esfera1.PhaserObject.body.collides([proyectilesCollisionGroup,playerCollisionGroup]);
      esfera1.PhaserObject.body.polarity= new Polarity();

      esfera2= new Sphere(esferas.create(game.world.width-90, game.world.height/2-90,'sphere2'));
      esfera2.PhaserObject.frame = 0;
      esfera2.PhaserObject.animations.add('positive',[0,1,2,3,2,1],10,true);
      esfera2.PhaserObject.animations.add('negative',[4,5,6,7,6,5],10,true);
      esfera2.PhaserObject.animations.play('positive');
      esfera2.PhaserObject.body.setCircle(32);
      esfera2.PhaserObject.body.fixedRotation=true;
      esfera2.PhaserObject.body.mass=8;
      esfera2.PhaserObject.body.damping= 0.9;
      esfera2.PhaserObject.body.setCollisionGroup(playerCollisionGroup);
      esfera2.PhaserObject.body.collisionGroup= playerCollisionGroup;
      esfera2.PhaserObject.body.collides([proyectilesCollisionGroup,playerCollisionGroup]);
      esfera2.PhaserObject.body.polarity= new Polarity();
///////////////MAGNETISMOS///////////////
      magnetismos= game.add.group();
      magnetismos.enableBody=true;
      magnetismos.physicsBodyType= Phaser.Physics.P2JS;

      esfera1.magnetism.PhaserObject=magnetismos.create(esfera1.PhaserObject.body.x-500/2,
      esfera1.PhaserObject.body.y - 500/2, 'magnetRangeP');
      esfera1.magnetism.PhaserObject.body.setCircle(0);
      var constraint1 = game.physics.p2.createDistanceConstraint(
              esfera1.PhaserObject.body.sprite, esfera1.magnetism.PhaserObject.body.sprite, 0);
      esfera1.magnetism.PhaserObject.body.fixedRotation=true;
      esfera1.magnetism.PhaserObject.body.damping= 0.9;
      esfera1.magnetism.PhaserObject.body.setCollisionGroup(magnetCollisionGroup);
      esfera1.magnetism.PhaserObject.body.collisionGroup=magnetCollisionGroup;
      esfera1.magnetism.PhaserObject.body.collides([proyectilesCollisionGroup]);

      esfera2.magnetism.PhaserObject=magnetismos.create(esfera2.PhaserObject.body.x,
      esfera2.PhaserObject.body.y, 'magnetRangeP');
      esfera2.magnetism.PhaserObject.body.setCircle(0);
      var constraint2 = game.physics.p2.createDistanceConstraint(
              esfera2.PhaserObject.body.sprite, esfera2.magnetism.PhaserObject.body.sprite, 0);
      esfera2.magnetism.PhaserObject.body.fixedRotation=true;
      esfera2.magnetism.PhaserObject.body.damping= 0.9;
      esfera2.magnetism.PhaserObject.body.setCollisionGroup(magnetCollisionGroup);
      esfera2.magnetism.PhaserObject.body.collisionGroup=magnetCollisionGroup;
      esfera2.magnetism.PhaserObject.body.collides([proyectilesCollisionGroup]);

///////////////PROYECTILES///////////////
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
        proyectiles[i].PhaserObject.body.polarity= new Polarity();
        proyectiles[i].PhaserObject.body.setCollisionGroup(proyectilesCollisionGroup);
        proyectiles[i].PhaserObject.body.collisionGroup=proyectilesCollisionGroup;
        proyectiles[i].PhaserObject.body.collides([playerCollisionGroup,proyectilesCollisionGroup]);
        proyectiles[i].PhaserObject.body.onBeginContact.add(proyCollideSpheres,this);
      }
    },

    update: function() {

      var keys_bools1=[0,0,0,0,0];
      var keys_bools2=[0,0,0,0,0];
      if(W.isDown) keys_bools1[0]=1;
      if(A.isDown) keys_bools1[1]=1;
      if(S.isDown) keys_bools1[2]=1;
      if(D.isDown) keys_bools1[3]=1;
      if(SPACEBAR.isDown) keys_bools1[4]=1;

      if(up.isDown) keys_bools2[0]=1;
      if(left.isDown) keys_bools2[1]=1;
      if(down.isDown) keys_bools2[2]=1;
      if(right.isDown) keys_bools2[3]=1;
      if(ENTER.isDown) keys_bools2[4]=1;

        esfera1.Movement(keys_bools1);
        esfera2.Movement(keys_bools2);
        

        for(i=0; i< n_proyectiles; i++)
        {
          limitSpeed(proyectiles[i]);
          esfera1.magnetCollision(proyectiles[i].PhaserObject.body,16);
          esfera2.magnetCollision(proyectiles[i].PhaserObject.body,16);
        }



    },
    


}