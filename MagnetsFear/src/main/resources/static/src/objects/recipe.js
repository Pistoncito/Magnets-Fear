function Recipe(x, y, sprite) {
    this.sprite = game.add.sprite(x, y, sprite);
    this.sprite.anchor.setTo(0.5, 0.5);
    
    this.destroy = function(){
        this.sprite.destroy();
        delete this;
    }
}
