MagnetsFear.optionsState = function(game) {

}

//Pasa al menú principal
 function returnMenu () {
        game.state.start('menuState');
        optionSelect.play();
};

MagnetsFear.optionsState.prototype = {

    preload: function() {
        gradient = text.context.createLinearGradient(0, 0, 0, 150);
        gradient.addColorStop(0, "rgb(255,150,0)");   
        gradient.addColorStop(1, "rgb(0,150,255)");
        optionsStyle = {fill: gradient, font:"100px Orbitron", boundsAlignH: "center"};
        style = {fill:"rgb(0,90,120)", font:"60px Orbitron", boundsAlignH: "center"};
        

    },
    
    create: function() {

        options=["Audio", "Controles", "Volver"];
   
        var optionsText = game.add.text(0,0,"Opciones",titleStyle);
        optionsText.setTextBounds(0,0,game.world.width,game.world.height);

        
        var y=game.canvas.height/3;
        var yOffset= 60 +20;
        var optionsMenuText=[];
        for(var i= 0; i<options.length; i++)
            {
                optionsMenuText[i] = game.add.text(0, y, options[i], style);
                optionsMenuText[i].setTextBounds(0,0,game.world.width,game.world.height);
                optionsMenuText[i].inputEnabled = true;
                optionsMenuText[i].events.onInputOver.add(over,this);
                optionsMenuText[i].events.onInputOut.add(out,this);

                switch(i){
                    case 0:
                        optionsMenuText[i].events.onInputDown.add(this.sound,this);
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
    sound: function () {
        game.state.start('soundState');
        optionSelect.play();
    }
        
}
