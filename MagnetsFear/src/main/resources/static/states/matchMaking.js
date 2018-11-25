MagnetsFear.matchMakingState = function(game){
    
}
//Inicialización de jugadores
var player = new Player();
var opponent = new Player();
var arrayProyectiles = new Array();

// Recibe el número de proyectiles a crear
// Crea los proyectiles en posiciones aleatorias
function spawnRandProyectiles(num)
{
	for(i=0;i<num;i++){
		createProyectile();
	}  		
}
function saveProyectiles(num,i){
	if(i < num){
		getProyectile(function(pr){
			aux = new ProyectileAux();
			aux.x = pr.x
			aux.y = pr.y
			arrayProyectiles[i] = aux;
			console.log("El valor de x es " + arrayProyectiles[i].x);
			i++;
			saveProyectiles(num,i);
		},i)
	}
}

MagnetsFear.matchMakingState.prototype = {

    preload: function() {
    },

    create: function() {
        MatchText = "Esperando contrincante..."
        spr_text = game.add.text(0,0, MatchText, style);
        //Se asigna el identificador(Id) del jugador
        if (player != undefined) {
            createPlayer( function(Id){
            	player.id = Id;
            }, player);
        }
        spawnRandProyectiles(2);
        saveProyectiles(2,0);

		
    },

    update: function() {
        //game.state.start('classicState');
        
        numberPlayers(function(numero_usuarios){
        	if(numero_usuarios === 2){ game.state.start('classicState'); }
        });
        
    },

    
}

