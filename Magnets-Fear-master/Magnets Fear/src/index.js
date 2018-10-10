game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'gameDiv')
  
game.state.add('bootState', MagnetsFear.bootState)
game.state.add('preloadState', MagnetsFear.preloadState)
game.state.add('menuState', MagnetsFear.menuState)
game.state.add('levelState', MagnetsFear.levelState)
game.state.add('endingState', MagnetsFear.endingState)
  
game.state.start('bootState');

