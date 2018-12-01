function createTextButton(posX, posY, text, style, onClickCallback) {
    this.text = game.add.text(posX, posY, text, style);
    this.text.inputEnabled = true;
    this.text.anchor.x = 0.5; this.text.anchor.y = 0.5;

    if (onClickCallback != undefined)
        this.text.events.onInputDown.add(onClickCallback, this);


    this.setOnClick = function (callback) {
        this.text.events.onInputDown.add(callback, this);
    }


    this.text.events.onInputOver.add(function () {
        this.text.fill = "rgb(220,240,60)";
        this.text.fontSize += 5;
    }, this);

    this.text.events.onInputOut.add(function () {

        this.text.fill = "rgb(180,200,20)";
        this.text.fontSize -= 5;
    }, this);
}


function createSpriteButton(x, y, sprite_name, onClickCallback) {
    this.popUp;
    this.sprite = game.add.sprite(x, y, sprite_name);
    this.sprite.inputEnabled = true;
    this.sprite.anchor.x = 0.5; this.sprite.anchor.y = 0.5;

    if (onClickCallback)
        this.sprite.events.onInputDown.add(onClickCallback, this);

    this.setOnClick = function (callback) {
        this.sprite.events.onInputDown.add(callback, this);
    }

    this.sprite.events.onInputOut.add(function () {
        this.sprite.scale.setTo(1, 1);
        if(this.popUp)
        this.popUp.hide();
    }, this);

    this.sprite.events.onInputOver.add(function () {
        this.sprite.scale.setTo(1.2, 1.2);
        if(this.popUp)
        this.popUp.show();
    }, this);
}
