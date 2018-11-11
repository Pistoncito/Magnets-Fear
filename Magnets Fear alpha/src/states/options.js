MagnetsFear.optionsState = function(game) {

}


MagnetsFear.optionsState.prototype = {

    preload: function() {
    },
    
    create: function() {
        //Array con las opciones de "Opciones"
        options=["Audio", "Controles", "Volver"];
        //Texto de "Opciones"
        var optionsText = game.add.text(0,0,"Opciones",titleStyle);
        optionsText.setTextBounds(0,0,game.world.width,game.world.height);

        //Texto de las opciones de "Opciones"
        var y=game.canvas.height/3;
        var yOffset= 60 +20;
        var optionsMenuText=[];
        for(var i= 0; i<options.length; i++)
            {
                optionsMenuText[i] = game.add.text(0, y, options[i], style);
                optionsMenuText[i].setTextBounds(0,0,game.world.width,game.world.height);
                //Añade detección de eventos en cada texto
                optionsMenuText[i].inputEnabled = true;
                optionsMenuText[i].events.onInputOver.add(over,this);
                optionsMenuText[i].events.onInputOut.add(out,this);
                //Indica a qué función llamar dependiendo de qué texto se trate
                switch(i){
                    case 0:
                        optionsMenuText[i].events.onInputDown.add(this.audio,this);
                        break;
                    case 1:
                        //optionsMenuText[i].events.onInputDown.add(this.controls,this);
                        break;
                    case 2:
                        optionsMenuText[i].events.onInputDown.add(returnMenu,this);
                        break;
                }

                y+= yOffset;
            }
    },
    //Pasa al menú de sonido
    audio: function() {
        game.state.start('audioState');
        if(soundOn==1)optionSelect.play();
    },
    /*
    controls: function(){
    
    }
    */
    
}
