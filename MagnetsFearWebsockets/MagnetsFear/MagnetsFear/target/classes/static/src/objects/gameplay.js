//Funciones utilizadas para el gameplay

//// OBJETOS PARA ESFERAS Y SU GRUPO
var esfera1
var esfera2
var esferas;
// //GRUPO DE MAGNETISMO
var magnetismos;
// // VARIABLE PARA NUMERO DE PROYECTILES INICIAL Y SU GRUPO
var n_proyectiles;
var proyectiles;
// // OBJETOS PARA BASE Y SU GRUPO
var n_bases;
var bases1;
var bases2;

// Control de tiempo
var needToSpawnBases;
var maxTimeToSpawnBases;
var wallClock;
var totalSeconds;
var gameSeconds;
var gameMinutes;
var timeSinceLastBasesSpawn;
// Texto por pantalla
var points1Text;
var points2Text;
var timerText;
var timerStyle;


// Funciones
//
function addGroups() {
	magnetismos = game.add.group();
	esferas = game.add.group();
	proyectiles = game.add.group();
	bases1 = game.add.group();
	bases2 = game.add.group();
};
// Asigna un cuerpo y físicas P2 a un grupo deobjetos
function initGroup(groupName) {
	groupName.enableBody = true;
	groupName.physicsBodyType = Phaser.Physics.P2JS;
};
// Crea la animación del fondo
function initBackground(sprite) {
	bg = game.add.sprite(0, 0, sprite);
	bg.frame = 0;
	bg.animations.add('bgAnimation', [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6,
			5, 4, 3, 2, 1 ], 15, true);
	bg.animations.play('bgAnimation');
};

// Crea esfera del jugador 1 con su animación y la asigna su grupo de colisiones
function initSphere1(pX, pY, sprite) {
	// esfera1 = new Sphere();
	esfera1.PhaserObject = esferas.create(pX, pY, sprite);
	esfera1.PhaserObject.frame = 0;
	esfera1.PhaserObject.animations.add('negative', [ 0, 1, 2, 3, 2, 1 ], 10,
			true);
	esfera1.PhaserObject.animations.add('positive', [ 4, 5, 6, 7, 6, 5 ], 10,
			true);
	esfera1.PhaserObject.animations.play('negative');
	esfera1.PhaserObject.body.setCircle(32);
	esfera1.PhaserObject.body.fixedRotation = true;
	esfera1.PhaserObject.body.mass = 8;
	esfera1.PhaserObject.body.damping = 0.9;
	esfera1.PhaserObject.body.setCollisionGroup(playerCollisionGroup);
	esfera1.PhaserObject.body.collisionGroup = playerCollisionGroup;
	esfera1.PhaserObject.body.collides([ proyectilesCollisionGroup,
			playerCollisionGroup, basesCollisionGroup ]);
	esfera1.PhaserObject.body.polarity = new Polarity();
};
// Igual que en la función anterior pero con jugador 2
function initSphere2(pX, pY, sprite) {
	// esfera2 = new Sphere();
	esfera2.PhaserObject = esferas.create(pX, pY, sprite);
	esfera2.PhaserObject.frame = 0;
	esfera2.PhaserObject.animations.add('negative', [ 0, 1, 2, 3, 2, 1 ], 10,
			true);
	esfera2.PhaserObject.animations.add('positive', [ 4, 5, 6, 7, 6, 5 ], 10,
			true);
	esfera2.PhaserObject.animations.play('negative');
	esfera2.PhaserObject.body.setCircle(32);
	esfera2.PhaserObject.body.fixedRotation = true;
	esfera2.PhaserObject.body.mass = 8;
	esfera2.PhaserObject.body.damping = 0.9;
	esfera2.PhaserObject.body.setCollisionGroup(playerCollisionGroup);
	esfera2.PhaserObject.body.collisionGroup = playerCollisionGroup;
	esfera2.PhaserObject.body.collides([ proyectilesCollisionGroup,
			playerCollisionGroup, basesCollisionGroup ]);
	esfera2.PhaserObject.body.polarity = new Polarity();
};


// Otorga polaridad a un objeto
function Polarity() {
	this.positive = -1;
	this.Switch = function() {
		this.positive *= -1;
	}
}

// Recibe como parámetro un objeto
// Iguala su velocidad a su velocidad máxima en caso de que la sobrepase
function limitSpeed(obj) {
	var body_vel = obj.PhaserObject.body.velocity;
	if (body_vel.x > obj.maxSpeed)
		body_vel.x = obj.maxSpeed;
	else if (body_vel.x < -obj.maxSpeed)
		body_vel.x = -obj.maxSpeed;

	if (body_vel.y > obj.maxSpeed)
		body_vel.y = obj.maxSpeed;
	else if (body_vel.y < -obj.maxSpeed)
		body_vel.y = -obj.maxSpeed;
}
/*
 * Comprueba colisiones con una esfera. Recibe los bodys y las shapes del objeto
 * que colisiona con la base, asi como la ecuacion que calcula la colision. Si
 * lo que colisiona con la esfera es un proyectil, cambia la polaridad del
 * proyectil.
 */
function proyCollideSpheres(body_1, body_2, shape_1, shape_2, equation) {
	var body1 = equation[0].bodyA.parent;
	var body2 = equation[0].bodyB.parent;
	for (i = 0; i < n_proyectiles; i++) {
		if (body1 != null && body2 != null) {
			if ((proyectiles[i].PhaserObject.body.id == body1.id)
					&& body2.collisionGroup == playerCollisionGroup) {
				if (soundOn == 1)
					impactSound.play();
				// alert("body1 es proyectil");
				proyectiles[i].PhaserObject.body.polarity.positive *= -1;
				// proyectiles[i].PhaserObject.body.polarity.Switch();
				if (proyectiles[i].PhaserObject.body.polarity.positive < 0) {
					proyectiles[i].PhaserObject.animations.play('negative');
				} else {
					proyectiles[i].PhaserObject.animations.play("positive");
				}
				break;
			}
		}
		if (body2 != null && body1 != null) {
			if (proyectiles[i].PhaserObject.body.id == body2.id
					&& body1.collisionGroup == playerCollisionGroup) {
				if (soundOn == 1)
					impactSound.play();
				// alert("body2 es proyectil");
				proyectiles[i].PhaserObject.body.polarity.positive *= -1;
				// proyectiles[i].PhaserObject.body.polarity.Switch();
				if (proyectiles[i].PhaserObject.body.polarity.positive < 0) {
					proyectiles[i].PhaserObject.animations.play('negative');
				} else {
					proyectiles[i].PhaserObject.animations.play("positive");
				}
				break;
			}
		}
	}
};

// Activa eventos de Impacto, actualiza las colisiones con los bordes y ajusta
// restitution
function initPhysics() {
	game.physics.p2.setImpactEvents(true);
	game.physics.p2.updateBoundsCollisionGroup();
	game.physics.p2.restitution = 1.0;
};

// Limita la velocidad de los proyectiles y
// llama a la función que comprueba si están en contacto con el magnetismo de
// una esfera
function updateMagnetCollision() {
	for (i = 0; i < n_proyectiles; i++) {
		limitSpeed(proyectiles[i]);
		esfera1.magnetCollision(proyectiles[i].PhaserObject.body, 16);
		esfera2.magnetCollision(proyectiles[i].PhaserObject.body, 16);
	}
};


function refreshSpheres()
{
	/*
	player= esfera1
	esfera2 = opponent
	*/
	player.x = esfera1.PhaserObject.body.x;
	player.y = esfera1.PhaserObject.body.y;
	player.polarity = esfera1.PhaserObject.body.polarity.positive;
	player.score= esfera1.score;
	
	esfera2.PhaserObject.body.x =opponent.x;
	esfera2.PhaserObject.body.y =opponent.y;
	esfera2.PhaserObject.body.polarity.positive = opponent.positive;
	esfera2.score = opponent.score;
 
}
