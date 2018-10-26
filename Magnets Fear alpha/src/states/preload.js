MagnetsFear.preloadState = function(game) {

}

var LoadingText;
var LoadingStyle;

MagnetsFear.preloadState.prototype = {

    preload: function() {
        var loadingText="loading...";
        var loadingStyle= {font:"50px", fill:"rgb(0,80,120)"};
        game.add.text(0,0, loadingText, loadingStyle);

        game.load.image('background', 'assets/images/backgrounds/classic_bg.png');
        game.load.spritesheet('sphere1','assets/images/sprites/player1SpSheet.png',80,80,8);
        game.load.spritesheet('sphere2','assets/images/sprites/player2SpSheet.png',80,80,8);
        game.load.image('civilization1', 'assets/images/sprites/civilizations1.png');
        game.load.image('civilization2', 'assets/images/sprites/civilizations2.png');
        game.load.spritesheet('proyectileSpSheet','assets/images/sprites/proyectileSpSheet.png',60,60,12);
        game.load.image('magnetRangeP', 'assets/images/sprites/magnetism-range-positive.png');
        game.load.image('magnetRangeN', 'assets/images/sprites/magnetism-range-negative.png');
    },

    create: function() {
        
    },

    update: function() {
     game.state.start('menuState');
    }

}
