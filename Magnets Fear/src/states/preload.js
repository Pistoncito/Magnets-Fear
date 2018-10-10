CatCatcher.preloadState = function(game) {

}

var LoadingText;
var LoadingStyle;

CatCatcher.preloadState.prototype = {

    preload: function() {
    	LoadingText = "Loading...";
    	LoadingStyle = { font: "60px Arial", fill: "#ff0044"};
    	

    	game.load.image('bg','assets/images/bg.png');
        game.load.image('cat','assets/images/cat.png');
        game.load.image('catcher','assets/images/catcher.png');
        
    },

    create: function() {
    	game.add.text(game.world.centerX-200, game.world.centerY, LoadingText, LoadingStyle);
        
    },

    update: function() {
    	game.state.start('menuState');
    }
}