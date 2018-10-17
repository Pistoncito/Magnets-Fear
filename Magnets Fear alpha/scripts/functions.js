//Funciones

function collidesCircleCircle(body1, body2){
  var radius1 = body1.width * 0.5;
  var radius2 = body2.width * 0.5;
  var distance = this.getDistance(body1.x, body1.y, body2.x, body2.y);
  if (distance <= (radius1 + radius2)){
    return true;

  }  
  return false;
};
//Distancia entre cordenadas
function getDistance(fromX, fromY, toX, toY){
  var a = Math.abs(fromX - toX);
  var b = Math.abs(fromY - toY);
  return Math.sqrt((a * a) + (b * b));
};

//Resolución de Solapado
//Resolución de Colisiones


function solveStaticColission(body1, body2){
  var radius1 = body1.width * 0.5;
  var radius2 = body2.width * 0.5;
  var overlap = 0.5 * (distance - radius1 + radius2);
  //Desplazar 1er objeto
  body1.x += overlap * (body1.x - body2.x)/distance;
  body1.y += overlap * (body1.y - body2.y)/distance;
  //Desplazar 2º objeto
  body2.x -= overlap * (body1.x - body2.x)/distance;
  body2.y -= overlap * (body1.y - body2.y)/distance;
}
//Resolución Impacto en Movimiento
function solveDynamicColission(body1, body2){
  //Normal
  var distance = this.getDistance(body1.x, body1.y, body2.x, body2.y);
  var nx = (body2.x - body1.x)/distance;
  var ny = (body2.y - body1.y)/distance;
  //Tangente
  var tx = -ny;
  var ty = nx;
  //Producto escalar
  alert(body1.deltaX()); 
}

function colissionHandler(body1,body2){
}

function proyectileHitsPlayer(player,proyectile){
}

function PolarityHandler(player,proyectile){  
}

function keyDownHandler(){
  if(this.wKey.isDown){
        wKeyDown = true;
    }
  if(this.sKey.isDown){
        sKeyDown = true;
    }
  if(this.aKey.isDown){
        aKeyDown = true;
    }
  if(this.dKey.isDown){
        dKeyDown = true;
    }
}

function keyUpHandler(){
  if(this.wKey.isUp){
      wKeyDown = false;
    }
  if(this.sKey.isUp){
        sKeyDown = false;
    }
  if(this.aKey.isUp){
        aKeyDown = false;
    }
  if(this.dKey.isUp){
        dKeyDown = false;
    }
}

function playerControl(player){
  if(wKeyDown){
    player.ay -= 0;
  }
  if(aKeyDown){
    player.ax -= 0;
  }
  if(sKeyDown){
    player.ay += 0;
  }
  if(dKeyDown){
    player.ax += 0;
  }
}