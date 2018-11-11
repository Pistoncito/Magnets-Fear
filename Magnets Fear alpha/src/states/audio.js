MagnetsFear.audioState = function(game) {

}

MagnetsFear.audioState.prototype = {

    preload: function() {        
    },
    
    create: function() {
        //Array con los textos de las opciones de audio
        var audioOptions=["Música", "Sonidos", "Volver"];
        //Texto Audio
        var audioText = game.add.text(0,0,"Audio",titleStyle);
        audioText.setTextBounds(0,0,game.world.width,game.world.height);

        //Texto de las opciones de Audio
        var y=game.canvas.height/3;
        var yOffset= 60 +20;
        var audioMenuText=[];
        for(var i= 0; i<audioOptions.length; i++)
            {
                audioMenuText[i] = game.add.text(0, y, audioOptions[i], style);
                audioMenuText[i].setTextBounds(0,0,game.world.width,game.world.height);
                //Eventos de las opciones de audio
                audioMenuText[i].inputEnabled = true;
                audioMenuText[i].events.onInputOver.add(over,this);
                audioMenuText[i].events.onInputOut.add(out,this);
                //Indica a qué función llamar dependiendo de qué texto se trate
                switch(i){
                    case 0:
                        audioMenuText[i].events.onInputDown.add(this.music,this);
                        break;
                    case 1:
                        audioMenuText[i].events.onInputDown.add(this.sounds,this);
                        break;
                    case 2:
                        audioMenuText[i].events.onInputDown.add(this.returnOptions,this);
                        break;
                }

                y+= yOffset;
            }
    },

    returnOptions: function () {
        game.state.start('optionsState');
        if(soundOn==1)optionSelect.play();
    },

    
    music: function () {
        musicOn *= -1;
        if(soundOn==1)optionSelect.play();
        if((!musicMenu.isPlaying)&&(musicOn==1)){musicMenu.play();}
        if((musicMenu.isPlaying)&&(musicOn==-1)){musicMenu.stop();}
    },

    sounds:function() {
        soundOn *= -1;
        if(soundOn==1)optionSelect.play();
    }
    
    
}
