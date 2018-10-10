var MagnetsFear = {}

MagnetsFear.bootState = function(game) {
    

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