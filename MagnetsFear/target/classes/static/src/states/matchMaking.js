MagnetsFear.matchMakingState = function(game){
    
}
// Inicialización de jugadores
var player = new Player();
var opponent = new Player();
//Array donde se guarda la posición de los proyectiles
var posProyectiles = [];
//Arrays donde se guarda la posición de las bases
var posBases1= [];
var posBases2= [];
//Variables que confirman si se han cargado los objetos
var playerCreated;
var proyectilesLoaded;
var basesLoaded;



MagnetsFear.matchMakingState.prototype = {

    preload: function() {
    	
    },

    create: function() {
    	//Inicialización de variables
    	playerCreated = false;
    	proyectilesLoaded = -1;
    	basesLoaded = -1;
    	//Texto de espera
        MatchText = "Esperando contrincante..."
        spr_text = game.add.text(0,0, MatchText, style);
        // Se asigna el identificador(Id) del jugador
        if (player != undefined) {
            createPlayer( function(Id){
            	player.id = Id;
            	playerCreated = true;
            }, player);
        }
    },
    update: function() {        
    	//Una vez se ha creado el jugador
    	if (playerCreated){
    		//Si player es jugador 1 crea los objetos 
    		if(player.id === 1){
    			if(proyectilesLoaded === -1) {
    				proyectilesLoaded++;
    				createProyectiles(2,0);
    			}
    			else if(basesLoaded === -1) {
    				basesLoaded++;
    				createBases(6,0);
    			}
    			else if(proyectilesLoaded === 2 && basesLoaded === 6){
    				//Una vez se han cargado el jugador indica que está listo para empezar la partida
    				player.ready = true;
    				updatePlayer(player);
    				//Comprueba si el oponente está listo
    				getPlayer(function(oPlayer){
    					opponent.ready = oPlayer.ready;
    				},2);
    			}
    		}
    		//Si player es el jugador 2 carga los objetos
    		else {
    			if(proyectilesLoaded === -1) {
    				proyectilesLoaded++;
    				saveProyectiles(2);
    			}
    			else if(basesLoaded === -1) {
    				basesLoaded++;
    				saveBases(6,0);
    			}
    			else if(proyectilesLoaded === 2 && basesLoaded === 6){
    				//Una vez se han cargado el jugador indica que está listo para empezar la partida
    				player.ready = true;
    				updatePlayer(player);
    				//Comprueba si el oponente está listo
    				getPlayer(function(oPlayer){
    					opponent.ready = oPlayer.ready;
    				},1);
    			}
    		}	
    	}
    	//Si el oponente está listo empieza la partida
    	if (opponent.ready) {
    		game.state.start('classicState');
    	}
    },
}

//Recibe como entrada el número de proyectiles que debe crear y 
//la iteración en la que se encuentra
//Crea proyectiles en el servidor y los almacena en el cliente
function createProyectiles(numPr,i){
	if(proyectilesLoaded < numPr){
		createProyectile(function(serverProyectile){
			aux = new clientProyectile();
			aux = serverProyectile;
			posProyectiles[i] = aux;
			proyectilesLoaded++;
			i++;
			createProyectiles(numPr,i);
		});
	}	
}

//Recibe el número de proyectiles que se deben cargar 
//y la iteración actual
//Carga los proyectiles del servidor y los guarda en el cliente
function saveProyectiles(numPr){
	if(proyectilesLoaded < numPr){
		getProyectile(function(serverProyectile){
			aux = new clientProyectile();
			aux = serverProyectile;
			posProyectiles[proyectilesLoaded] = aux;
			proyectilesLoaded++;
			saveProyectiles(numPr);
		},proyectilesLoaded);
	}
}

//Recibe como parámetro el numero de bases que debe crear 
//y la iteración actual
//Crea las bases en el servidor y almacena sus valores en el cliente
function createBases(num, i){
	if(basesLoaded < num){
		if(i === 0){
			//Distancia entre bases
		    var dist = 2/3 * PI;
		    //Centro de la circunferencia
		    var pointX = game.rnd.integerInRange(290,350); 
		    var pointY = game.rnd.integerInRange(290,430);
		    //ángulo aleatorio en la circunferencia
		    var angle = game.rnd.frac() * 0.67 * PI;
		    //Radio de la circunferencia
		    var R = 250;
		    for(j = 0; j < num/2; j++){
		    	base1 = new Base();
		    	posBases1[j] = base1;
		    	posBases1[j].x = Math.round(pointX + R * Math.cos(dist * (angle+j)));
				posBases1[j].y = Math.round(pointY + R * Math.sin(dist * (angle+j)));
				base2 = new Base();
				posBases2[j] = base2;
				posBases2[j].x = 1280 - Math.round(pointX + R * Math.cos(dist * (angle+j)));
				posBases2[j].y = Math.round(pointY + R * Math.sin(dist * (angle+j)));
		    }
		}
		if(i < num/2) {
			createBase(function(Id){
				posBases1[i].id = Id;
				i++;
				basesLoaded++;
				createBases(num,i);
			},posBases1[i]);
		} else {
			createBase(function(Id){
				posBases2[i-3].id = Id;
				i++;
				basesLoaded++;
				createBases(num,i);
			},posBases2[i-3]);
		}
		
	}	
}
//Recibe como parámetro el número de bases que debe cargar 
//y la iteración en la que se encuentra
//Carga las bases del servidor y las almacena en el cliente
function saveBases(num, i){
	if(basesLoaded < num){
		getBase(function(serverBase){
			aux = new Base();
			aux = serverBase;
			if(i<num/2){
				posBases1[i] = aux;
			} else {
				posBases2[i-3] = aux;
			}
			i++;
			basesLoaded++;
			saveBases(num,i);
		},i)
	}
}


/*
//Recibe como entrada el número de bases que debe crear
//Genera bases en posiciones aleatorias en una circunferencia
function randomBases(nBases){
	//Distancia entre bases
    var dist = 2/3 * PI;
    //Centro de la circunferencia
    var pointX = game.rnd.integerInRange(290,350); 
    var pointY = game.rnd.integerInRange(290,430);
    //ángulo aleatorio en la circunferencia
    var angle = game.rnd.frac() * 0.67 * PI;
    //Radio de la circunferencia
    var R = 250;
    //Dependiendo de si se trata del jugador 1 o 2 guardará las bases en un array u otro
    for(i=0; i< nBases; i++)
	{	
    	if(player.id === 1){
    		posBases1[i].x = Math.round(pointX + R * Math.cos(dist * (angle+i)));
    		posBases1[i].y = Math.round(pointY + R * Math.sin(dist * (angle+i)));
    	} else {
    		posBases2[i].x = 1280 - Math.round(pointX + R * Math.cos(dist * (angle+i)));
    		posBases2[i].y = Math.round(pointY + R * Math.sin(dist * (angle+i)));
    	}
	}	
}

//Borra todas las bases del escenario
function deleteAllBases(){
	var aux1= bases1.children.length-1;
    var aux2= bases2.children.length-1;
	while(bases1.children.length >0)
	  {
	    bases1.children[aux1].body.clearCollision(true,true);
	    bases1.remove(bases1.children[aux1]);
	    aux1--;
	  }
	while(bases2.children.length >0)
	  {
	    bases2.children[aux2].body.clearCollision(true,true);
	    bases2.remove(bases2.children[aux2]);
	    aux2--;
	  }
}

//Recibe el id de la base y el jugador al que pertenece
//Borra esa base del grupo
function deleteBase(Id, plyr){
	if (plyr.id === 1){
		bases2.children[Id].body.clearCollision(true,true);
		bases2.remove(bases2.children[Id]);
	} else {
		bases1.children[Id].body.clearCollision(true,true);
		bases1.remove(bases1.children[Id]);
	}
}

/*
recurrentGetBases: function(nIterLeft,startPos, basesArr)
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
}*/






