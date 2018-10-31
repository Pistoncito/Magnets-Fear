MagnetsFear.classicState = function(game) {
}

//Variables
////VARIABLES DE CONTROL DE TIEMPO PARA EVENTOS
var needToSpawnBases;
var maxTimeToSpawnBases;
var wallClock;
var totalSeconds;
var gameSeconds;
var gameMinutes;
var timeSinceLastBasesSpawn;
////

//// VARIABLES DE TEXTO POR PANTALLA
var points1Text;
var points2Text;
var timerText;
var timerStyle;
////

var PI = Math.PI;

var bg;
//// OBJETOS PARA ESFERAS Y SU GRUPO
var esfera1;
var esfera2;
var esferas;

////GRUPO DE MAGNETISMO
var magnetismos;

//// OBJETOS PARA BASE Y SU GRUPO
var n_bases;
var n_current_bases1;
var n_current_bases1;
var bases1;
var bases2;
////

//// VARIABLE PARA NUMERO DE PROYECTILES INICIAL Y SU GRUPO
var n_proyectiles;
var proyectiles;
////

//// CONJUNTO DE TODOS LOS COLLISION GROUP
var playerCollisionGroup;
var proyectilesCollisionGroup;
var magnetCollisionGroup;
var basesCollisionGroup;

//// TODOS LOS POSIBLES INPUTS DEL JUEGO
var W, A, S, D, SPACEBAR, up, left, down, right, ENTER;

var musicClassic;

//Funciones
function printScore()
{
  points1Text.setText("P1: " + esfera1.score);
  points2Text.setText("P2: " + esfera2.score);
}

/*Callback que es llamada cada segundo del mundo real.
Actualiza el estado de invencibilidad de las bases.
Actualiza el tiempo de juego restante y lo muestra por pantalla.
Comprueba que el tiempo de juego es menor a 2 minutos, sino lo termina.
*/
function printGameTime()
  {
    for(i=0; i< bases1.children.length; i++)
    {
      var aux=bases1[i];
      if(aux.invincibleTime > 0)
      {
        aux.invincibleTime -=1;
        if(aux.invincibleTime <= 0)bases1.children[i].alpha=1;
      }


    }
    for(i=0; i< bases2.children.length; i++)
    {
      var aux=bases2[i];
      if(aux.invincibleTime> 0)
      {
        aux.invincibleTime -=1;
        if(aux.invincibleTime <= 0)bases2.children[i].alpha=1;
      } 
  
    }
    totalSeconds--;
    if(totalSeconds <= 1){
        musicClassic.stop();
        game.state.start('endingState');
    }
    timeSinceLastBasesSpawn++;
    gameSeconds--;
    if(timeSinceLastBasesSpawn == maxTimeToSpawnBases){
        spawnBases();
    }
    if((gameSeconds%60) == 0){
        gameMinutes--;    
        gameSeconds = 59;
    }
    
    var result = gameMinutes;
    //Añade un 0 a los segundos si es menor que 10
    result += (gameSeconds < 10) ? ":0" + gameSeconds : ":" + gameSeconds;
    timerText.setText(result);    
  }

/*
Borra todas las bases restantes de un jugador y
Spawnea 3 nuevas para cada uno equidistantes a un punto
Updatea el tiempo para el nuevo spawn de las bases a 0
*/
function spawnBases(){
  var dist = 2/3 * PI;
  var pointX = game.rnd.integerInRange(290,350);
  var pointY = game.rnd.integerInRange(290,430);
  var R = 250;

  var aux1= bases1.children.length-1;
  var aux2= bases2.children.length-1;
  //borrar bases antiguas
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
  //Crear nuevas
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
          bases1[i].PhaserObject.alpha=0.5;
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
          bases2[i].PhaserObject.alpha=0.5;
          bases2[i].PhaserObject.body.setCollisionGroup(basesCollisionGroup);
          bases2[i].PhaserObject.body.collisionGroup= basesCollisionGroup;
          bases2[i].PhaserObject.body.collides([proyectilesCollisionGroup,playerCollisionGroup]);
          bases2[i].PhaserObject.body.onBeginContact.add(hitBase,this);

        }
  timeSinceLastBasesSpawn=0;
}

//Mira si player 1 o player 2 no tienen bases. si es asi spawnea nuevas.
function checkSpawnBases()
{ 
  if((bases1.children.length == 0) || (bases2.children.length == 0))
  {
   spawnBases();
  }
}

/*
Callback para cada vez que se golpea una base.
Recibe los bodys y las shapes del objeto que colisiona con la base, asi como la ecuacion que calcula la colision
Comprueba si lo que golpea a la base es un proyectil, si es asi lo destruye.
*/
function hitBase(body1, body2, shape1, shape2, equation)
{
  var obj1_body= equation[0].bodyA.parent;
  var obj2_body = equation[0].bodyB.parent;

    if(obj1_body !=undefined && obj2_body !=undefined)
    {

      if((obj1_body.collisionGroup== basesCollisionGroup) &&
        (obj2_body.collisionGroup== proyectilesCollisionGroup))
     {
        crashSound.play();       
        for(i=0; i< bases1.children.length; i++)  //SI EL OBJETO 1 ESTA EN BASES 1
          {
            if((bases1.children[i].body.id== obj1_body.id) && (bases1[i].invincibleTime<=0))  
            {
              
              bases1.children[i].body.clearCollision(!true,true);
              bases1.remove(bases1.children[i]);
              esfera2.score += 10;
              printScore();
              checkSpawnBases(); 
              return;
            }
          }

        for(i=0; i< bases2.children.length; i++)  //SI EL OBJETO 1 ESTA EN BASES 2
          {
            
            if((bases2.children[i].body.id== obj1_body.id) && (bases2[i].invincibleTime<=0))
            { 
              bases2.children[i].body.clearCollision(!true,true);
              bases2.remove(bases2.children[i]);
              esfera1.score += 10;             
              printScore();
              checkSpawnBases(); 
              return;
            }
          }
              
     }
  if((obj2_body.collisionGroup== basesCollisionGroup) &&
     (obj1_body.collisionGroup== proyectilesCollisionGroup))
       {
    
         crashSound.play();
         for(i=0; i< bases1.children.length; i++)  //SI EL OBJETO 2 ESTA EN BASES 1
         {

           if((bases1.children[i].body.id== obj2_body.id)&& (bases1[i].invincibleTime<=0))  
           {
              bases1.children[i].body.clearCollision(!true,true);
              bases1.remove(bases1.children[i]);
              esfera2.score += 10;
              printScore();
              checkSpawnBases(); 
              return;
           }
         }

       for(i=0; i< bases2.children.length; i++)  //SI EL OBJETO 2 ESTA EN BASES 2
         {

           if((bases2.children[i].body.id== obj2_body.id) && (bases2[i].invincibleTime<=0))
           { 
             bases2.children[i].body.clearCollision(!true,true);
             bases2.remove(bases2.children[i]);
             esfera1.score += 10;
             printScore(); 
             checkSpawnBases(); 
             return;
           }
         }
       }
  } //Fin de if undefined
}//Fin del metodo

/*
Comprueba colisiones con una esfera.
Recibe los mismos parametros que el metodo anterior.
Si lo que colisiona con la esfera es un proyectil, cambia la polaridad del proyectil
*/
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
        impactSound.play();
        // alert("body1 es proyectil");
        proyectiles[i].PhaserObject.body.polarity.positive
        *=-1;
        //proyectiles[i].PhaserObject.body.polarity.Switch();
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
        impactSound.play();
        //alert("body2 es proyectil");
        proyectiles[i].PhaserObject.body.polarity.positive
         *=-1;
        // proyectiles[i].PhaserObject.body.polarity.Switch();
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
  
/*
En preload Inicializamos todas las variables que se van a usar en classic.
Setteamos todas las teclas como teclas de phaser y las capturamos para que no intervengan en el navegador.
*/
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
      
      //Valores de variables
      n_bases=3;
      bases1=[n_bases];
      bases2=[n_bases];
      
      n_proyectiles = 1;
      proyectiles= [n_proyectiles];

      totalSeconds = 120;
      gameSeconds = 60;
      gameMinutes = 1;
      timeSinceLastBasesSpawn=0;
      needToSpawnBases= false;
    },
    
  /*
  En create se define el estilo de texto, el tipo de fisicas, los grupos y grupos de colision
  y se añaden todos los objetos a cada grupo y se les asigna su grupo de colision.
  Se crean los sonidos y la musica.
  Tambien se definen las variables de tiempo y los timers.
  */
    create: function() {
      //bg = game.add.image(0,0,'background');

      // Texto del tiempo
      timerStyle = {fill: "rgb(150,150,200)", font:"60px Chakra Petch", boundsAlignH: "center"};
      timerText = game.add.text(0,0,"2:00",timerStyle);
      timerText.setTextBounds(0,0,game.world.width,game.world.height);
      

      //Ajuste de físicas
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
///////////////MAGNETISMOS///////////////
      esfera1.magnetism.PhaserObject=magnetismos.create(esfera1.PhaserObject.body.x-500/2,
      esfera1.PhaserObject.body.y - 500/2, 'magnetRange');
      esfera1.magnetism.PhaserObject.frame = 0;
      esfera1.magnetism.PhaserObject.animations.add('negative',[0,1,2,3,2,1],10,true);
      esfera1.magnetism.PhaserObject.animations.add('positive',[4,5,6,7,6,5],10,true);
      esfera1.magnetism.PhaserObject.animations.play('negative');
      esfera1.magnetism.PhaserObject.body.setCircle(0);
      var constraint1 = game.physics.p2.createDistanceConstraint(
      esfera1.PhaserObject.body.sprite, esfera1.magnetism.PhaserObject.body.sprite, 0);
      esfera1.magnetism.PhaserObject.body.fixedRotation=true;
      esfera1.magnetism.PhaserObject.body.damping= 0.9;
      esfera1.magnetism.PhaserObject.body.setCollisionGroup(magnetCollisionGroup);
      esfera1.magnetism.PhaserObject.body.collisionGroup=magnetCollisionGroup;
      esfera1.magnetism.PhaserObject.body.collides([proyectilesCollisionGroup]);

      esfera2.magnetism.PhaserObject=magnetismos.create(esfera2.PhaserObject.body.x,
      esfera2.PhaserObject.body.y - 500/2, 'magnetRange');
      esfera2.magnetism.PhaserObject.frame = 0;
      esfera2.magnetism.PhaserObject.animations.add('negative',[0,1,2,3,2,1],10,true);
      esfera2.magnetism.PhaserObject.animations.add('positive',[4,5,6,7,6,5],10,true);
      esfera2.magnetism.PhaserObject.animations.play('negative');
      esfera2.magnetism.PhaserObject.body.setCircle(0);
      var constraint2 = game.physics.p2.createDistanceConstraint(
      esfera2.PhaserObject.body.sprite, esfera2.magnetism.PhaserObject.body.sprite, 0);
      esfera2.magnetism.PhaserObject.body.fixedRotation=true;
      esfera2.magnetism.PhaserObject.body.damping= 0.9;
      esfera2.magnetism.PhaserObject.body.setCollisionGroup(magnetCollisionGroup);
      esfera2.magnetism.PhaserObject.body.collisionGroup=magnetCollisionGroup;
      esfera2.magnetism.PhaserObject.body.collides([proyectilesCollisionGroup]);

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
    
  ///////////////BASES///////////////
      spawnBases();
  ///////////////MÚSICA///////////////
      musicClassic = game.add.audio('classicMusic');
      if(!musicClassic.isPlaying){musicClassic.play();}
  ///////////////SONIDO///////////////
      crashSound = game.add.audio("crash");
      impactSound = game.add.audio("impact");
      // Texto puntuacion
      points1Text = game.add.text(0,0,"P1: " + esfera1.score,timerStyle);
      points1Text.setTextBounds(0,0,game.world.width/2,game.world.height);
      points2Text = game.add.text(0,0,"P2: " + esfera2.score,timerStyle);
      points2Text.setTextBounds(game.world.width/2,0,game.world.width/2,game.world.height);
  ///////////////TIEMPO DE JUEGO///////////////
      wallClock= game.time.create(false);
      wallClock.loop(1000, printGameTime, this);
      needToSpawnBases= false;
      maxTimeToSpawnBases=30; //30s
      wallClock.start();
    },

  /*
  En update se crean vectores booleanos para saber que teclas se han pulsado y cuales no.
  Estos vectores se pasan como parametro a funciones que controlan el movimiento de las esferas.
  Se limita la velocidad de los proyectiles y se calcula la colision de estos con los magnetismos de esfera.
  */
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
