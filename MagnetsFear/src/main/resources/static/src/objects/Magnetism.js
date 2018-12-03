// Otorga atributos de magnetismo a un objeto
function Magnetism() {
	this.force = 20;
	this.radius = 200;
	this.maxSpeed;
	this.PhaserObject;
}

// Recibe una esfera a la que otrorgar magnetismo
// Crea un magnetismo con su animación y le asigna su grupo de colisiones
function initMagnetism(obj) {
	obj.magnetism.PhaserObject = magnetismos.create(
			obj.PhaserObject.body.x - 500 / 2,
			obj.PhaserObject.body.y - 500 / 2, 'magnetRange');
	obj.magnetism.PhaserObject.frame = 0;
	obj.magnetism.PhaserObject.animations.add('negative', [ 0, 1, 2, 3, 2, 1 ],
			10, true);
	obj.magnetism.PhaserObject.animations.add('positive', [ 4, 5, 6, 7, 6, 5 ],
			10, true);
	obj.magnetism.PhaserObject.animations.play('negative');
	obj.magnetism.PhaserObject.body.setCircle(0);
	var constraint = game.physics.p2.createDistanceConstraint(
			obj.PhaserObject.body.sprite,
			obj.magnetism.PhaserObject.body.sprite, 0);
	obj.magnetism.PhaserObject.body.fixedRotation = true;
	obj.magnetism.PhaserObject.body.damping = 0.9;
	obj.magnetism.PhaserObject.body.setCollisionGroup(magnetCollisionGroup);
	obj.magnetism.PhaserObject.body.collisionGroup = magnetCollisionGroup;
	obj.magnetism.PhaserObject.body.collides([ proyectilesCollisionGroup ]);
};