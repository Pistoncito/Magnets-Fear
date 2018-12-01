function Icon(x, y, arrayRow, arrayCol, sprite_name, storedIn, typeOf) {
    this.storedIn = storedIn;
    this.typeOf = typeOf;
    this.initX = x;
    this.initY = y;
    this.arrayRow = arrayRow;
    this.arrayCol = arrayCol;
    this.sprite_name = sprite_name;

    this.background = game.add.sprite(x, y, 'iconBg');
    game.physics.enable(this.background, Phaser.Physics.ARCADE);
    this.background.inputEnabled = true;
    this.background.alpha = 0.6;
    this.background.anchor.x = 0.5; this.background.anchor.y = 0.5;
    this.background.body.inmovable = true;



    this.sprite;

    this.setFromUndefined = function (newSprite) {
        if (newSprite != undefined) {
            this.sprite = newSprite;
            game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
            iconsGroup.add(this.sprite);
            this.sprite.inputEnabled = true;
            this.sprite.alpha = 0.6;
            this.sprite.input.enableDrag(true);
            this.sprite.anchor.x = 0.5; this.sprite.anchor.y = 0.5;

            this.sprite.events.onInputOut.add(function () {
                if (this.sprite != undefined)
                    this.sprite.alpha = 0.6
            }, this);

            this.sprite.events.onInputOver.add(function () {
                if (this.sprite != undefined)
                    this.sprite.alpha = 1.0
            }, this);


        }
    }


    if (sprite_name != undefined) {
        this.setFromUndefined(game.add.sprite(this.initX, this.initY, sprite_name));
        this.sprite.events.onDragStop.add(
            function () {
                var swap = false;
                swap = personaje.swapIfNeeded(this.arrayRow, this.arrayCol, this.sprite_name, this.storedIn, this.typeOf);
                if (swap === false) {
                    this.sprite.x = this.initX;
                    this.sprite.y = this.initY;
                    this.sprite.alpha = 0.6;
                }

            }, this);
    }



    this.clear = function () {
        this.background.destroy();
        if(this.sprite)
        this.sprite.destroy();
    }


}
