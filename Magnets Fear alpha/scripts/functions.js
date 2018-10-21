//Funciones
//////////////////////
function Magnetism(){
this.attractForce=1;
this.repulseForce=1;
this.radius=500;
this.maxSpeed;
this.PhaserObject;
}

function Polarity(){
  this.positive=1;

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
  this.PhaserObject= PhOb;
  this.magnetism= new Magnetism();
  this.magnetism.maxSpeed = this.maxSpeed;
  this.accel=50;
  this.maxSpeed=400;
  this.radius = 32
  this.Movement= function(arr)
    {
    
      var body_obj= this.PhaserObject.body;
   
      var tooMuchSpeed= this.maxSpeed-(this.maxSpeed-10);
      if(arr[0]==1){
        //w

        body_obj.velocity.y -= this.accel;
      }  
      if(arr[1]==1){
        //a

        body_obj.velocity.x -= this.accel;
      }  
      if(arr[2]==1){
         //s

        body_obj.velocity.y += this.accel;
      }  
      if(arr[3]==1){
        //d

        body_obj.velocity.x += this.accel;
      } 
    limitSpeed(this);  


  }
  
}


function Proyectile(PhOb)
{
  this.PhaserObject= PhOb;
  this.maxSpeed= 700;
  this.radius = 16;
}

//////////////////////