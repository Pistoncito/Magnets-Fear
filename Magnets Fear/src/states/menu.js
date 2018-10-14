MagnetsFear.menuState = function(game) {

}


MagnetsFear.menuState.prototype = {

    preload: function() {
        var style= {fill:"rgb(0,90,120)", font:"60px"};
        //jugar, opciones, salir
        var options=["Jugar", "Opciones", "Salir"];
   
        var x=game.canvas.width/2 -300;
        var y=game.canvas.height/2- 3*(60+20);
        var yOffset= 60 +20;
        for(var i= 0; i<options.length; i++)
            {
                game.add.text(x, y, options[i], style);
                y+= yOffset;
            }
    },
    
    create: function() {
  
    },

    update: function() {
        game.state.start('levelState');
    	
    }
}
