var CimmerianDepths = {}

CimmerianDepths.bootState = function(game) {

}

CimmerianDepths.bootState.prototype = {

    preload: function() {
        game.physics.startSystem("Phaser.Physics.ARCADE");
    },

    create: function() {
		game.state.start('preloadState');
    },

    update: function() {

    }
}