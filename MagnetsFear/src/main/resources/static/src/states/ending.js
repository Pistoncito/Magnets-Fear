CimmerianDepths.endingState = function(game) {

}

function over(text) {
	text.fill = "rgb(200,200,200)"
}
function out(text) {
	text.fill = "rgb(120,120,120)"
}
function startMenu() {
	game.state.start('initialScreenState');
}

CimmerianDepths.endingState.prototype = {

    preload: function() {
        
    },

    create: function() {
    	var endingText = 'Fin del prototipo';
    	var endingStyle = {font:"50px Averia Sans Libre", fill:"rgb(120,120,120)",boundsAlignH: "center",boundsAlignV: "middle"};
    	var returnText = 'Volver';

    	var textEnding = game.add.text(0,0, endingText, endingStyle);
    	textEnding.setTextBounds(0,0,1024,768);
    	var textReturn = game.add.text(0,0, returnText, endingStyle);
    	textReturn.setTextBounds(0,384,1024,591);

    	textReturn.inputEnabled = true;
    	textReturn.events.onInputOver.add(over,this);
    	textReturn.events.onInputOut.add(out,this);
    	textReturn.events.onInputDown.add(startMenu,this);
    },

    update: function() {

    }
}
