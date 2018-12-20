MagnetsFear.matchMakingState = function(game){
    
}
// Inicialización de jugadores
var player = new Player();
var opponent = new Player();

var serverBases1= [];
var serverBases2= [];

var	serverProyectiles = [];

var msgJoin;
var msgOnGameState;
var msgdefault;


MagnetsFear.matchMakingState.prototype = {

    preload: function() {
    	for(i=0; i<3; i++)
    		{
    		serverBases1[i]=  new ServerBase();
    		serverBases2[i]= new ServerBase();
    		}
    	
    	for(i=0; i<2; i++)
    		{
    		serverProyectiles[i]= new ServerProy();
    		}

    },

    create: function() {
    	ws.onJoin();
    	
        MatchText = "Esperando contrincante..."
        spr_text = game.add.text(0,0, MatchText, style);
        
    },
    update: function() {        
    	if(opponent.id === undefined)
    		{
    		console.log("opponent.id(debe ser undefined): " + opponent.id);
    		//solo funciona si el juego esta ya iniciado
    		//ws.onGetGS();
    		ws.onUpdateGameState();
    		}else
    			{
    			console.log("opponent.id(NO debe de seer undefined): " + opponent.id);
    			game.state.start('classicState');
    			}


    },
}




