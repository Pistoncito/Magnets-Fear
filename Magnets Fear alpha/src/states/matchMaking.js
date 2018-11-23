MagnetsFear.matchMakingState = function(game){
    
}

esfera1 = new Sphere();
esfera2 = new Sphere();

MagnetsFear.matchMakingState.prototype = {

    preload: function() {
    },

    create: function() {
        MatchText = "Esperando contrincante..."
        spr_text = game.add.text(0,0, MatchText, style);
        
        if (esfera1 != undefined) {
            createPlayer( function(Id){
            	esfera1.playerId = Id;
            }, esfera1);
        } 
    },

    update: function() {
        game.state.start('classicState');
        /*
        numberPlayers(function(numero_usuarios){
        	if(numero_usuarios === 2){ game.state.start('classicState'); }
        });*/
        
    }
}

