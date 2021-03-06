
function Player() {
  this.id = 0;
  this.x;
  this.y;
  this.score = 0;
  this.polarity = -1;
  this.ready = false;
}

function clientProyectile() {
	this.id;
	this.x;
	this.y;
	this.vx;
	this.vy;
	this.polarity = -1;
}

function Base() {
	this.id;
	this.x;
	this.y;
}

//Constructor del objeto esfera
function Sphere()
  {
    this.playerId = 0;
    this.score=0;
    this.PhaserObject;
    this.magnetism= new Magnetism();
    this.magnetism.maxSpeed = this.maxSpeed;
    this.accel=50;
    this.maxSpeed=400;
    this.nextUse = 0;
    this.cooldown = 500;
/*
Recibe como parámetros el body del proyectil y su radio.
Detecta colisiones entre el proyectil y el magnetismo y modifica la velocidad del proyectil dependiendo de su polaridad y su
distancia al centro del magnetismo.
*/ 
    this.magnetCollision= function(proyBody,rad_p)
    {
      var esf_body= this.PhaserObject.body;

      var distance= getDistance(proyBody.x, proyBody.y,esf_body.x, esf_body.y);

      var rad_sum= this.magnetism.radius + rad_p;
     if(distance <=rad_sum)
        {

          var accelMagnitude= this.magnetism.force/distance*distance*distance*0.02;
          var vector= [esf_body.x- proyBody.x, esf_body.y- proyBody.y];
          var mod_vector= Math.sqrt(vector[0]* vector[0] + vector[1]* vector[1]);
          var dir_vector= [vector[0]/mod_vector,vector[1]/mod_vector];

          proyBody.velocity.x += dir_vector[0]*accelMagnitude *(-1*(esf_body.polarity.positive * proyBody.polarity.positive));
          proyBody.velocity.y += dir_vector[1]*accelMagnitude *(-1*(esf_body.polarity.positive * proyBody.polarity.positive));        
        }
        else{
        }
    }
/*
Recibe como parámetros un array con la teclas teclas pulsadas
Realiza acciones dependiendo de las teclas que estén pulsadas
*/
    this.Movement= function(arr)
      {
      
        var body_obj= this.PhaserObject.body;
     
        var tooMuchSpeed= this.maxSpeed-(this.maxSpeed-10);
        //Arriba
        if(arr[0]==1){

          body_obj.velocity.y -= this.accel;
          this.magnetism.PhaserObject.body.velocity.y -= this.accel;
        }
        //Izquierda 
        if(arr[1]==1){

          body_obj.velocity.x -= this.accel;
          this.magnetism.PhaserObject.body.velocity.x -= this.accel;
        }
        //Abajo  
        if(arr[2]==1){

            body_obj.velocity.y += this.accel;
            this.magnetism.PhaserObject.body.velocity.y += this.accel;
        }
        //Derecha  
        if(arr[3]==1){

          body_obj.velocity.x += this.accel;
          this.magnetism.PhaserObject.body.velocity.y += this.accel;
        }
        //Cambiar polaridad 
        if(arr[4]==1) 
        {
          if(game.time.time > this.nextUse)
          { 
            this.PhaserObject.body.polarity.Switch();
            if(this.PhaserObject.body.polarity.positive < 0)
            {
              this.PhaserObject.animations.play('negative');
              this.magnetism.PhaserObject.animations.play('negative');
            }
            else 
            {
              this.PhaserObject.animations.play("positive");
              this.magnetism.PhaserObject.animations.play('positive');
            }
            this.nextUse = game.time.time + this.cooldown;
          }
        }
      limitSpeed(this);    
    }
    
  };
  
  //Constructor del objeto proyectil
function Proyectile(PhOb)
  {
    this.PhaserObject= PhOb;
    this.maxSpeed= 500;
  };

  //Constructor del objeto base
function Bases(PhOb)
  {
    this.invincibleTime=3;
    this.hittable=false;
    this.PhaserObject=PhOb;
    this.rotSpeed=5;
    this.puntuation=10;
  };