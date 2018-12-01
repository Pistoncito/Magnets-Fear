function Enemigo(x, y, sprsheet){
    //VARIABLES PÚBLICAS
    this.sprite = game.add.sprite(x, y, sprsheet);
    this.sprite.alpha = 0.7;

    this.sprite.animations.add('walkLeft', [5,6,7,7,6,5,8,9,9,8]);
    this.sprite.animations.add('walkUp', [10,11,12,12,11,10,13,14,14,13]);
    this.sprite.animations.add('walkDown', [0,1,2,2,1,0,3,4,4,3]);
    this.sprite.animations.add('walkRight', [15,16,17,17,16,15,18,19,19,18]);

    //FUNCIONES
    this.updateMovement = function (jugador){
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        //El fantasma se mueve según la posición del jugador
        game.physics.arcade.moveToObject(this.sprite, jugador.sprite, 250);

        //Calculamos la velocidad del objeto para ver qué animación debemos poner
        
        
    }

    this.updateAnimations = function () {
        if(this.sprite.body.velocity.y < 0){
            if(this.sprite.body.velocity.x < 0 && this.sprite.body.velocity.x < this.sprite.body.velocity.y){
                //izquierda
                this.sprite.animations.play('walkLeft', 15, true);
            } else if(this.sprite.body.velocity.x < 0 && this.sprite.body.velocity.x > this.sprite.body.velocity.y){
                //arriba
                this.sprite.animations.play('walkUp', 15, true);
            }
            if(this.sprite.body.velocity.x > 0 && this.sprite.body.velocity.x > -this.sprite.body.velocity.y){
                //derecha
                this.sprite.animations.play('walkRight', 15, true);
            } else if(this.sprite.body.velocity.x > 0 && this.sprite.body.velocity.x < -this.sprite.body.velocity.y) {
                //Arriba
                this.sprite.animations.play('walkUp', 15, true);
            }
        }
        if(this.sprite.body.velocity.y > 0){
            if(this.sprite.body.velocity.x < 0 && -this.sprite.body.velocity.x > this.sprite.body.velocity.y){
                //izquierda
                this.sprite.animations.play('walkLeft', 15, true);
            } else if(this.sprite.body.velocity.x < 0 && -this.sprite.body.velocity.x < this.sprite.body.velocity.y){
                //abajo
                this.sprite.animations.play('walkDown', 15, true);
            }
            if(this.sprite.body.velocity.x > 0 && this.sprite.body.velocity.x > this.sprite.body.velocity.y){
                //derecha
                this.sprite.animations.play('walkRight', 15, true);
            } else if(this.sprite.body.velocity.x > 0 && this.sprite.body.velocity.x < this.sprite.body.velocity.y) {
                //abajo
                this.sprite.animations.play('walkDown', 15, true);
            }
        }

    }

    //FÍSICAS
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    
    this.sprite.body.immovable = true;

    this.sprite.body.setSize(this.sprite.width / 2 + 10, this.sprite.height / 2, this.sprite.width / 2 - 13, this.sprite.height / 2);
}
