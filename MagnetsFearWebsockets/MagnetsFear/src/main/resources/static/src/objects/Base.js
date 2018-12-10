//Constructor objeto Base
function ServerBase() {
	this.id;
	this.x;
	this.y;
	this.hp;
}

//Constructor del objeto base en el juego
//recibe un PhaserObject como parámetro
function Bases(PhOb)
  {
    this.invincibleTime=3;
    this.hittable=false;
    this.PhaserObject=PhOb;
    this.rotSpeed=5;
    this.puntuation=10;
  };

//Genera nuevas posiciones para las bases y las actualiza en el servidor
function generatePosBases(num,i){
	player.ready = false;
	if(basesLoaded < num)
	{
		if(i === 0)
		{
			//Distancia entre bases
		    var dist = 2/3 * PI;
		    //Centro de la circunferencia
		    var pointX = game.rnd.integerInRange(290,350); 
		    var pointY = game.rnd.integerInRange(290,430);
		    //ángulo aleatorio en la circunferencia
		    var angle = game.rnd.frac() * 0.67 * PI;
		    //Radio de la circunferencia
		    var R = 250;
		    for(j = 0; j < num/2; j++)
		    {
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
			updateBase(function(){
				i++;
				basesLoaded++;
				generatePosBases(num,i);
			},posBases1[i]);
		} else {
			updateBase(function(){
				i++;
				basesLoaded++;
				generatePosBases(num,i);
			},posBases2[i-3]);
		}
		
	}else if (basesLoaded === num){ player.ready = true; }
}

//Baja las nuevas posiciones de las bases del servidor y las guarda en el cliente
function getPosBases(num,i){
	player.ready = false;
	if(basesLoaded < num && opponent.ready)
	{
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
			getPosBases(num,i);
		},i)
	} else if (basesLoaded === num){ player.ready = true; }
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