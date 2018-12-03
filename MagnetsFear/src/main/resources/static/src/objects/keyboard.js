
// Teclas
var w, a, s, d, spacebar, up, left, down, right, enter;

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