MagnetsFear.preloadState = function(game) {

}

var LoadingText;
var LoadingStyle;

MagnetsFear.preloadState.prototype = {

    preload: function() {
        var loadingText="loading...";
        var loadingStyle= {font:"50px", fill:"rgb(0,80,120)"};
        game.add.text(0,0, loadingText, loadingStyle);
    },

    create: function() {
        
    },

    update: function() {
     game.state.start('menuState');
    }

}
