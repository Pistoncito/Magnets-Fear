CimmerianDepths.preloadState = function (game) {

}

CimmerianDepths.preloadState.prototype = {

    ready: false,
    fontsReady: false,

    preload: function () {
        var loadingText = "Loading...";
        var loadingStyle = { font: "50px Courier New", fill: "rgb(120,120,120)", boundsAlignH: "center", boundsAlignV: "middle" };
        var text = game.add.text(0, 0, loadingText, loadingStyle);
        text.setTextBounds(0, 0, game.world.width, game.world.height);
        this.loadFonts();
        this.loadAssets();
        game.load.onLoadComplete.addOnce(this.loadComplete, this);
    },

    create: function () {


    },

    update: function () {
        if (this.ready && this.fontsReady)
            game.state.start('initialScreenState');

    },
    //Comunica que se han cargado las fuentes
    fontIsReady: function () {
        console.log('Fonts Loaded');
        this.fontsReady = true;
    },
    //Comunica que se han cargado los assets
    loadComplete: function () {
        console.log('Assets Ready');
        this.ready = true;
    },
    //Carga las fuentes de google
    loadFonts: function () {
        const WebFontConfig = {
            active: this.fontIsReady.bind(this),

            google: {
                families: ['Averia Sans Libre']
            }
        };
        //Script necesario para cargar las fuentes
        game.load.script('webfont',
            "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",
            () => WebFont.load(WebFontConfig));
    },
    loadAssets: function () {
        game.load.image('bs', "/assets/button-sprite.png"); //Boton blanco de prueba

        game.load.tilemap('mapa', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('map_tiles', 'assets/DungeonSpSheet.png');

        //loads para equipmentState
        game.load.image('iconBg', "assets/Interfaz/icon-background.png");
        game.load.image('BaulBg', 'assets/Interfaz/Baul.png');
        game.load.image('pjBg', 'assets/Interfaz/menuPersonaje.png');
        game.load.image('titleScreenBG', "assets/Interfaz/titleScreenBG.png");
        game.load.image('antorcha', "assets/antorcha.png");
        game.load.image('botonJugar', "assets/Interfaz/botonJugar.png");
        game.load.image('botonCancelar', "assets/Interfaz/botonCancelar.png");
        game.load.image('botonAceptar', "assets/Interfaz/botonAceptar.png");
        game.load.image('botonEquipar', "assets/Interfaz/botonEquipar.png");
        game.load.image('inventarioBg', "assets/Interfaz/menuInventario.png");
        game.load.image('statsBg', "assets/Interfaz/menuEstadisticas.png");
        game.load.image('infoBg', "assets/Interfaz/info.png");
        game.load.image('recipe-icon', "assets/receta.png");
        game.load.image('torch-recipe', "assets/receta antorcha.png");
        game.load.image('forged-icon', "assets/forjado.png");
        game.load.image('equipment-icon', "assets/equipamiento.png");
        game.load.image('ajustes', "assets/Interfaz/ajustes.png");
        game.load.image('ayuda', "assets/Interfaz/Ayuda.png");
        game.load.image('WASD', "assets/Interfaz/WASD.png");
        // Assets Dungeon
        game.load.spritesheet('player', "/assets/personajeSpSheet.png", 64, 96, 28); //Personaje
        game.load.spritesheet('enemy', "/assets/ghostSpSheet.png", 64, 96, 20); //Enemigo
        game.load.image('exp', "/assets/barraExp.png"); //Barra de experiencia y maná
        game.load.image('bufo', "/assets/bufo.png"); //Bufos
        //Bufo es un género de anfibios anuros de la familia Bufonidae que incluye, entre otros, al sapo europeo común.
        game.load.image('mochila', "/assets/mochila.png"); //Icono mochila interfaz
        game.load.image('receta_antorcha', "/assets/receta antorcha.png"); //Icono antorcha
        game.load.image('salida', "/assets/Salida.png");//Salida
        game.load.image('mat_palos', "/assets/palos.png"); //Icono mochila interfaz
        game.load.image('oscuridad', "/assets/oscuridad.png"); //Oscuridad circundante al personaje sin antorcha
        game.load.spritesheet('oscuridad_antorcha', "/assets/oscuridad_antorcha_anim.png", 2048, 1536, 4); //Oscuridad circundante al personaje con antorcha

    }
}

