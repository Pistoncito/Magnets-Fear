function Mapa(){
    this.tileMap;
    this.layers = new Array();

    this.createMap = function(){
        this.tileMap = game.add.tilemap('mapa');
        this.tileMap.addTilesetImage('DungeonSpSheet', 'map_tiles'); // (nombre_tiles_en_JSON , nombre_archivo_cache_PHASER)
            
        this.layers[0] = this.tileMap.createLayer('suelo');
        this.layers[1] = this.tileMap.createLayer('fondo');

        //Activamos colisiones para paredes y adornos
        this.tileMap.setCollision(1, true, this.layers[0]);
        this.tileMap.setCollision(1, true, this.layers[1]);
    }
    
}
