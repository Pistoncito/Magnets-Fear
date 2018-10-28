MagnetsFear.classicState = function(game) {
}

//Variables
//variables de tiempo
var needToSpawnBases= false;
var maxTimeToSpawnBases; //30s
var basesSpawnTimer;
var wallClock;
var gameSeconds = 60;
var gameMinutes = 1;
var timerText;
var timerStyle;
var timeSinceLastBasesSpawn=0;

//variables de puntuacion
var puntusStyle;
var textPuntu1;
var textPuntu2;


var bg;

var esfera1;
var esfera2;
var esferas;

var magnetismo1;
var magnetismo2;
var magnetismos;

var n_bases;
var bases1;
var bases2;

var n_proyectiles;
var proyectiles;

var playerCollisionGroup;
var proyectilesCollisionGroup;
var magnetCollisionGroup
var basesCollisionGroup;

var W, A, S, D, SPACEBAR, up, left, down, right, ENTER;


//Funciones
function printPuntus()
{
  textPuntu1.setText("J1: " + esfera1.puntu);
  textPuntu2.setText("J2: " + esfera2.puntu);
}

function printGameTime()
  {
    timeSinceLastBasesSpawn++;
      gameSeconds--;
      

      if((timeSinceLastBasesSpawn-maxTimeToSpawnBases)== 0){
        spawnBases();
      }
        if((gameSeconds%maxTimeToSpawnBases) == 0){
        if((gameSeconds%60) == 0){
          gameMinutes--;
          gameSeconds = 59;
        }
      }
      var result = gameMinutes;
      //Añade un 0 a los segundos si es menor que 10
      result += (gameSeconds < 10) ? ":0" + gameSeconds : ":" + gameSeconds;
      timerText.setText(result);    
    
  }

function spawnBases()
  {
      var dist = 2/3 * Math.PI;
      var pointX = game.rnd.integerInRange(290,350);
      var pointY = game.rnd.integerInRange(290,430);
      var R = 250;

     
      var aux1= bases1.children.length-1;
      var aux2= bases2.children.length-1;
      while(bases1.children.length >0)
      {
        bases1.children[aux1].body.clearCollision(true,true);
        bases1.remove(bases1.children[aux1]);
        aux1--;
      }
      while(bases2.children.length >0)
      {
        bases2.children[aux2].body.clearCollision(true,true);
        bases2.remove(bases2.children[aux2]);
        aux2--;
      }
  /*
      alert("Despues de borrar, children1.length vale: " +bases1.children.length);
      alert("Despues de borrar, children2.length vale: " +bases2.children.length);
*/

      for(i=0; i< n_bases; i++)
            {
              var posX = Math.round(pointX + R * Math.cos(dist * (i+1)));
              var posY = Math.round(pointY + R * Math.sin(dist * (i+1)));
              bases1[i]= new Bases(bases1.create(posX, posY, 'civilization1'));
              bases1[i].PhaserObject.frame = 0;
              bases1[i].PhaserObject.animations.add('idle',[0,1,2,3,3,2,1],10,true);
              bases1[i].PhaserObject.animations.play('idle');
              bases1[i].PhaserObject.body.setCircle(24);
              bases1[i].PhaserObject.body.anchor = 0.5;
              bases1[i].PhaserObject.body.angularVelocity= bases1[i].rotSpeed;
              bases1[i].PhaserObject.body.angularDamping=0;
              bases1[i].PhaserObject.body.kinematic=true;
              bases1[i].PhaserObject.body.rotation= bases1[i].rotSpeed;
              bases1[i].PhaserObject.body.setCollisionGroup(basesCollisionGroup);
              bases1[i].PhaserObject.body.collisionGroup= basesCollisionGroup;
              bases1[i].PhaserObject.body.collides([proyectilesCollisionGroup,playerCollisionGroup]);
              bases1[i].PhaserObject.body.onBeginContact.add(hitBase,this);
    
              bases2[i]= new Bases(bases2.create((1280-posX), (720-posY),'civilization2'));
              bases2[i].PhaserObject.frame = 0;
              bases2[i].PhaserObject.animations.add('idle',[0,1,2,3,3,2,1],10,true);
              bases2[i].PhaserObject.animations.play('idle');
              bases2[i].PhaserObject.body.setCircle(24);
              bases2[i].PhaserObject.body.angularVelocity= bases2[i].rotSpeed;
              bases2[i].PhaserObject.body.angularDamping=0;
              bases2[i].PhaserObject.body.kinematic=true;
              bases2[i].PhaserObject.body.rotation= bases2[i].rotSpeed;
              bases2[i].PhaserObject.body.setCollisionGroup(basesCollisionGroup);
              bases2[i].PhaserObject.body.collisionGroup= basesCollisionGroup;
              bases2[i].PhaserObject.body.collides([proyectilesCollisionGroup,playerCollisionGroup]);
              bases2[i].PhaserObject.body.onBeginContact.add(hitBase,this);
    
            }
            timeSinceLastBasesSpawn=0;
    }
    
function checkSpawnBases()
{ 
  if((bases1.children.length == 0) || (bases2.children.length == 0))
  {
   spawnBases();
  }
}

function hitBase(body1, body2, shape1, shape2, equation)
{
  var obj1_body= equation[0].bodyA.parent;
  var obj2_body = equation[0].bodyB.parent;

    if(obj1_body !=undefined && obj2_body !=undefined)
    {
      if((obj1_body.collisionGroup== basesCollisionGroup) &&
        (obj2_body.collisionGroup== proyectilesCollisionGroup))
     {
      //borro objeto1 del grupo de bases
        for(i=0; i< bases1.children.length; i++)  //SI EL OBJETO 1 ESTA EN BASES 1
          {
            if(bases1.children[i].body.id== obj1_body.id)  
            {
              bases1.children[i].body.clearCollision(true,true);
              bases1.remove(bases1.children[i]); 
          //alert("numero de bases1: " + bases1.children.length);
          esfera2.puntu += 10;
          printPuntus();
              checkSpawnBases();
              return;
            }
          }

        for(i=0; i< bases2.children.length; i++)  //SI EL OBJETO 1 ESTA EN BASES 2
          {
            if(bases2.children[i].body.id== obj1_body.id)
            { 
              bases2.children[i].body.clearCollision(true,true);
              bases2.remove(bases2.children[i]); 
            //  alert("numero de bases2: " + bases2.children.length);
            esfera1.puntu += 10;
            printPuntus();
              checkSpawnBases();
              return;
            }
          }      
     }
  if((obj2_body.collisionGroup== basesCollisionGroup) &&
     (obj1_body.collisionGroup== proyectilesCollisionGroup))
       {
         //borro objeto2 del grupo de bases
         for(i=0; i< bases1.children.length; i++)  //SI EL OBJETO 2 ESTA EN BASES 1
         {
           if(bases1.children[i].body.id== obj2_body.id)  
           {
             //Borra la mascara de colision pero no borra del collisionGroup
               bases1.children[i].body.clearCollision(true,true);
               bases1.remove(bases1.children[i]); 
             //  alert("numero de bases1: " + bases1.children.length);
             esfera2.puntu += 10;
             printPuntus();
               checkSpawnBases();
               return;
           }
         }

       for(i=0; i< bases2.children.length; i++)  //SI EL OBJETO 2 ESTA EN BASES 2
         {
           if(bases2.children[i].body.id== obj2_body.id)
           { 
              //Borra la mascara de colision pero no borra del collisionGroup
             bases2.children[i].body.clearCollision(true,true);
             bases2.remove(bases2.children[i]); 
           //  alert("numero de bases2: " + bases2.children.length);
           esfera1.puntu += 10;
           printPuntus();
             checkSpawnBases();
             return;
           }
         }
       }
  } //Fin de if undefined
}//Fin del metodo

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
        proyectiles[i].PhaserObject.body.polarity.positive *=-1;

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
        proyectiles[i].PhaserObject.body.polarity.positive*=-1;
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
      //bg = game.add.image(0,0,'background');

     // Texto del tiempo
     timerStyle = {fill: "rgb(150,150,200)", font:"100px Chakra Petch", boundsAlignH: "center"};
     timerText = game.add.text(0,0,"2:00",timerStyle);
     timerText.setTextBounds(0,0,game.world.width,game.world.height);


      game.physics.p2.setImpactEvents(true);
      game.physics.p2.updateBoundsCollisionGroup();
      game.physics.p2.restitution = 1.0;

    
      playerCollisionGroup=game.physics.p2.createCollisionGroup();
      proyectilesCollisionGroup= game.physics.p2.createCollisionGroup();
      magnetCollisionGroup= game.physics.p2.createCollisionGroup();
      basesCollisionGroup= game.physics.p2.createCollisionGroup();


      magnetismos= game.add.group();
      magnetismos.enableBody=true;
      magnetismos.physicsBodyType= Phaser.Physics.P2JS;

      esferas= game.add.group();
      esferas.enableBody=true;
      esferas.physicsBodyType= Phaser.Physics.P2JS;

      proyectiles= game.add.group();
      proyectiles.enableBody=true;
      proyectiles.physicsBodyType= Phaser.Physics.P2JS;

      bases1= game.add.group();
      bases2= game.add.group();
      bases1.enableBody=true;
      bases2.enableBody=true;
      bases1.physicsBodyType= Phaser.Physics.P2JS;
      bases2.physicsBodyType= Phaser.Physics.P2JS;
///////////////MAGNETISMOS///////////////
  

      magnetismo1=magnetismos.create(0, 0, 'magnetismNegPos');
      magnetismo1.frame=0;
      magnetismo1.animations.add('negative',[0,1,2,3,4,5,4,3,2,1],5, true);
      magnetismo1.animations.add('positive',[7,8,9,10,11,12,11,10,9,8],5, true);
      magnetismo1.animations.play('negative');
      magnetismo1.body.setCircle(0);
      magnetismo1.body.fixedRotation=true;
      magnetismo1.body.damping= 0.9;
      magnetismo1.body.setCollisionGroup(magnetCollisionGroup);
      magnetismo1.body.collisionGroup=magnetCollisionGroup;
      magnetismo1.body.collides([proyectilesCollisionGroup]);

      magnetismo2=magnetismos.create(0, 0, 'magnetismNegPos');
      magnetismo2.frame=0;
      magnetismo2.animations.add('negative',[0,1,2,3,4,5,4,3,2,1],5, true);
      magnetismo2.animations.add('positive',[6,7,8,9,10,11,10,9,8,7],5, true);
      magnetismo2.animations.play('negative');
      magnetismo2.body.setCircle(0);
      magnetismo2.body.fixedRotation=true;
      magnetismo2.body.damping= 0.9;
      magnetismo2.body.setCollisionGroup(magnetCollisionGroup);
      magnetismo2.body.collisionGroup=magnetCollisionGroup;
      magnetismo2.body.collides([proyectilesCollisionGroup]);
///////////////MAGNETISMOS///////////////
        
///////////////ESFERAS///////////////  
      esfera1= new Sphere(esferas.create(game.world.height/2-90, 90, 'sphere1'));
      esfera1.PhaserObject.frame = 0;
      esfera1.PhaserObject.animations.add('negative',[0,1,2,3,2,1],10,true);
      esfera1.PhaserObject.animations.add('positive',[4,5,6,7,6,5],10,true);
      esfera1.PhaserObject.animations.play('negative');
      esfera1.PhaserObject.body.setCircle(32);
      esfera1.PhaserObject.body.fixedRotation=true;
      esfera1.PhaserObject.body.mass=8;
      esfera1.PhaserObject.body.damping=0.9;
      esfera1.PhaserObject.body.setCollisionGroup(playerCollisionGroup);
      esfera1.PhaserObject.body.collisionGroup= playerCollisionGroup;
      esfera1.PhaserObject.body.collides([proyectilesCollisionGroup,playerCollisionGroup,basesCollisionGroup]);
      esfera1.PhaserObject.body.polarity= new Polarity();

      esfera2= new Sphere(esferas.create(game.world.width-90, game.world.height/2-90,'sphere2'));
      esfera2.PhaserObject.frame = 0;
      esfera2.PhaserObject.animations.add('negative',[0,1,2,3,2,1],10,true);
      esfera2.PhaserObject.animations.add('positive',[4,5,6,7,6,5],10,true);
      esfera2.PhaserObject.animations.play('negative');
      esfera2.PhaserObject.body.setCircle(32);
      esfera2.PhaserObject.body.fixedRotation=true;
      esfera2.PhaserObject.body.mass=8;
      esfera2.PhaserObject.body.damping= 0.9;
      esfera2.PhaserObject.body.setCollisionGroup(playerCollisionGroup);
      esfera2.PhaserObject.body.collisionGroup= playerCollisionGroup;
      esfera2.PhaserObject.body.collides([proyectilesCollisionGroup,playerCollisionGroup,basesCollisionGroup]);
      esfera2.PhaserObject.body.polarity= new Polarity();

      
      //////////SET MAGNETISM TO SPHERES //////////
      esfera1.magnetism.PhaserObject= magnetismo1;
      var constraint1 = game.physics.p2.createDistanceConstraint(
        esfera1.PhaserObject.body.sprite, esfera1.magnetism.PhaserObject.body.sprite, 0);

        esfera2.magnetism.PhaserObject=magnetismo2;
         var constraint2 = game.physics.p2.createDistanceConstraint(
                  esfera2.PhaserObject.body.sprite, esfera2.magnetism.PhaserObject.body.sprite, 0);
       //////////SET MAGNETISM TO SPHERES //////////
 
      

///////////////PROYECTILES///////////////
  

      for(i=0; i< n_proyectiles; i++)
        {
          proyectiles[i]= new Proyectile(proyectiles.create(game.world.randomX, game.world.randomY,'proyectileSpSheet'));
          proyectiles[i].PhaserObject.frame = 0;
          proyectiles[i].PhaserObject.animations.add('negative',[0,1,2,3,4,5],10,true);
          proyectiles[i].PhaserObject.animations.add('positive',[6,7,8,9,10,11],10,true);
          proyectiles[i].PhaserObject.animations.play('negative');
          proyectiles[i].PhaserObject.body.setCircle(16);
          proyectiles[i].PhaserObject.body.fixedRotation=true;
          proyectiles[i].PhaserObject.body.velocity.x=300;
          proyectiles[i].PhaserObject.body.velocity.y=300;
          proyectiles[i].PhaserObject.body.damping=0;
          proyectiles[i].PhaserObject.body.polarity= new Polarity();
          proyectiles[i].PhaserObject.body.setCollisionGroup(proyectilesCollisionGroup);
          proyectiles[i].PhaserObject.body.collisionGroup=proyectilesCollisionGroup;
          proyectiles[i].PhaserObject.body.collides([playerCollisionGroup,proyectilesCollisionGroup,basesCollisionGroup]);
          proyectiles[i].PhaserObject.body.onBeginContact.add(proyCollideSpheres,this);
        }
    
////////////////BASES//////////////
      spawnBases();

         ///////////////TIEMPO DE JUEGO///////////////
      wallClock= game.time.create(false);
      wallClock.loop(1000, printGameTime, this);
      needToSpawnBases= false;
      maxTimeToSpawnBases=30; //30s
      wallClock.start();
        

     //Texto de puntus
     puntusStyle= {fill: "rgb(150,150,200)", font: "30px Chakra Petch", boundsAlignH:"center"};
     textPuntu1= game.add.text(0,0, "J1: " + esfera1.puntu,puntusStyle);
     textPuntu2= game.add.text(0,0, "J2: " + esfera2.puntu, puntusStyle);
     textPuntu1.setTextBounds(0,0,game.world.width/2, game.world.height);
     textPuntu2.setTextBounds(game.world.width/2,0,game.world.width/2,game.world.height);
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