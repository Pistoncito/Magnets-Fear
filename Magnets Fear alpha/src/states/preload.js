MagnetsFear.preloadState = function(game) {
}

MagnetsFear.preloadState.prototype = {
    //Variables que indican si se han cargado los assets y la fuente
    ready: false,
    fontsReady: false,
    //Crea un texto de carga y empieza a cargar los assets
    preload: function() {
        var loadingText="loading...";
        var loadingStyle= {font:"50px", fill:"rgb(0,80,120)",boundsAlignH: "center",boundsAlignV: "middle"};
        text = game.add.text(0,0, loadingText, loadingStyle);
        text.setTextBounds(0,0,game.world.width,game.world.height);
        game.load.onLoadComplete.addOnce(this.onLoadComplete,this);
        this.loadResources();   
    },
    //Pasa al menú una vez cargados los assets
    update: function() {
        if (this.ready && this.fontsReady)
            game.state.start('menuState');
    },
    //Comunica que se han cargado las fuentes
    fontIsReady: function() {
        console.log('Fonts Loaded');
        this.fontsReady = true;
    },
    //Comunica que se han cargado los assets
    onLoadComplete: function() {
        console.log('Assets Ready');
        this.ready = true;
    },
    //Carga el script necesario para cargar las fuentes de google, las imágenes y el audio
    loadResources: function() {
        const WebFontConfig = {
            active: this.fontIsReady.bind(this),

            google: {
                families:['Chakra Petch','Orbitron']
            }
        };

        game.load.script('webfont',
        "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",
        () => WebFont.load(WebFontConfig));

        game.load.spritesheet('StarfieldBg','assets/images/backgrounds/StarfieldSpSheet.png',1280,720,10);
        game.load.spritesheet('sphere1','assets/images/sprites/player1SpSheet.png',80,80,8);
        game.load.spritesheet('sphere2','assets/images/sprites/player2SpSheet.png',80,80,8);
        game.load.spritesheet('civilization1','assets/images/sprites/Base1SpSheet.png',60,60,4);
        game.load.spritesheet('civilization2','assets/images/sprites/Base2SpSheet.png',60,60,4);
        game.load.spritesheet('proyectileSpSheet','assets/images/sprites/proyectileSpSheet.png',60,60,12);
        game.load.spritesheet('magnetRange', 'assets/images/sprites/magnetisms.png',400,400,8);
        
        game.load.audio('crash','assets/sounds/soundEffects/crash.ogg');
        game.load.audio('impact','assets/sounds/soundEffects/Impact.ogg');
        game.load.audio('over','assets/sounds/soundEffects/over.ogg');
        game.load.audio('select','assets/sounds/soundEffects/select.ogg');
        game.load.audio('menuMusic','assets/sounds/music/Menu_Music_1.0_0.ogg');
        game.load.audio('classicMusic','assets/sounds/music/Space music beta.ogg');    
    }
}
