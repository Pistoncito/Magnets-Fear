MagnetsFear.levelState = function(game) {

    var n_sprites_sphere=2;
    this.sphere1;
    var sphere2;

    var n_civs1=3;
    var n_civs2=3;
    var civ1= new Array(n_civs1);
    var civ2= new Array(n_civs2);
 
    var n_projectile= 4;
    var projectile= new Array(n_projectile);

    var spheres_width= 90;
    var spheres_height= 90;
    var civs_width= 90;
    var civs_height= 90;

    
    //key controller
    this.possible_keys=[Phaser.Keyboard.W, Phaser.Keyboard.A, Phaser.Keyboard.S, Phaser.Keyboard.D, Phaser.Keyboard.SPACE];
    this.keysPressed= new Array(this.possible_keys.length);

    this.n_keysOnUse=3;
    this.keysOnUse= new Array(this.n_keysOnUse);
    this.next_key=0;

}
var sphere1_positive;
 
MagnetsFear.levelState.prototype = {

    preload: function() {
        //prevents possible keys from propagating to the browser
        game.input.keyboard.addKeyCapture(this.possible_keys);
        for(i=0; i< this.keysPressed.length;i++)
            {
                this.keysPressed[i]= game.input.keyboard.addKey(this.possible_keys[i]);
            }

 

    //Create the classic game objects
    this.sphere1= new MagnetsFear.gameObject(0,0,this.n_sprites_sphere,1);
    this.sphere1.polaridad= new MagnetsFear.polaridad();
    this.sphere1.magnetismo= new MagnetsFear.magnetismo();
    this.sphere1.sprites[0]="assets/images/sprites/sphere1-positive.png";
    this.sphere1.sprites[1]= "assets/images/sprites/sphere1-negative.png";

        ////////////LOADS///////////
        //Background
        game.load.image("classic_bg", "assets/images/backgrounds/classic_bg.png");
        //Sprites
        game.load.image("sphere1-positive", this.sphere1.sprites[0]);
        game.load.image("sphere1-negative", this.sphere1.sprites[1]);
        ////////////LOADS///////////

        //////////PHYSICS////////////
        //////////PHYSICS////////////
    },

    create: function() {
     
   classic_bg= game.add.image(0,0,'classic_bg');
   /*metodo de spawn pseudo- aleatorio de las dos esferas
            ^
            |
   en base a este, metodo pseudo-aleatorio de bases
            ^
            |
   en base a este, metodo pseudo- aleatorio para generar los proyectiles
   */
  sphere1_positive= game.add.image(this.sphere1.x, this.sphere1.y, 'sphere1-positive');
  sphere1_positive.x= this.sphere1.x;
  sphere1_positive.y= this.sphere1.y;

 /*
   //civilizations
   for(var i=0; i< n_civs_pp; i++)
   {
       var x1, y1;
       var x2, y2;
       x1= game.rnd.integerInRange(civs_width, classic_bg.width- civs_width);
       y1= game.rnd.integerInRange(civs_height, classic_bg.height- civs_height);
       x2= game.rnd.integerInRange(civs_width, classic_bg.width- civs_width);
       y2= game.rnd.integerInRange(civs_height, classic_bg.height- civs_height);
      civs1 = game.add.image(x1,y1, 'civs1');
      civs2 = game.add.image(x2,y2, 'civs2');
   }
        
    //spheres
    sphere1 = game.add.image(spheres_width, classic_bg.height/2 - spheres_height, 'sphere1');
    sphere2 = game.add.image(classic_bg.width - spheres_width*2, classic_bg.height/2- spheres_height, 'sphere2');
 */
     
    },

    update: function() {
    for(i=0; i<this.keysPressed.length; i++)
    {
        if(this.keysPressed[i].isDown  && this.next_key< this.keysOnUse.length)
        {
            this.keysOnUse[this.next_key]=this.keysPressed[i];
            this.next_key++;
        } 
    }
    this.sphere1.control_manager.Control(this.keysOnUse, this.next_key);
    
    //clean
    this.keysOnUse= new Array(this.n_keysOnUse);
    this.next_key=0;



    ////////DRAW OBJECTS////////
  
    ////////DRAW OBJECTS////////
    }


}
