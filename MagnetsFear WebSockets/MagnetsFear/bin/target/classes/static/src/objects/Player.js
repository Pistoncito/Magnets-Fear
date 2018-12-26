//Constructor del objeto player
function Player() {
  this.id = undefined;
  this.x= undefined;
  this.y= undefined;
  this.score = 0;
  this.polarity = -1;
  this.ready = false;
}

//Inicia los valores de los atributos de jugadores a partir de sus correspondientes esferas
//Actualiza su información en el servidor
/*
function initStatePlayers() {
	if (player.id === 1) {
		player.x = esfera1.PhaserObject.body.x;
		player.y = esfera1.PhaserObject.body.y;
		player.score = esfera1.score;
		player.polarity = esfera1.PhaserObject.body.polarity.positive;
		opponent.x = esfera2.PhaserObject.x;
		opponent.y = esfera2.PhaserObject.y;
		opponent.score = esfera2.score;
		opponent.polarity = esfera2.PhaserObject.body.polarity.positive;
	} else {
		player.x = esfera2.PhaserObject.body.x;
		player.y = esfera2.PhaserObject.body.y;
		player.score = esfera2.score;
		player.polarity = esfera2.PhaserObject.body.polarity.positive;
		opponent.x = esfera1.PhaserObject.body.x;
		opponent.y = esfera1.PhaserObject.body.y;
		opponent.score = esfera1.score;
		opponent.polarity = esfera1.PhaserObject.body.polarity.positive;
	}
	updatePlayer(player);
	updatePlayer(opponent);
}

//Actualiza la posición, la puntuación y la polaridad de ambos jugadores
//Se actualizan los cambios del jugador en el servidor
//Se reciben los cambios del oponente del servidor y se actualiza su esfera
function updateStatePlayers() {
	if (player.id === 1) {
		player.x = esfera1.PhaserObject.body.x;
		player.y = esfera1.PhaserObject.body.y;
		player.score = esfera1.score;
		player.polarity = esfera1.PhaserObject.body.polarity.positive;
		
	} else {
		player.x = esfera2.PhaserObject.body.x;
		player.y = esfera2.PhaserObject.body.y;
		player.score = esfera2.score;
		player.polarity = esfera2.PhaserObject.body.polarity.positive;
	}
	updatePlayer(player);
	getPlayer(function(otherPlayer) {
		opponent.x = otherPlayer.x;
		opponent.y = otherPlayer.y;
		opponent.score = otherPlayer.score;
		opponent.polarity = otherPlayer.polarity;
		opponent.ready = otherPlayer.ready;
		if (opponent.id === 1) {
			esfera1.PhaserObject.body.x = opponent.x;
			esfera1.PhaserObject.body.y = opponent.y;
			esfera1.score = opponent.score;
			esfera1.PhaserObject.body.polarity.positive = opponent.polarity;
			//Actualización de la posición del magnetismo
			esfera1.magnetism.PhaserObject.body.x = esfera1.PhaserObject.body.x;
			esfera1.magnetism.PhaserObject.body.y = esfera1.PhaserObject.body.y;
			//Actualización de la animación dependiendo de la polaridad
			if (esfera1.PhaserObject.body.polarity.positive < 0) {
				esfera1.PhaserObject.animations.play('negative');
				esfera1.magnetism.PhaserObject.animations.play('negative');
			} else {
				esfera1.PhaserObject.animations.play("positive");
				esfera1.magnetism.PhaserObject.animations.play('positive');
			}
		} else {
			esfera2.PhaserObject.body.x = opponent.x;
			esfera2.PhaserObject.body.y = opponent.y;
			esfera2.score = opponent.score;
			esfera2.PhaserObject.body.polarity.positive = opponent.polarity;
			//Actualización de la posición del magnetismo
			esfera2.magnetism.PhaserObject.body.x = esfera2.PhaserObject.body.x;
			esfera2.magnetism.PhaserObject.body.y = esfera2.PhaserObject.body.y;
			//Actualización de la animación dependiendo de la polaridad
			if (esfera2.PhaserObject.body.polarity.positive < 0) {
				esfera2.PhaserObject.animations.play('negative');
				esfera2.magnetism.PhaserObject.animations.play('negative');
			} else {
				esfera2.PhaserObject.animations.play("positive");
				esfera2.magnetism.PhaserObject.animations.play('positive');
			}
		}

	}, opponent.id)
};

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

*/