MagnetsFear.menuState = function(game) {

}

//Variables globales
var titleStyle;
var style;
var gradient;
var musicMenu;
var mouseOver;
var optionSelect;



MagnetsFear.menuState.prototype = {


    preload: function() {
    },
    
    create: function() {
        //Se crea un gradiente de color y los estilos de texto
        gradient = text.context.createLinearGradient(0, 0, 0, 150);
        gradient.addColorStop(0, "rgb(255,150,0)");   
        gradient.addColorStop(1, "rgb(0,150,255)");
        titleStyle = {fill: gradient, font:"100px Orbitron", boundsAlignH: "center"};
        style = {fill:"rgb(0,90,120)", font:"60px Orbitron", boundsAlignH: "center"};
        //Sonidos del Menú
        this.initSound();
        //Música del menú
        this.initMusic();
        //Array con el texto de las opciones del menú
        menuOptions=["Jugar", "Opciones", "Salir"];
        // Crea el texto del Título
        var titleText = game.add.text(0,0,"MagnetsFear",titleStyle);
        titleText.setTextBounds(0,0,game.world.width,game.world.height);

        //Crea el texto de las opciones del menú
        var y=game.canvas.height/3;
        var yOffset= 60 +20;
        var menuText=[];
        for(var i= 0; i<menuOptions.length; i++)
            {
                menuText[i] = game.add.text(0, y, menuOptions[i], style);
                menuText[i].setTextBounds(0,0,game.world.width,game.world.height);
                //Añade detección de eventos en cada texto
                menuText[i].inputEnabled = true;
                menuText[i].events.onInputOver.add(over,this);
                menuText[i].events.onInputOut.add(out,this);
                //Indica a qué función llamar dependiendo de qué texto se trate
                switch(i){
                    case 0:
                        menuText[i].events.onInputDown.add(this.startPlay,this);
                        break;
                    case 1:
                        menuText[i].events.onInputDown.add(this.goToOptions,this);
                        break;
                    case 2:
                        //menuText[i].events.onInputDown.add(this.exit,this);
                        break;
                }

                y+= yOffset;
            }
    },
    //Comienza la partida deteniendo la música del menú
    startPlay: function() {
        if(soundOn==1){optionSelect.play()};
        musicMenu.stop();
        game.state.start('classicState');
        
    },
    //Pasa al menú opciones
    goToOptions:function() {
        if(soundOn==1){optionSelect.play()};
        game.state.start('optionsState');
    },
    //Añade los sonidos del menú
    initSound: function() {
        mouseOver = game.add.audio('over');
        optionSelect = game.add.audio('select');
    },
    //Añade la música del menú si no ha sido creada antes
    //Reproduce la música si la música está activada y no estaba sonando antes
    initMusic: function() {
        if(musicMenu ==null)
        musicMenu = game.add.audio('menuMusic',1,true);
        if((!musicMenu.isPlaying)&&(musicOn==1)){musicMenu.play();}        
    }
}
