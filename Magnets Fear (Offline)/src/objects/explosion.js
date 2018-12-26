
//var exp;

function createExplosion(x,y) {
    this.game.camera.shake(0.01, 100);
	var exp = this.game.add.sprite(x,y,'explosion');
    exp.anchor.setTo(0.5, 0.5);
    exp.frame = 0;
	exp.animations.add('explode',[0,1,3,4,5]);
	exp.animations.play('explode',15,false,true);
}

/*
// Partícula de la explosión
function explosionParticle(game, x, y, frame) {
    Phaser.Particle.call(this, game, x, y, frame);
}
explosionParticle.prototype = Object.create(Phaser.Particle.prototype);
explosionParticle.prototype.constructor = explosionParticle;  
explosionParticle.prototype.onEmit = function() {
	game.animations.add('explode',[0,1,2,3,4,5]);
	game.animations.play('explode',10,false,true);
}

//  Emisor de explosiones
function explosionEmitter(x, y) {  
    emitter = game.add.emitter(x, y, 6);
    emitter.particleClass = explosionParticle;
    emitter.makeParticles('explode');
    emitter.width = 20;
    emitter.height = 20;
    emitter.minParticleScale = 0.25;
    emitter.maxParticleScale = 1;
    emitter.minParticleSpeed.set(0, 0);
    emitter.maxParticleSpeed.set(0, 0);
    emitter.gravity = 0;
    emitter.start(false, 1000, 50, 6);        
}*/