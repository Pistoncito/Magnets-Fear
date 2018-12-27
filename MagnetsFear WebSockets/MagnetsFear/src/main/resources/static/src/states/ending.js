MagnetsFear.endingState = function(game) {
 this.textStyleEndGame;
 this.textStyleScores;
 this.backToMenuStyle;
 this.endGameText;
 this.player_score;
 this.opponent_score;
}

var numPlayers;
var numBases;
var numProyectiles;

MagnetsFear.endingState.prototype = {


    preload: function() {
    	ws.onClearGame();
    },

    create: function() {
        this.textStyleEndGame= {fill: gradient, font:"100px Orbitron", boundsAlignH: "center"};
        this.textStyleScores={fill: gradient, font:"60px Orbitron", boundsAlignH: "center"};
        this.backToMenuStyle={fill:"rgb(0,90,120)", font:"60px Orbitron", boundsAlignH: "center"};
        this.player_score= esfera1.score;
        this.opponent_score= esfera2.score;
    
        //Se comunica quién ha ganado dependiendo de su cantidad de puntos
        if(this.player_score > this.opponent_score)
        {
            this.endGameText= "YOU WIN";
        }else if(this.player_score < this.opponent_score)
        {
            this.endGameText= "YOU LOSE";
        }else   
        {
            this.endGameText= "DRAW";
        }

        var text_player= game.add.text(0,0,"YOU: " + this.player_score, this.textStyleScores);
        var text_opponent= game.add.text(0,0,"OPPONENT: " + this.opponent_score, this.textStyleScores);
        var endText= game.add.text(0,0, this.endGameText, this.textStyleEndGame);
        var backToMenuButton= game.add.text(0,game.height-100,"Back to Menu", this.backToMenuStyle);

        endText.setTextBounds(0,0,game.world.width, game.world.height);
        text_player.setTextBounds(0, game.world.height/2, game.world.width/2, game.world.height/2);
        text_opponent.setTextBounds(game.world.width/2, game.world.height/2, game.world.width/2, game.world.height/2);
        backToMenuButton.setTextBounds(0,0, game.world.width, game.world.height);

        backToMenuButton.inputEnabled= true;
        backToMenuButton.events.onInputOver.add(over,this);
        backToMenuButton.events.onInputOut.add(out,this);
        backToMenuButton.events.onInputDown.add(this.restartGame,this);
        
    },

    update: function() {

    },
    
	restartGame: function() {
		   player= undefined;
		   opponent= undefined;
		   //returnMenu;
		   game.state.start('menuState');
		   if(soundOn==1)optionSelect.play();
		    }
    
  
}
