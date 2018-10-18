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
        game.load.image('sphere1p', 'assets/images/sprites/sphere1-positive.png');
        game.load.image('sphere1n', 'assets/images/sprites/sphere1-negative.png');
        game.load.image('sphere2p', 'assets/images/sprites/sphere2-positive.png');
        game.load.image('sphere2n', 'assets/images/sprites/sphere2-negative.png');
        game.load.image('civilization1', 'assets/images/sprites/civilizations1.png');
        game.load.image('civilization2', 'assets/images/sprites/civilizations2.png');
        game.load.image('proyectile1', 'assets/images/sprites/proyectil_positivo.png');
        game.load.image('proyectile2', 'assets/images/sprites/proyectil_negativo.png');
        game.load.spritesheet('proyect1','assets/images/sprites/proyectil_positivo.png',60,60);
        game.load.spritesheet('proyect2','assets/images/sprites/proyectil_negativo.png',60,60);

        game.load.image('magnetRangeP', 'assets/images/sprites/magnetism-range-positive.png');
        game.load.image('magnetRangeN', 'assets/images/sprites/magnetism-range-negative.png');
    },

    create: function() {
        
    },

    update: function() {
     game.state.start('menuState');
    }

}
