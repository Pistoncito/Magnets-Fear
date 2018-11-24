MagnetsFear.matchMakingState = function(game){
    
}
//Inicialización de jugadores
var player = new Player();
var opponent = new Player();


MagnetsFear.matchMakingState.prototype = {

    preload: function() {
    },

    create: function() {
        MatchText = "Esperando contrincante..."
        spr_text = game.add.text(0,0, MatchText, style);
        //Se asigna el identificador(Id) del jugador
        if (player != undefined) {
            createPlayer( function(Id){
            	player.playerId = Id;
            }, player);
        }
        //Se deduce el id del contrincante a partir del jugador uno
        if (player.playerId===1){opponent.playerId===2;}
        else {opponent.playerId===1;} 
    },

    update: function() {
        game.state.start('classicState');
        /*
        numberPlayers(function(numero_usuarios){
        	if(numero_usuarios === 2){ game.state.start('classicState'); }
        });*/
        
    }
}

