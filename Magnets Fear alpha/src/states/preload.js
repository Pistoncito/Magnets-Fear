MagnetsFear.preloadState = function(game) {

}


var ready = false;
var fontsReady = false;

function fontIsReady() {
    console.log('Fonts Loaded')
    fontsReady = true;
};

function loadResources() {
    const WebFontConfig = {
        active: fontIsReady.bind(this),

        google: {
            families:['Chakra Petch','Orbitron']
        }
    };

    game.load.script('webfont',
    "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",
    () => WebFont.load(WebFontConfig));

    game.load.image('background', 'assets/images/backgrounds/classic_bg.png');
    game.load.spritesheet('sphere1','assets/images/sprites/player1SpSheet.png',80,80,8);
    game.load.spritesheet('sphere2','assets/images/sprites/player2SpSheet.png',80,80,8);
    game.load.spritesheet('civilization1','assets/images/sprites/Base1SpSheet.png',60,60,4);
    game.load.spritesheet('civilization2','assets/images/sprites/Base2SpSheet.png',60,60,4);
    game.load.spritesheet('proyectileSpSheet','assets/images/sprites/proyectileSpSheet.png',60,60,12);
     game.load.spritesheet('magnetRange', 'assets/images/sprites/magnetisms.png',400,400,8);
    
    game.load.audio('crash','assets/sounds/soundEffects/crash.wav');
    game.load.audio('impact','assets/sounds/soundEffects/Impact.wav');
    game.load.audio('over','assets/sounds/soundEffects/over.wav');
    game.load.audio('select','assets/sounds/soundEffects/select.wav');
    game.load.audio('menuMusic','assets/sounds/music/Menu_Music_1.0.wav');
    game.load.audio('classicMusic','assets/sounds/music/Space music beta.wav');
    
};

function onLoadComplete() {
    console.log('Assets Ready');
    ready = true;
};

MagnetsFear.preloadState.prototype = {

    preload: function() {
        var loadingText="loading...";
        var loadingStyle= {font:"50px", fill:"rgb(0,80,120)",boundsAlignH: "center",boundsAlignV: "middle"};
        text = game.add.text(0,0, loadingText, loadingStyle);
        text.setTextBounds(0,0,game.world.width,game.world.height);
        game.load.onLoadComplete.addOnce(onLoadComplete,this);
        loadResources();   
    },
   
    update: function() {
        if (ready && fontsReady)
            game.state.start('menuState');
    }
}
