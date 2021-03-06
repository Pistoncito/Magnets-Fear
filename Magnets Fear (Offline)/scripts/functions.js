//Funciones
//////////////////////

//Distancia entre cordenadas
function getDistance(fromX, fromY, toX, toY){
  var a = Math.abs(fromX - toX);
  var b = Math.abs(fromY - toY);
  return Math.sqrt((a * a) + (b * b));
};

function Magnetism(){
  this.attractForce=20;
  this.repulseForce=30;
  this.radius=200;
  this.maxSpeed;
  this.PhaserObject;
  }
  
  function Polarity(){
    this.positive=-1;
    this.Switch= function(){this.positive *=-1;}
  }

  function limitSpeed(obj)
    {
    var body_vel=obj.PhaserObject.body.velocity;
    if(body_vel.x> obj.maxSpeed) body_vel.x = obj.maxSpeed;
    else if(body_vel.x < -obj.maxSpeed)body_vel.x = -obj.maxSpeed;
  
    if(body_vel.y> obj.maxSpeed) body_vel.y = obj.maxSpeed;
    else if(body_vel.y < -obj.maxSpeed)body_vel.y = -obj.maxSpeed;
    }
  
  function Sphere(PhOb)
  {
    this.score=0;
    this.PhaserObject= PhOb;
    this.magnetism= new Magnetism();
    this.magnetism.maxSpeed = this.maxSpeed;
    this.accel=50;
    this.maxSpeed=400;
    this.nextUse = 0;
    this.cooldown = 500;
  
    this.magnetCollision= function(proyBody,rad_p)
    {
      var esf_body= this.PhaserObject.body;

      var distance= getDistance(proyBody.x, proyBody.y,esf_body.x, esf_body.y);

      var rad_sum= this.magnetism.radius + rad_p;
     if(distance <=rad_sum)
        {
          //collision

          //Cálculo de Atracción o repulsión
          var accelMagnitude= this.magnetism.attractForce/distance*distance*distance*0.02;
          var vector= [esf_body.x- proyBody.x, esf_body.y- proyBody.y];
          var mod_vector= Math.sqrt(vector[0]* vector[0] + vector[1]* vector[1]);
          var dir_vector= [vector[0]/mod_vector,vector[1]/mod_vector];

          proyBody.velocity.x += dir_vector[0]*accelMagnitude *(-1*(esf_body.polarity.positive * proyBody.polarity.positive));
          proyBody.velocity.y += dir_vector[1]*accelMagnitude *(-1*(esf_body.polarity.positive * proyBody.polarity.positive));

        
        }
        else{
        }
    }
    this.Movement= function(arr)
      {
      
        var body_obj= this.PhaserObject.body;
     
        var tooMuchSpeed= this.maxSpeed-(this.maxSpeed-10);
        if(arr[0]==1){
          //w
      
          body_obj.velocity.y -= this.accel;
          this.magnetism.PhaserObject.body.velocity.y -= this.accel;
        }  
        if(arr[1]==1){
          //a
    
          body_obj.velocity.x -= this.accel;
          this.magnetism.PhaserObject.body.velocity.x -= this.accel;
        }  
        if(arr[2]==1){
           //s
     
            body_obj.velocity.y += this.accel;
            this.magnetism.PhaserObject.body.velocity.y += this.accel;
        }  
        if(arr[3]==1){
          //d
  
          body_obj.velocity.x += this.accel;
          this.magnetism.PhaserObject.body.velocity.y += this.accel;
        } 
        if(arr[4]==1) 
        {
          //space
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
    
  }
  
  
  function Proyectile(PhOb)
  {
    this.PhaserObject= PhOb;
    this.maxSpeed= 500;
  }

  function Bases(PhOb)
  {
    this.invincibleTime=3;
    this.hittable=false;
    this.PhaserObject=PhOb;
    this.rotSpeed=5;
    this.puntuation=10;
    this.life = 1;
  }
  
  //////////////////////