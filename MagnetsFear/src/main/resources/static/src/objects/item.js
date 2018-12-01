/* EXPLICACIÓN:
 * Este objeto es un item genérico, puede ser una baldosa que te quita vida y se destruye,
 *  puede ser algún tipo de material que se puede recoger, etc. 
 * 
 * ARGUMENTOS:
 * num: entero = cantidad del objeto/vida deseado
 * tipo: string
 *  - "vida" -> item que modifica la vida directamente
 *  - "palos" -> añade un cierto número del material palos al inventario
 * spr: sprite asociado
 * 
 */
function Item(num, posx, posy, tipo, spr){

    this.numero = num;
    this.sprite = game.add.sprite(posx,posy,spr);
    this.tipo = tipo;

    this.destroy = function(){
        this.sprite.destroy();
        delete this;
    }

    //Activamos Physics
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;
}

//OBJETO QUE MUESTRA UN TEXTO Y DESAPARECE CON EL TIEMPO
function itemText(texto, posx, posy){
    var style= {fill:"rgb(255,255,255)", font: "20px Averia Sans Libre", align:"center"};
    var miTexto = game.add.text(posx, posy, texto, style);
    grupo.add(miTexto);
    miTexto.anchor.x = 0.5;

    this.update = function(){ //El texto desaparece poco a poco y va subiendo
        miTexto.alpha -= 0.006;
        miTexto.y -= 0.15;
        if(miTexto.alpha <= 0.01){
            grupo.remove(miTexto);
            miTexto.destroy();
            delete this;
        }
    }
    this.fixedToCamera = function(){
        miTexto.fixedToCamera = true;
    }
}
