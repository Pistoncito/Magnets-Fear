MagnetsFear.menuState = function(game) {

}

//Variables
var titleStyle;
var style;
var options;
var gradient;
var musicMenu;
//Funciones
function out(text) {

    text.fill = "rgb(0,90,120)";

}

function over(text) {

    text.fill = "rgb(255,150,0)";
    mouseOver.play();


}

function play() {
    optionSelect.play();
    musicMenu.stop();
    game.state.start('classicState');
    
}

function goToOptions() {
    optionSelect.play();
    game.state.start('optionsState');
}

MagnetsFear.menuState.prototype = {

    preload: function() {
        gradient = text.context.createLinearGradient(0, 0, 0, 150);
        gradient.addColorStop(0, "rgb(255,150,0)");   
        gradient.addColorStop(1, "rgb(0,150,255)");
        titleStyle = {fill: gradient, font:"100px Orbitron", boundsAlignH: "center"};
        style = {fill:"rgb(0,90,120)", font:"60px Orbitron", boundsAlignH: "center"};
        

    },
    
    create: function() {

        mouseOver = game.add.audio('over');
        optionSelect = game.add.audio('select');
        musicMenu = game.add.audio('menuMusic',1,true);
        if(!musicMenu.isPlaying){musicMenu.play();}

        //jugar, opciones, salir
        menuOptions=["Jugar", "Opciones", "Salir"];
   
        var titleText = game.add.text(0,0,"MagnetsFear",titleStyle);
        titleText.setTextBounds(0,0,game.world.width,game.world.height);

        
        var y=game.canvas.height/3;
        var yOffset= 60 +20;
        var menuText=[];
        for(var i= 0; i<menuOptions.length; i++)
            {
                menuText[i] = game.add.text(0, y, menuOptions[i], style);
                menuText[i].setTextBounds(0,0,game.world.width,game.world.height);
                menuText[i].inputEnabled = true;
                menuText[i].events.onInputOver.add(over,this);
                menuText[i].events.onInputOut.add(out,this);

                switch(i){
                    case 0:
                        menuText[i].events.onInputDown.add(play,this);
                        break;
                    case 1:
                        menuText[i].events.onInputDown.add(goToOptions,this);
                        break;
                    case 2:
                        //menuText[i].events.onInputDown.add(exit,this);
                        break;
                }

                y+= yOffset;
            }
    },

    update: function() {
        //game.state.start('classicState');
    	
    }
}
