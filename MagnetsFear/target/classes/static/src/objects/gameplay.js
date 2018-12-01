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
// Grupos de Colisiones
var playerCollisionGroup;
var proyectilesCollisionGroup;
var magnetCollisionGroup;
var basesCollisionGroup;
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
// Teclas
var w, a, s, d, spacebar, up, left, down, right, enter;

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
// Recibe una esfera con una posición y un sprite
// Crea una esfera con su animación y la asigna su grupo de colisiones
/*
 * function initSphere(obj,pX,pY,sprite){ obj.PhaserObject.frame = 0;
 * obj.PhaserObject.animations.add('negative',[0,1,2,3,2,1],10,true);
 * obj.PhaserObject.animations.add('positive',[4,5,6,7,6,5],10,true);
 * obj.PhaserObject.animations.play('negative');
 * obj.PhaserObject.body.setCircle(32); obj.PhaserObject.body.fixedRotation =
 * true; obj.PhaserObject.body.mass = 8; obj.PhaserObject.body.damping = 0.9;
 * obj.PhaserObject.body.setCollisionGroup(playerCollisionGroup);
 * obj.PhaserObject.body.collisionGroup = playerCollisionGroup;
 * obj.PhaserObject.body.collides([proyectilesCollisionGroup,playerCollisionGroup,basesCollisionGroup]);
 * obj.PhaserObject.body.polarity = new Polarity(); };
 */
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

// Otorga atributos de magnetismo a un objeto
function Magnetism() {
	this.force = 20;
	this.radius = 200;
	this.maxSpeed;
	this.PhaserObject;
}

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
// Inicia todos los grupos de colisiones
function initCollisionGroups() {
	playerCollisionGroup = game.physics.p2.createCollisionGroup();
	proyectilesCollisionGroup = game.physics.p2.createCollisionGroup();
	magnetCollisionGroup = game.physics.p2.createCollisionGroup();
	basesCollisionGroup = game.physics.p2.createCollisionGroup();
};

// Inicia tiempo de juego
function initGameTime() {
	wallClock = game.time.create(false);
	wallClock.loop(1000, printGameTime, this);
	needToSpawnBases = false;
	maxTimeToSpawnBases = 30;
	wallClock.start();
};

// Asigna a las variables su tecla correspondiente
function setKeys() {
	// player1
	w = game.input.keyboard.addKey(Phaser.Keyboard.W);
	a = game.input.keyboard.addKey(Phaser.Keyboard.A);
	s = game.input.keyboard.addKey(Phaser.Keyboard.S);
	d = game.input.keyboard.addKey(Phaser.Keyboard.D);
	spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	// player2
	up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	// evita que las teclas afecten al navegador
	game.input.keyboard.addKeyCapture([ w, a, s, d, spacebar, up, left, down,
			right, enter ]);
};
// Comprueba qué teclas han sido pulsadas
function updateKeys() {
	var keys_bools1 = [ 0, 0, 0, 0, 0 ];
	var keys_bools2 = [ 0, 0, 0, 0, 0 ];
	if (w.isDown)
		keys_bools1[0] = 1;
	if (a.isDown)
		keys_bools1[1] = 1;
	if (s.isDown)
		keys_bools1[2] = 1;
	if (d.isDown)
		keys_bools1[3] = 1;
	if (spacebar.isDown)
		keys_bools1[4] = 1;

	// Control de cada esfera dependiendo del id del jugador
	if (player.id === 1) {
		esfera1.Movement(keys_bools1);
	} else {
		esfera2.Movement(keys_bools1);
	}
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

function initStatePlayers() {
	if (player.id === 1) {
		player.x = esfera1.PhaserObject.body.x;
		player.y = esfera1.PhaserObject.body.y;
		player.score = esfera1.score;
		player.polarity = esfera1.PhaserObject.body.polarity.positive;
		opponent.x = esfera2.PhaserObject.x;
		opponent.y = esfera2.PhaserObject.y;
		opponent.score = esfera2.score;
		opponent.polarity = esfera2.PhaserObject.body.polarity.positive;
	} else {
		player.x = esfera2.PhaserObject.body.x;
		player.y = esfera2.PhaserObject.body.y;
		player.score = esfera2.score;
		player.polarity = esfera2.PhaserObject.body.polarity.positive;
		opponent.x = esfera1.PhaserObject.body.x;
		opponent.y = esfera1.PhaserObject.body.y;
		opponent.score = esfera1.score;
		opponent.polarity = esfera1.PhaserObject.body.polarity.positive;
	}
	updatePlayer(player);
	updatePlayer(opponent);
}

function updateStatePlayers() {
	if (player.id === 1) {
		player.x = esfera1.PhaserObject.body.x;
		player.y = esfera1.PhaserObject.body.y;
		player.score = esfera1.score;
		player.polarity = esfera1.PhaserObject.body.polarity.positive;
		
	} else {
		player.x = esfera2.PhaserObject.body.x;
		player.y = esfera2.PhaserObject.body.y;
		player.score = esfera2.score;
		player.polarity = esfera2.PhaserObject.body.polarity.positive;
	}
	updatePlayer(player);
	getPlayer(function(oPlayer) {
		opponent.x = oPlayer.x;
		opponent.y = oPlayer.y;
		opponent.score = oPlayer.score;
		opponent.polarity = oPlayer.polarity;
		if (opponent.id === 1) {
			esfera1.PhaserObject.body.x = opponent.x;
			esfera1.PhaserObject.body.y = opponent.y;
			esfera1.score = opponent.score;
			esfera1.PhaserObject.body.polarity.positive = opponent.polarity;
			if (esfera1.PhaserObject.body.polarity.positive < 0) {
				esfera1.PhaserObject.animations.play('negative');
				esfera1.magnetism.PhaserObject.animations.play('negative');
			} else {
				esfera1.PhaserObject.animations.play("positive");
				esfera1.magnetism.PhaserObject.animations.play('positive');
			}
		} else {
			esfera2.PhaserObject.body.x = opponent.x;
			esfera2.PhaserObject.body.y = opponent.y;
			esfera2.score = opponent.score;
			esfera2.PhaserObject.body.polarity.positive = opponent.polarity;
			if (esfera2.PhaserObject.body.polarity.positive < 0) {
				esfera2.PhaserObject.animations.play('negative');
				esfera2.magnetism.PhaserObject.animations.play('negative');
			} else {
				esfera2.PhaserObject.animations.play("positive");
				esfera2.magnetism.PhaserObject.animations.play('positive');
			}
		}

	}, opponent.id)
};

function updateStateProyectiles(){
	if(player.id === 1){
		arrayProyectiles[0].x = proyectiles[0].x;
		arrayProyectiles[0].y = proyectiles[0].y;
		updateProyectile(arrayProyectiles[0]);
		getProyectile(function(proyec){
			proyectiles[1].x = proyec.x;
			proyectiles[1].y = proyec.y;
		},arrayProyectile[1].id);
	}
	else {
		arrayProyectiles[1].x = proyectiles[1].x;
		arrayProyectiles[1].y = proyectiles[1].y;
		updateProyectile(arrayProyectiles[1]);
		getProyectile(function(proyec){
			proyectiles[0].x = proyec.x;
			proyectiles[0].y = proyec.y;
		},arrayProyectile[0].id);
	}
}
/*
function updateStateBases(){
	if(player.id === 1){
		for(i = 0; i < bases1.length; i++){
			updateBase(bases1[i]);
			getBase(function(bs){
				bases2[i].x = bs.x;
				bases2[i].y = bs.y
			},bases2[i].id)
		}
	} else {
		for(i = 0; i < bases2.length; i++){
			updateBase(bases2[i]);
			getBase(function(bs){
				bases1[i].x = bs.x;
				bases1[i].y = bs.y
			},bases1[i].id)
		}
	}
}*/
