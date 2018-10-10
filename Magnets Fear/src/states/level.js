CatCatcher.levelState = function(game) {

}
var bg;
var cat;
var catcher;
var upKey;
var downKey;
var leftKey;
var rightKey;


CatCatcher.levelState.prototype = {

    preload: function() {
        
    },

    create: function() {
        bg = game.add.sprite(0, 0, 'bg');
        cat = game.add.sprite(0, 50, 'cat');
        catcher = game.add.sprite(50, 0, 'catcher');
        game.physics.enable(cat, Phaser.Physics.ARCADE);
        game.physics.enable(catcher, Phaser.Physics.ARCADE);
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    },

    update: function() {
    	if (this.upKey.isDown){
    		catcher.body.y = -50;
    	}
    	if (this.downKey.isDown){
    		catcher.body.y = +50;
    	}
    	if (this.leftKey.isDown){
    		catcher.body.x = -50;
    	}
    	if (this.rightKey.isDown){
    		catcher.body.x = +50;
    	}


    }
}