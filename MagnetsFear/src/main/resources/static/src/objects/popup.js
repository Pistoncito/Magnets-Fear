function Popup(x, y, image, t){ // 't' es el texto que va dentro del popup, 'x' e 'y' coordenadas dentro de la camara
    //La imagen seguramente sea la misma para todos los popups
    //Creamos ya el sprite que va asociado al popup que al principio no es visible
    /* APUNTE SOBRE COORDENADAS DE LA IMAGEN Y DEL TEXTO
        -Imagen: coordenadas del mundo
        -Texto: coordenadas de la ventana de juego
    */

    this.sprite = game.add.sprite(x, y, image);
    popUpGroup.add(this.sprite);
    this.sprite.visible = false;
    this.textString = t;
    this.text;

    var textStyle = { font: '16px Averia Sans Libre', fill:"rgb(255,255,255)", align: "center"}
    //that = this;

    this.show = function(){
        this.sprite.visible = true;

        var x = (this.sprite.x) + 20;
        var y = (this.sprite.y) + 20;
        game.world.bringToTop(popUpGroup);
        this.text = game.add.text(x, y, this.textString, textStyle);
        //this.text.fixedToCamera = true;
        //this.sprite.fixedToCamera = true;
 
    }

    this.hide = function(){
        this.sprite.visible = false;
        this.text.fixedToCamera = false;
        this.text.destroy();
    }

    this.changeCoord = function(x, y){
        that.sprite.fixedToCamera = false;
        that.sprite.x = x + game.camera.x;
        that.sprite.y = y + game.camera.y;
        that.sprite.fixedToCamera = true;
        if(text) {
            text.fixedToCamera = false;
            text.x = x + 5;
            text.y = y + 5;
            text.fixedToCamera = true;
        }
    }
}
