//Constructor objeto proyectil en cliente
//Este objeto se utiliza para comunicar los cambios de estado de
//los proyectiles al servidor
function clientProyectile() {
	this.id;
	this.x;
	this.y;
	this.vx;
	this.vy;
	this.polarity = -1;
}

//Constructor del objeto proyectil en el juego
//Recibe un PhaserObject como parámetro
function Proyectile(PhOb)
  {
    this.PhaserObject= PhOb;
    this.maxSpeed= 500;
  };

//Recibe el número de proyectiles que debe actualizar y la iteración en la que se encuentra
//Actualiza el estado actual de los proyectiles
function updatePosProyectiles(num,i)
{
	if (player.id === 1){
		if (i < num)
		{
			posProyectiles[i].x = proyectiles[i].PhaserObject.body.x;
			posProyectiles[i].y = proyectiles[i].PhaserObject.body.y;
			posProyectiles[i].vx = proyectiles[i].PhaserObject.body.velocity.x;
			posProyectiles[i].vy = proyectiles[i].PhaserObject.body.velocity.y;
			posProyectiles[i].polarity = proyectiles[i].PhaserObject.body.polarity.positive;
			updateProyectile(posProyectiles[i]);
			i++;
			updatePosProyectiles(num,i);
		}		
	}
	else {
		if (i < num)
		{
			getProyectile(function(serverProyectile){
				aux = new clientProyectile();
				aux = serverProyectile;
				posProyectiles[i] = aux;
				proyectiles[i].PhaserObject.body.x = posProyectiles[i].x;
				proyectiles[i].PhaserObject.body.y = posProyectiles[i].y;
				proyectiles[i].PhaserObject.body.velocity.x = posProyectiles[i].vx;
				proyectiles[i].PhaserObject.body.velocity.y = posProyectiles[i].vy;
				proyectiles[i].PhaserObject.body.polarity.positive = posProyectiles[i].polarity;
				i++;
				updatePosProyectiles(num,i);
			},i);
		}
	}
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
