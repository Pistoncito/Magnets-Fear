MagnetsFear.classicState = function(game) {
}

//Variables
var bg;
var numPlayers = 1;
var numProyectiles = 4;
var numPlayerBases = 3;
var possible_keys = [
  Phaser.Keyboard.W,
  Phaser.Keyboard.A,
  Phaser.Keyboard.S,
  Phaser.Keyboard.D];




MagnetsFear.classicState.prototype = {

    preload: function() {
        //prevents possible keys from propagating to the browser
        game.input.keyboard.addKeyCapture(this.possible_keys);
        /*
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        
        for(i=0; i< this.keysPressed.length;i++)
            {
                this.keysPressed[i]= game.input.keyboard.addKey(this.possible_keys[i]);
            }
        */
    },

    create: function() {
     
        bg = game.add.image(0,0,'background');

        
        // Activa eventos de impacto
        //game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 1.0;
        // Se crean los grupos de colisiones
        var playerCollisionGroup = game.add.physicsGroup(Phaser.Physics.P2JS);
        var proyectilesCollisionGroup = game.add.physicsGroup(Phaser.Physics.P2JS);
        // Necesario para que los objetos colisionen contra los bordes
        game.physics.p2.updateBoundsCollisionGroup();

        //Creación del grupo de proyectiles
        var proyectiles = game.add.group();
        proyectiles.enableBody = true;
        proyectiles.physicsBodyType = Phaser.Physics.P2JS;
        for (var i = 0; i < numProyectiles; i++)
        {
          var proyectil = proyectiles.create(game.world.randomX, game.rnd.between(0, 100), 'proyectile1');
          proyectil.body.setCircle(30);
          proyectil.body.fixedRotation = true;          
          proyectil.animations.add('proyect1',[0],60,true);
          proyectil.animations.add('proyect2',[0],60,true);
          proyectil.body.velocity.x = 200;
          proyectil.body.velocity.y = -200;
          proyectil.body.damping = 0;
          // Se le asigna a los proyectiles su grupo de Colisiones
          proyectil.body.setCollisionGroup(proyectilesCollisionGroup);
          // Proyectiles colisionan contra otros proyectiles y contra las esferas
          //proyectil.body.collides([proyectilesCollisionGroup, playerCollisionGroup]);
        }
        //Creación del grupo de esferas(jugadores)
        var esferas = game.add.group();
        esferas.enableBody = true;
        esferas.physicsBodyType = Phaser.Physics.P2JS;
        for (var i = 0; i < numPlayers; i++)
        {
          var esfera = esferas.create(game.world.randomX, game.rnd.between(0, 100), 'sphere1p');
          esfera.body.setCircle(45);
          esfera.body.fixedRotation = true;
          esfera.body.damping = 0;
          // Se le asigna a las esferas su grupo de colisiones
          esfera.body.setCollisionGroup(playerCollisionGroup);
          // Si la esfera choca contra un proyectil llama a la función hitProyectil
          //esfera.body.collides([proyectilesCollisionGroup, playerCollisionGroup]);
        }        
      },



    update: function() {

    },
    


}
