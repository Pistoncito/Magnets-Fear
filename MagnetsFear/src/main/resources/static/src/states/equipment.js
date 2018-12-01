CimmerianDepths.equipmentState = function (game) {
    //Texts
    this.recetasButton;
    this.forjadosButton;
    this.equipmentButton;
    this.helpButton
    this.returnText;
    this.style;
}
var iconsGroup;
CimmerianDepths.equipmentState.prototype = {

    preload: function () {
    },

    create: function () {

        iconsGroup = game.add.group();
        popUpGroup = game.add.group();

        //Backgrounds
        //Fondo
        game.add.image(0, 0, 'titleScreenBG');
        //baul
        baulBg = game.add.sprite(10, game.height * 0.4, 'BaulBg')
        tipoBaul = game.add.sprite(30, game.height*0.4 + 20, 'recipe-icon');
        tipoBaul.scale.setTo(0.8, 0.8);
        tipoBaul.alpha= 0.8;
        //personaje
        game.add.sprite(450, 280, 'pjBg');
        //inventarios



        //Botones
        //((tam_img + x_pannin)* (n_cols +1)) + x_offset +aesthetic
        var x_offset = ((52 + 3) * 6) + 60 + 30;

        this.style = { font: "25px Averia Sans Libre", fill: "rgb(180,200,20)", align: "center" };

        this.recetasButton = new createSpriteButton(x_offset, 100, 'recipe-icon');
        var recetasButtonText = 
            " Recetas: sirven para crear     \n" + 
            " Forjados dentro de la mazmorra.\n" +
            " Son imprescindibles para llegar\n" +
            " a mayor profundidad.";
        this.recetasButton.popUp = new Popup(this.recetasButton.sprite.x - 300, this.recetasButton.sprite.y,
            'infoBg', recetasButtonText);
        this.recetasButton.popUp.sprite.scale.setTo(1, 0.35);


        this.forjadosButton = new createSpriteButton(x_offset, 200, 'forged-icon');

        var forjadosButtonText = 
            " Forjados: se utilizan dentro de\n" +
            " la mazmorra para enfrentarte a \n" +
            " enemigos o interactuar con el  \n" +
            " entorno.";
        this.forjadosButton.popUp = new Popup(this.forjadosButton.sprite.x - 300, this.forjadosButton.sprite.y,
            'infoBg', forjadosButtonText);
        this.forjadosButton.popUp.sprite.scale.setTo(1, 0.35);


        this.equipmentButton = new createSpriteButton(x_offset, 300, "equipment-icon");
        var equipmentButtonText = 
            " Equipamiento: afectará a las   \n" +
            " estadísticas del personaje. Lo \n" +
            " podrás encontrar dentro de la  \n" +
            " mazmorra.\n" +  
            " (NO DISPONIBLE)";
        this.equipmentButton.popUp = new Popup(this.equipmentButton.sprite.x - 300, this.equipmentButton.sprite.y,
            'infoBg', equipmentButtonText);
        this.equipmentButton.popUp.sprite.scale.setTo(1, 0.45);

//TUTORIAL
        this.helpButton = new createSpriteButton(50, 150, 'ayuda');
        var helpText = 
            " -Lo que tienes a la derecha son\n" + 
            " los inventarios. Podrás usar   \n" + 
            " los objetos que lleves en ellos\n" +
            " dentro de la mazmorra.         \n" + 
            " -Añade la receta de antorcha   \n" +
            " que tienes debajo al inventario\n" +
            " de recetas, arrastrándola con  \n" +
            " el ratón";
        this.helpButton.popUp = new Popup(this.helpButton.sprite.x, this.helpButton.sprite.y + 25, 
            'infoBg',helpText);
        this.helpButton.popUp.sprite.scale.setTo(1, 0.65);

        //Botón de volver
        this.returnText = new createTextButton(game.width - 100, 50, "Volver", this.style,
            function () { game.state.start("playerSelectState") });




        //personaje
        personaje = new Personaje();
        var player_sprt = game.add.sprite(450 + 48, 315, 'player');
        player_sprt.scale.setTo(3, 3);
        player_sprt.animations.add('frontWalk', [0, 1, 2, 3, 0, 4, 5, 6]);
        player_sprt.animations.play('frontWalk', 15, true);

        //inventarios
        personaje.createRecipeInv(x_offset + 50, 100, 3, 3, 1, 5, 52);
        personaje.recipeInventory.Show();

        personaje.createForgedInv(x_offset + 50, 200, 3, 3, 1, 5, 52);
        personaje.forgedInventory.Show();

        //Cajones
        personaje.createCajonRecipes(60, game.height * 0.4 + 100, 3, 3, 4, 5, 52);
        personaje.addToCajonRecipes(0, 0, 'torch-recipe');
        personaje.cajonRecipes.Show();

        game.world.bringToTop(iconsGroup);

        //Opciones
        this.settingsButton = game.add.sprite(30,30,'ajustes');
        this.settingsButton.alpha = 0.3;
    },

    update: function () {

    }
}
