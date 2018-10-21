//Funciones
//////////////////////
function Magnetism(){
this.attractForce=1;
this.repulseForce=1;
this.radius=500;
this.maxSpeed;
this.PhaserObject;
}
/*
function Polarity(){
  this.positive=1;

}
*/
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
  //this.polarity= new Polarity();
  this.accel=50;
  //this.deaccel= 2* this.accel;
  //this.diff_accel=39;
  this.maxSpeed=400;
  /*
  this.limitSpeed= function()
  {
  var body_vel=this.PhaserObject.body.velocity;
  if(body_vel.x> this.maxSpeed) body_vel.x = this.maxSpeed;
  else if(body_vel.x < -this.maxSpeed)body_vel.x = -this.maxSpeed;

  if(body_vel.y> this.maxSpeed) body_vel.y = this.maxSpeed;
  else if(body_vel.y < -this.maxSpeed)body_vel.y = -this.maxSpeed;
  }*/

  this.Movement= function(arr)
    {
    
      var body_obj= this.PhaserObject.body;
   
      var tooMuchSpeed= this.maxSpeed-(this.maxSpeed-10);
      if(arr[0]==1){
        //w
        /*
        if(body_obj.velocity.y>= tooMuchSpeed){
          body_obj.velocity.y -= this.deaccel;
          this.magnetism.PhaserObject.body.velocity.y -= this.deaccel;
        } 
        else {
        body_obj.velocity.y -= this.accel;
        this.magnetism.PhaserObject.body.velocity.y -= this.accel;
          }*/
        body_obj.velocity.y -= this.accel;
        this.magnetism.PhaserObject.body.velocity.y -= this.accel;
      }  
      if(arr[1]==1){
        //a
        /*
        if(body_obj.velocity.x >= tooMuchSpeed){
          body_obj.velocity.x -= this.deaccel;
          this.magnetism.PhaserObject.body.velocity.x -= this.deaccel;
        } 
        else{
          body_obj.velocity.x -= this.accel;
          this.magnetism.PhaserObject.body.velocity.x -= this.accel;
        }*/
        body_obj.velocity.x -= this.accel;
        this.magnetism.PhaserObject.body.velocity.x -= this.accel;
      }  
      if(arr[2]==1){
         //s
         /*
         if(body_obj.velocity.y <= -tooMuchSpeed){
          body_obj.velocity.y += this.deaccel;
          this.magnetism.PhaserObject.body.velocity.y += this.deaccel;
         } 
         else{
          body_obj.velocity.y += this.accel;
          this.magnetism.PhaserObject.body.velocity.y += this.accel;
          }*/
          body_obj.velocity.y += this.accel;
          this.magnetism.PhaserObject.body.velocity.y += this.accel;
      }  
      if(arr[3]==1){
        //d
        /*
        if(body_obj.velocity.x <= -tooMuchSpeed){
          body_obj.velocity.x += this.deaccel;
          this.magnetism.PhaserObject.body.velocity.x += this.deaccel;
        } 
        else{
        body_obj.velocity.x += this.accel;
        this.magnetism.PhaserObject.body.velocity.x += this.accel;
        }*/
        body_obj.velocity.x += this.accel;
        this.magnetism.PhaserObject.body.velocity.y += this.accel;
      } 
    limitSpeed(this);  
    limitSpeed(this.magnetism); 
    this.magnetism.PhaserObject.body.x= body_obj.x;
    this.magnetism.PhaserObject.body.y= body_obj.y;
    

  }
  
}


function Proyectile(PhOb)
{
  this.PhaserObject= PhOb;
  //this.polarity= new Polarity();
  this.maxSpeed= 700;
  /*
  this.limitSpeed= function()
  {
    
    var body_vel=this.PhaserObject.body.velocity;
    if(body_vel.x> this.maxSpeed) body_vel.x = this.maxSpeed;
    else if(body_vel.x < -this.maxSpeed)body_vel.x = -this.maxSpeed;
  
    if(body_vel.y> this.maxSpeed) body_vel.y = this.maxSpeed;
    else if(body_vel.y < -this.maxSpeed)body_vel.y = -this.maxSpeed;
  }*/
}

//////////////////////