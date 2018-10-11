var MagnetsFear = {}

MagnetsFear.bootState = function(game) {
    

}

//Programacion orientada a datos
//no instance
MagnetsFear.spriteStruct= function(string)
{
    this.address= string;
    this.data;
}

MagnetsFear.control_manager= function(x,y){

    this.x=x;
    this.y=y;
    this.vel;
    this.accel;
   //Controller tools
   this.Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
   this.Akey= game.input.keyboard.addKey(Phaser.Keyboard.A);
   this.Skey= game.input.keyboard.addKey(Phaser.Keyboard.S);
   this.Dkey= game.input.keyboard.addKey(Phaser.Keyboard.D);

   this.Wbool=false;
   this.Abool=false;
   this.Sbool=false;
   this.Dbool=false;
   this.Control= function(key, size)
   {
    var keys_left= size;   
    for(i=0; i< size; i++)
    {
        switch(key[i])
        {
         case (this.Wkey):
                  this.y -= 100;
                  //alert(this.y);
         break;
 
         case (this.Akey):
              this.x -= 100
            // alert(this.x);
         break;
 
         case (this.Skey):
             this.y += 100
              //alert(this.y);
         break;
 
         case (this.Dkey):
             this.x += 100
             //alert(this.x);
         break;
        }


    }
      

   }

}
MagnetsFear.gameObject= function(x,y,sprite_size, control){
    
    this.n_sprites= sprite_size
    this.sprites= new Array(this.n_sprites);
    this.control_manager=null;
    if(control)
    this.control_manager= new MagnetsFear.control_manager(x,y);
   
 }

 MagnetsFear.polaridad= function(polaroid){
     //boolean
    this.positive= polaroid;
 }

MagnetsFear.magnetismo= function(){
    this.attractStrength;
    this.repulsionStrength;
    this.actionRange;
}

MagnetsFear.bootState.prototype = {

    preload: function() {
        
        
    },

    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    update: function() {
    game.state.start('preloadState');
    }
}


