//Funciones utilizadas en diversos estados


//Inicialización de variables
var PI = Math.PI;
var soundOn = 1;
var musicOn = 1;
//Recibe como parámetros las coordenadas del primer punto y del segundo
//Devuelve la distancia euclídea entre ambos
function getDistance(fromX, fromY, toX, toY)
{
  var a = Math.abs(fromX - toX);
  var b = Math.abs(fromY - toY);
  return Math.sqrt((a * a) + (b * b));
};

//Recibe como parámetro un texto  
//Modifica su color al pasar el ratón por encima, reproduciendo un sonido
function over(text) {

    text.fill = "rgb(255,150,0)";
    if(soundOn==1)mouseOver.play();
};
//Recibe como parámetro un texto  
//Modifica su color al apartar el ratón
function out(text) {
    text.fill = "rgb(0,90,120)";
};

//Pasa al menú principal y reproduce un sonido
 function returnMenu () {
    game.state.start('menuState');
    if(soundOn==1)optionSelect.play();
};


  //////////////////////