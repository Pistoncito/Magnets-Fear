function Jugador(x, y, sprsheet){
    //VARIABLES PÚBLICAS
    this.vida = 100;
    this.maxVida = 100;
    this.sprite = game.add.sprite(x, y, sprsheet);
    this.recipes= [];
    this.forjados= [];
    this.textItems = [];

    //VARIABLES PRIVADAS
    var leftAnimation = this.sprite.animations.add('walkLeft', [7, 8, 9, 10, 7, 11, 12, 13]);
    var upAnimation = this.sprite.animations.add('walkUp', [14, 15, 16, 17, 14, 18, 19, 20]);
    var downAnimation = this.sprite.animations.add('walkDown', [0, 1, 2, 3, 0, 4, 5, 6]);
    var rightAnimation = this.sprite.animations.add('walkRight', [21, 22, 23, 24, 21, 25, 26, 27]);

    var up = false; /* Estas variables sirven para administrar que animación debe ir y si está o no activada */
    var down = false;/* Por defecto, todas desactivadas */
    var left = false;
    var right = false;
    //this.space;

    //MATERIALES
    this.palos = 0;

    //FUNCIONES
    this.createInputs = function () {
        game.input.mouse.capture = true;

        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.space= game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    this.updateInputs = function (){
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        if (this.aKey.isDown && !this.dKey.isDown) {
            this.sprite.body.velocity.x = -300;
        }
        if (this.dKey.isDown && !this.aKey.isDown) {
            this.sprite.body.velocity.x = 300;
        }
        if (this.wKey.isDown && !this.sKey.isDown) {
            up = true;
            this.sprite.body.velocity.y = -300;
        }
        if (this.sKey.isDown && !this.wKey.isDown) {
            down = true;
            this.sprite.body.velocity.y = 300;
        }
        if(game.input.activePointer.rightButton.isDown){ //Crafteo de antorcha prototipo
            if(recipe != undefined){
                if(this.palos >= 5){
                    //Crafteamos forjado
                    var x = invForj.icons[0][0].background.x - game.camera.x;
                    var y = invForj.icons[0][0].background.y - game.camera.y;
                    forjado = new Forged(x, y, "antorcha");
                    grupo.add(forjado.sprite);
                    forjado.sprite.fixedToCamera = true;
                    this.palos -= 5;
                    
                    //Destruimos anterior popup
                    popup1.hide();

                    //Creamos el enemigo
                    enemigo = new Enemigo(2000, 1100, 'enemy');

                    //MOSTRAR TEXTO: HAS CRAFTEADO UNA ANTORCHA
                    var text = "Has crafteado una antorcha.\nAhora tienes más radio de visión";
                    this.textItems[this.textItems.length] = new itemText(text, game.camera.width/2, (game.camera.height/2) - 200);
                    this.textItems[this.textItems.length - 1].fixedToCamera();
                    
                    //MOSTRAR TEXTO: HA APARECIDO UN ENEMIGO
                    var text = "Algo se está acercando...";
                    this.textItems[this.textItems.length] = new itemText(text, game.camera.width/2, (game.camera.height/2) - 300);
                    this.textItems[this.textItems.length - 1].fixedToCamera();
                }
            }
        }

        //Activamos animaciones left o right
        if (this.aKey.isDown && !this.wKey.isDown && !this.sKey.isDown) { left = true; }
        if (this.dKey.isDown && !this.wKey.isDown && !this.sKey.isDown) { right = true; }
        
        if (this.aKey.isDown && this.dKey.isDown) { left = false; right = false; }
        if (this.wKey.isDown && this.sKey.isDown) { up = false; down = false; }
    }

    this.updateAnimations = function () {
        if (up) { this.sprite.animations.play('walkUp', 15, true); } else { this.sprite.animations.stop('walkUp', true); }
        if (down) { this.sprite.animations.play('walkDown', 15, true); } else { this.sprite.animations.stop('walkDown', true); }
        if (left) { this.sprite.animations.play('walkLeft', 15, true); } else { this.sprite.animations.stop('walkLeft', true); }
        if (right) { this.sprite.animations.play('walkRight', 15, true); } else { this.sprite.animations.stop('walkRight', true); }
        up = down = right = left = false; //Reiniciamos variables
    }

    this.checkLifePoints = function(){
        if(this.vida <= 0){
            game.state.start('endingState');
        }
    }


    /* EXPLICACIÓN:
     * Una vez alcanzado un item, añade el valor correspondiente y lo destruye.
     * También muestra un texto al recogerlo.
     * 
     * ARGUMENTOS:
     * item: objeto de la clase Item
     */
    this.pickUp= function(item)
    {
        var text;
        switch(item.tipo){
            case "vida":
                this.vida += item.numero;
                text = "Has recibido " + item.numero + " puntos de vida."
                break;

            case "palos":
                this.palos += item.numero;
                text = "Has recogido " + item.numero + " palo/s."
                popup.hide();
                break;
        }
        if(text != undefined){
            this.textItems[this.textItems.length] = new itemText(text, item.sprite.x, item.sprite.y + 20);
        }
        item.destroy();
    }


    //FÍSICAS
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;

    this.sprite.body.setSize(this.sprite.width / 2 + 10, this.sprite.height / 2, this.sprite.width / 2 - 13, this.sprite.height / 2);
}
