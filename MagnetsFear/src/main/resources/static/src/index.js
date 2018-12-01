game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameDiv')
  
game.state.add('bootState', CimmerianDepths.bootState)
game.state.add('preloadState', CimmerianDepths.preloadState)
game.state.add('initialScreenState', CimmerianDepths.initialScreenState)
game.state.add('playerSelectState', CimmerianDepths.playerSelectState)
game.state.add('equipmentState', CimmerianDepths.equipmentState)
game.state.add('dungeonState', CimmerianDepths.dungeonState)
game.state.add('endingState', CimmerianDepths.endingState)
  
game.state.start('bootState')
