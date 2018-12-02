MagnetsFear.endingState = function(game) {
 this.textStyleEndGame;
 this.textStyleScores;
 this.backToMenuStyle;
 this.endGameText;
 this.player1_score;
 this.player2_score;
}

var numPlayers;
var numBases;
var numProyectiles;

MagnetsFear.endingState.prototype = {

    preload: function() {
    },

    create: function() {
        this.textStyleEndGame= {fill: gradient, font:"100px Orbitron", boundsAlignH: "center"};
        this.textStyleScores={fill: gradient, font:"60px Orbitron", boundsAlignH: "center"};
        this.backToMenuStyle={fill:"rgb(0,90,120)", font:"60px Orbitron", boundsAlignH: "center"};
        this.player1_score= esfera1.score;
        this.player2_score= esfera2.score;
    
        //Se comunica quién ha ganado dependiendo de su cantidad de puntos
        if(this.player1_score > this.player2_score)
        {
            this.endGameText= "PLAYER 1 WINS";
        }else if(this.player1_score < this.player2_score)
        {
            this.endGameText= "PLAYER 2 WINS";
        }else   
        {
            this.endGameText= "DRAW";
        }

        var text_player1= game.add.text(0,0,"P1: " + this.player1_score, this.textStyleScores);
        var text_player2= game.add.text(0,0,"P2: " + this.player2_score, this.textStyleScores);
        var endText= game.add.text(0,0, this.endGameText, this.textStyleEndGame);
        var backToMenuButton= game.add.text(0,game.height-100,"Back to Menu", this.backToMenuStyle);

        endText.setTextBounds(0,0,game.world.width, game.world.height);
        text_player1.setTextBounds(0, game.world.height/2, game.world.width/2, game.world.height/2);
        text_player2.setTextBounds(game.world.width/2, game.world.height/2, game.world.width/2, game.world.height/2);
        backToMenuButton.setTextBounds(0,0, game.world.width, game.world.height);

        backToMenuButton.inputEnabled= true;
        backToMenuButton.events.onInputOver.add(over,this);
        backToMenuButton.events.onInputOut.add(out,this);
        backToMenuButton.events.onInputDown.add(returnMenu,this);
        
        //Borra los datos del servidor para poder comenzar una nueva partida
        deletePlayers();
        deleteProyectiles();
        deleteBases();
    },

    update: function() {

    }
     
}
//Borra todos los jugadores del servidor
function deletePlayers(){		
	numberPlayers(function(num){
		numPlayers = num;
		if(numPlayers > 0)
		{
			deletePlayer(numPlayers);
			deletePlayers();
		}
	});
}
//Borra todos los proyectiles del servidor
function deleteProyectiles(){	
		numberProyectiles(function(num){			
			numProyectiles = num;
			if(numProyectiles > 0){
				deleteProyectile(numProyectiles-1);
				deleteProyectiles();
			}
		});	
}

//Borra todas las bases del servidor
function deleteBases(){	
	getNumberBases(function(num){
		numBases = num;
		if(numBases > 0){
		deleteBase(numBases-1);
		deleteBases();
		}
	});	
}