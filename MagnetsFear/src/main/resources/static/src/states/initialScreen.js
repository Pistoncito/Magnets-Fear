CimmerianDepths.initialScreenState = function (game) {
    this.spr_text;
    this.alphaAnimation;

    this.title_text;
    this.alphaTitleAnim;
    this.bg;

    this.isIncreasing;
}
var personaje;
var pressed;
var popUpGroup;
CimmerianDepths.initialScreenState.prototype = {

    preload: function () {
        game.load.image('titleScreenBG', "assets/titleScreenBG.png");
    },

    create: function () {
        //Create BG
        game.add.sprite(0, 0, "titleScreenBG");
        this.isIncreasing = false;

        this.alphaTitleAnim = 1.0;
        this.alphaAnimation = 0.0;
        text = "Presiona cualquier tecla para comenzar";
        title = "CIMMERIAN\n DEPTHS";
        style = { font: "40px Averia Sans Libre", fill: "rgb(255,255,255)", align: "center" };
        this.spr_text = game.add.text(game.width / 2, game.height - 300, text, style);
        this.spr_text.inputEnabled = true;
        this.spr_text.anchor.x = 0.5;

        title_style = { font: "100px Averia Sans Libre", fill: "rgb(255,255,255)", align: "center" };
        this.title_text = game.add.text(game.width / 2, 300, title, title_style);
        this.title_text.inputEnabled = true;
        this.title_text.anchor.x = 0.5; this.title_text.anchor.y = 0.5;

        pressed = false;

        any_key = game.input.keyboard.onPressCallback = function () { pressed = true; }
    },

    update: function () {
        this.spr_text.alpha = Math.cos(this.alphaAnimation) * 0.5;
        if (this.alphaAnimation < 255)
            this.alphaAnimation += 0.1;
        this.alphaAnimation = this.alphaAnimation % 255;




        if (this.alphaTitleAnim >= 1.0) {
            this.isIncreasing = false;
        }
        else if (this.alphaTitleAnim <= 0.5) {
            this.isIncreasing = true;
        }

        if (this.isIncreasing) {
            this.alphaTitleAnim += 0.01;
        } else this.alphaTitleAnim -= 0.01;

        this.title_text.alpha = this.alphaTitleAnim;



        if (pressed) { game.state.start('playerSelectState'); }
    }
}
