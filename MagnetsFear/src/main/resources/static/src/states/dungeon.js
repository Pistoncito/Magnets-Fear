CimmerianDepths.dungeonState = function (game) {

}

var jugador;
var enemigo;
var items;
var map;
var interfaz;
var oscuridad;
var salida;
var invForj, invRec;
var forjado, recipe;
var grupo; //Grupo de la interfaz que mantiene los sprites por encima
var enemy_collision;
var popup;
var popup1;
var popup2;

CimmerianDepths.dungeonState.prototype = {

    preload: function () {

    },

    create: function () {
        enemy_collision = false;
        //popUpGroup = game.add.group();

        //Límites del mundo para la cámara
        game.world.setBounds(0, 0, 2240, 2240);

        map = new Mapa();
        map.createMap();

        items = new Array();

        items[0] = new Item(5, 600, 400, "palos", 'mat_palos');
        
        salida = game.add.sprite(320,1280,'salida');
        game.physics.enable(salida, Phaser.Physics.ARCADE);
        salida.body.immovable = true;
        
        //Controles
        var controls = game.add.sprite(320,256,'WASD');
        controls.alpha = 0.7;
        game.physics.enable(controls, Phaser.Physics.ARCADE);
        controls.body.immovable = true;
        //PopUp tutorial
        var text = "Para recoger un material,\nacércate y pulsa la\nbarra espaciadora";
        popup = new Popup(items[0].sprite.x - 80, items[0].sprite.y - 100, 'infoBg', text);
        //popup = new Popup(300, 300, 'infoBg', text);
        popup.show();

        //PopUp tutorial 2
        var text = "Para salir del nivel,\nacércate y pulsa la\nbarra espaciadora";
        popup2 = new Popup(salida.x - 60, salida.y - 100, 'infoBg', text);
        //popup = new Popup(300, 300, 'infoBg', text);
        popup2.show();

        jugador = new Jugador(400, 300, 'player');
        jugador.createInputs();
        
        interfaz = new Interfaz(jugador);
        interfaz.create();
        
        //Cosas de la cámara
        game.camera.follow(jugador.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    },

    update: function () {
        jugador.updateInputs();
        jugador.updateAnimations();
        jugador.checkLifePoints();
        
        if(enemigo){
            enemigo.updateMovement(jugador);
            enemigo.updateAnimations();
        }
        checkCollisions();

        for(i = 0; i < jugador.textItems.length; i++){
            if(jugador.textItems[i] === undefined) { jugador.textItems.splice(1,i); }
            jugador.textItems[i].update();
        }
        
        interfaz.update();
    }
}

function checkCollisions(){
    for(i = 0; i < items.length; i++){
        if(items[i].sprite && jugador.sprite){
            if(game.physics.arcade.collide(jugador.sprite, items[i].sprite) && jugador.space.isDown){
                jugador.pickUp(items[i]);

                //PopUp tutorial
                var text = "Pulse el click derecho del ratón\npara construir una antorcha.";
                popup1 = new Popup(jugador.sprite.x - 80, jugador.sprite.y - 50, 'infoBg', text);
                //popup = new Popup(300, 300, 'infoBg', text);
                popup1.show();
                //jugador.debug();
            }
        }
    }
    if(popup1){
        popup1.text.x = jugador.sprite.x - 80;
        popup1.text.y = jugador.sprite.y - 50;
    }

    if(salida && jugador.sprite){
        if(game.physics.arcade.collide(jugador.sprite, salida) && jugador.space.isDown){
            game.state.start('endingState');
        }
    }

    //Colisión jugador - enemigo
    if(enemigo && jugador){
        if(game.physics.arcade.overlap(jugador.sprite, enemigo.sprite)){
            if(!enemy_collision){
                setTimeout(function(){
                    jugador.vida -= 10;
                    enemy_collision = false;
                }, 500);
            }
            enemy_collision = true;
        }
    }
    
    //Colisión jugador - mapa
    game.physics.arcade.collide(jugador.sprite, map.layers[0]);
    game.physics.arcade.collide(jugador.sprite, map.layers[1]);
    
}
