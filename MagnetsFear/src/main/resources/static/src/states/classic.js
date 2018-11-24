MagnetsFear.classicState = function(game) {
}

//Variables Globales
//Cantidad de bases de cada jugador
var n_current_bases1;
var n_current_bases1;
//Música
var musicClassic;

//Funciones Globales
/*
Llamada cada vez que se golpea una base.
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
        if(soundOn==1)crashSound.play();       
        for(i=0; i< bases1.children.length; i++)  //SI EL OBJETO 1 ESTA EN BASES 1
          {
            if((bases1.children[i].body.id== obj1_body.id) && (bases1[i].invincibleTime<=0))  
            {
              
              bases1.children[i].body.clearCollision(!true,true);
              bases1.remove(bases1.children[i]);
              esfera2.score += 10;
              this.printScore();
              this.checkSpawnBases(); 
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
              this.printScore();
              this.checkSpawnBases(); 
              return;
            }
          }
              
     }
  if((obj2_body.collisionGroup== basesCollisionGroup) &&
     (obj1_body.collisionGroup== proyectilesCollisionGroup))
       {
    
         if(soundOn==1)crashSound.play();
         for(i=0; i< bases1.children.length; i++)  //SI EL OBJETO 2 ESTA EN BASES 1
         {

           if((bases1.children[i].body.id== obj2_body.id)&& (bases1[i].invincibleTime<=0))  
           {
              bases1.children[i].body.clearCollision(!true,true);
              bases1.remove(bases1.children[i]);
              esfera2.score += 10;
              this.printScore();
              this.checkSpawnBases(); 
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
             this.printScore(); 
             this.checkSpawnBases(); 
             return;
           }
         }
       }
  } //Fin de if undefined
}//Fin del metodo





MagnetsFear.classicState.prototype = {

    preload: function() {
      //Asigna a las variables de control por teclado con su tecla correspondiente
      setKeys();      
      //Inicialización de variables
      n_bases=3;
      bases1=[n_bases];
      bases2=[n_bases];
      
      n_proyectiles =  2;
      proyectiles= [n_proyectiles];

      totalSeconds = 120;
      gameSeconds = 60;
      gameMinutes = 1;
      timeSinceLastBasesSpawn=0;
      needToSpawnBases= false;
    },
    
    create: function() {

      //Se deduce el id del contrincante a partir del jugador uno
      if (player.id===1){opponent.id = 2;}
      else {opponent.id = 1;} 
      // Texto del tiempo
      timerStyle = {fill: "rgb(150,150,200)", font:"60px Chakra Petch", boundsAlignH: "center"};
      timerText = game.add.text(0,0,"2:00",timerStyle);
      timerText.setTextBounds(0,0,game.world.width,game.world.height);
      
      //Crea el background
      initBackground('StarfieldBg');

      //Ajuste de físicas
      //Activa eventos de Impacto, actualiza las colisiones con los bordes y ajusta restitution
      initPhysics();
      //Inicia Grupos de Colisiones
      initCollisionGroups();
      //Inicia los grupos de objetos y asigna sus físicas
      addGroups();
      initGroup(esferas);
      initGroup(magnetismos);
      initGroup(proyectiles);
      initGroup(bases1);
      initGroup(bases2);

      //Crea esferas de jugadores
      esfera1 = new Sphere();
      esfera2 = new Sphere();
      initSphere1(game.world.width/2-90, game.world.height/2-90, 'sphere1');
      initSphere2(game.world.width+90, game.world.height/2-90, 'sphere2');
      //Crea magnetismos de las esferas
      initMagnetism(esfera1);
      initMagnetism(esfera2);
      //Crea Proyectiles
      this.spawnRandProyectiles(n_proyectiles);
      //Crea Bases
      this.spawnBases();
      //Inicia el audio
      this.initAudio();
      // Inicia texto de puntuacion
      this.initScore();
      //Inicia tiempo en el juego
      this.initGameTime();
      initStatePlayers();
    },
    
    /*
    En update se crean vectores booleanos para saber que teclas se han pulsado y cuales no.
    Estos vectores se pasan como parametro a funciones que controlan el movimiento de las esferas.
    Se limita la velocidad de los proyectiles y se calcula la colision de estos con los magnetismos de esfera.
    */
    update: function() {
      updateKeys();
      updateMagnetCollision();
      updateStatePlayers();
      
    },

    //Inicia el audio del juego
    initAudio: function() {
      musicClassic = game.add.audio('classicMusic');
      crashSound = game.add.audio("crash");
      impactSound = game.add.audio("impact");  
      //La música empieza a sonar sólo si no sonaba antes
      if((!musicClassic.isPlaying)&&(musicOn==1)){musicClassic.play();}          
    },

    //Inicia el Texto de puntuación
    initScore: function() 
    {
      points1Text = game.add.text(0,0,"P1: " + esfera1.score,timerStyle);
      points1Text.setTextBounds(0,0,game.world.width/2,game.world.height);
      points2Text = game.add.text(0,0,"P2: " + esfera2.score,timerStyle);
      points2Text.setTextBounds(game.world.width/2,0,game.world.width/2,game.world.height);
    },

    //Muestra la puntuación de cada jugador por pantalla
    printScore: function()
    {
      points1Text.setText("P1: " + esfera1.score);
      points2Text.setText("P2: " + esfera2.score);
    },

    initGameTime: function()
    {
      wallClock= game.time.create(false);
      wallClock.loop(1000, this.printGameTime, this);
      needToSpawnBases= false;
      maxTimeToSpawnBases=30; 
      wallClock.start();  
    },

    //Calcula el tiempo restante y lo muestra por pantalla
    printGameTime: function()
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
            this.spawnBases();
        }
        if((gameSeconds%60) == 0){
            gameMinutes--;    
            gameSeconds = 59;
        }
        
        var result = gameMinutes;
        //Añade un 0 a los segundos si es menor que 10
        result += (gameSeconds < 10) ? ":0" + gameSeconds : ":" + gameSeconds;
        timerText.setText(result);    
      },


    //Recibe el número de proyectiles a crear
    //Crea los proyectiles en posiciones aleatorias, les asigna su animación y los añade al grupo de colisiones
    spawnRandProyectiles: function(num)
    {
      for(i=0; i< num; i++)
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
    },
    /*
    Borra todas las bases restantes de un jugador y
    Aparecen 3 nuevas para cada uno, equidistantes a un punto aleatorio
    Actualiza el tiempo para el nuevo "spawn" de las bases a 0
    */
    spawnBases: function (){
      var dist = 2/3 * PI;
      var pointX = game.rnd.integerInRange(290,350);
      var pointY = game.rnd.integerInRange(290,430);
      var angle = game.rnd.frac() * 0.67 * PI;
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
              var posX = Math.round(pointX + R * Math.cos(dist * (angle+i)));
              var posY = Math.round(pointY + R * Math.sin(dist * (angle+i)));

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
      //Actualiza el tiempo en el que aparecieron las últimas bases
      timeSinceLastBasesSpawn=0;
    },
    //Comprueba si player 1 o player 2 no tienen bases. Si es así, crea otras nuevas.
    checkSpawnBases: function ()
    { 
      if((bases1.children.length == 0) || (bases2.children.length == 0))
      {
       this.spawnBases();
      }
    }
}