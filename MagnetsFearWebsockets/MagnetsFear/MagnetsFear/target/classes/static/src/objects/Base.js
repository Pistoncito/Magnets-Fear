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
    this.hp;
  };

  function isThisPlayerBase(base)
  {
	for(i=0; i< serverBases.length;i++)
	{
		if(serverBases1[i].id === base.id) return true;
	}
	return false;
  }
  /*
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


*/