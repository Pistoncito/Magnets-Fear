MagnetsFear.matchMakingState = function(game){
    
}
//Inicialización de jugadores
var player = new Player();
var opponent = new Player();
var arrayProyectiles = new Array();

var bases1= [];
var bases2= [];
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
	    for(i=0; i< 3; i++)
	    {
	    bases1[i]= new Base();
	    bases2[i]= new Base();
	    }
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
	    
	    
	              //creo 6 bases
    createBases(function(nBases)
    {
        recurrentGetBases(3,0, bases1);
        recurrentGetBases(3,3, bases2);
    });




		
    },

    update: function() {
        //game.state.start('classicState');
        
        numberPlayers(function(numero_usuarios){
        	if(numero_usuarios === 2){ game.state.start('classicState'); }
        });
        
    },

    
}


recurrentGetBases= function(nIterLeft,startPos, basesArr)
{

	var currentIter= 4-nIterLeft;
	var svPos= startPos;
	 if(currentIter <= 3)
	    {

        getBase(function(base)
        {
        	var pos= currentIter-1;
            basesArr[pos].id = base.id;
            basesArr[pos].x = base.x;
            basesArr[pos].y = base.y;

      var text= basesArr[pos].id;
      game.add.text((svPos)*100, 100,text, style);

             nIterLeft--;
             startPos++;
            recurrentGetBases(nIterLeft,startPos,basesArr);
        }, svPos)
       
    }
