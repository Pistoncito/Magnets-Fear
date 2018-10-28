MagnetsFear.soundState = function(game) {

}


//Funciones

function music() {
    //game.state.start('classicState');
}

function returnOptions() {
    game.state.start('optionsState');
    optionSelect.play();
}

MagnetsFear.soundState.prototype = {

    preload: function() {
        gradient = text.context.createLinearGradient(0, 0, 0, 150);
        gradient.addColorStop(0, "rgb(255,150,0)");   
        gradient.addColorStop(1, "rgb(0,150,255)");
        titleStyle = {fill: gradient, font:"100px Orbitron", boundsAlignH: "center"};
        style = {fill:"rgb(0,90,120)", font:"60px Orbitron", boundsAlignH: "center"};
        

    },
    
    create: function() {
        //jugar, opciones, salir
        soundOptions=["Música", "Sonidos", "Volver"];
   
        var soundText = game.add.text(0,0,"Audio",titleStyle);
        soundText.setTextBounds(0,0,game.world.width,game.world.height);

        
        var y=game.canvas.height/3;
        var yOffset= 60 +20;
        var soundMenuText=[];
        for(var i= 0; i<soundOptions.length; i++)
            {
                soundMenuText[i] = game.add.text(0, y, soundOptions[i], style);
                soundMenuText[i].setTextBounds(0,0,game.world.width,game.world.height);
                soundMenuText[i].inputEnabled = true;
                soundMenuText[i].events.onInputOver.add(over,this);
                soundMenuText[i].events.onInputOut.add(out,this);

                switch(i){
                    case 0:
                        //soundMenuText[i].events.onInputDown.add(music,this);
                        break;
                    case 1:
                        //soundMenuText[i].events.onInputDown.add(sounds,this);
                        break;
                    case 2:
                        soundMenuText[i].events.onInputDown.add(returnOptions,this);
                        break;
                }

                y+= yOffset;
            }
    },

    update: function() {
        //game.state.start('classicState');
    	
    }
}
