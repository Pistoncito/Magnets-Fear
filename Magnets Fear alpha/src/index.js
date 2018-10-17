game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv')
  
game.state.add('bootState', MagnetsFear.bootState)
game.state.add('preloadState', MagnetsFear.preloadState)
game.state.add('menuState', MagnetsFear.menuState)
game.state.add('classicState', MagnetsFear.classicState)
game.state.add('endingState', MagnetsFear.endingState)
  
game.state.start('bootState');


