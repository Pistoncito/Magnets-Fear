// Grupos de Colisiones
var playerCollisionGroup;
var proyectilesCollisionGroup;
var magnetCollisionGroup;
var basesCollisionGroup;

// Inicia todos los grupos de colisiones
function initCollisionGroups() {
	playerCollisionGroup = game.physics.p2.createCollisionGroup();
	proyectilesCollisionGroup = game.physics.p2.createCollisionGroup();
	magnetCollisionGroup = game.physics.p2.createCollisionGroup();
	basesCollisionGroup = game.physics.p2.createCollisionGroup();
};