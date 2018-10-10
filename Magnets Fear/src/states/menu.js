CatCatcher.menuState = function(game) {

}
var menuText
var menuStyle
var spaceKey;
CatCatcher.menuState.prototype = {

    preload: function() {
    	menuText = "Press SPACE BAR to continue";
    	menuStyle = { font: "50px Arial", fill: "rgb(255,255,255)", align: "center"};
    	    
    },
    
    create: function() {
    	game.add.text(0, game.world.centerY, menuText, menuStyle);   
    	//Register the keys
    	this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	//  Stop the following keys from propagating up to the browser
    	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR]);
    },

    update: function() {
    	if(this.spaceKey.isDown)
    	{
    		game.state.start('levelState');
    	}
    	
    }
}