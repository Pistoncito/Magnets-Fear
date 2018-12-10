// API de WebSocket
// https://developer.mozilla.org/es/docs/Web/API/WebSocket

// La URL a la cual se conecta, debe ser la URL con la cual el servidor WebSocket debe responder.
var ws = new WebSocket('ws://127.0.0.1:8080/MagnetsFear')

//Un monitor de eventos que es llamado cuando el estado readyState de la conexión Websocket cambia a OPEN. Esto indica que la conexión está lista para enviar y recibir datos. El evento es uno simple con el nombre "open".
ws.onopen = function (event) {
        console.log('[DEBUG-WS] Se ha establecido conexion con el servidor.')
    data = {
       type: '',
       info: null
    }
    this.send(JSON.stringify(data))

}

// Un monitor de eventos que es llamado cuando un error ocurre. Esto es un evento simple llamado "error"
ws.onerror = function (error) {
    console.log('[DEBUG-WS] Ha ocurrido un error: ' + error)
}

// Un monitor de eventos que atiende una llamada cuando la conexión del WebSocket cambia a un estado CERRADO (CLOSED). El monitor recibe un CloseEvent llamado "cerrado".
ws.onclose = function (event) {

        console.log('[DEBUG-WS] Se ha cerrado la conexion.')
 
}
ws.onJoin= function()
{
	data.type= 'PLAYER_WANT_JOIN';
	data.messageToClient= true;
	msgJoin= false;
	msgDefault= false;
	this.send(JSON.stringify(data));
}
ws.onGetGameState =  function()
{
	msgOnGameState= false;
	data.type= 'GET_GAME_STATE';
	this.send(JSON.stringify(data));
}

ws.onTest= function()
{
	data.type= "TEST";
	this.send(JSON.stringify(data));
}

// Un monitor de eventos que es llamado cuando un mensaje es recibido desde un servidor. El monitor recibe un objeto MessageEvent llamado "mensaje".
ws.onmessage = function (message) {
 
 console.log('[DEBUG-WS] Se ha recibido un mensaje: ' + message.data)


    var msg = JSON.parse(message.data)

    console.log('INFO RECIBIDA ' + msg.type)

    switch (msg.type) {
    
    case "TEST_RETURN":
    	  console.log('@@@@@@ TEST DONE @@@@@')
          console.log('id: ' + msg.p.id)
          console.log('pos: (' + msg.p.x + ',' + msg.p.y + ')')
          console.log('polarity: ' + msg.p.polarity)
    		break;
        case "PLAYER_JOINED":
            console.log('@@@@@@ PLAYER JOINED @@@@@')
            player= msg.player;
            
            serverBases1[0]= msg.bases.b0;
            serverBases1[1]= msg.bases.b1;
            serverBases1[2]= msg.bases.b2;
            
            serverProyectiles1[0] =  msg.proyectiles.p0;

            console.log("posicion del JUGADOR: (" + player.x +" ," +  player.y + ")");
            console.log("posicion del BASE0: (" + serverBases1[0].x +" ," +  serverBases1[0].y + ")");
            console.log("posicion del BASE1: (" + serverBases1[1].x +" ," +  serverBases1[1].y + ")");
            console.log("posicion del BASE2: (" + serverBases1[2].x +" ," +  serverBases1[2].y + ")");
            console.log("posicion del PROYECTIL0: (" + serverProyectiles1[0].x +" ," +  serverProyectiles1[0].y + ")");

            msgJoin= true;
            break;

        case "GAME_COMPLETE":
            console.log('##### GAME IS COMPLETE #####')
            break;
        case "UPDATE_STATE":
            console.log('!!!!! GAME SENDS UPDATE !!!!!');
            break;
        	
        case "GAME_STATE":
        	//Si no hay 2 jugadores (para entender mirar WebSockeGameHandler)
        	if(msg.game_state.player1 != null)
        		{
        		//Elegimos quien es el jugador 1 y quien el 2
        	if(player.id=== msg.game_state.player1.id)
        		{
        		//jugadores
        		player =  msg.game_state.player1;
        		opponent.id=  msg.game_state.player2;
        	
        		}
        	else if(player.id=== msg.game_state.player2.id)
        		{
        		//jugadores
        		player=  msg.game_state.player2;
        		opponent=  msg.game_state.player1;
        		}
        	//bases
    		serverBases1[0]=  msg.game_state.base0;
    		serverBases1[1]=  msg.game_state.base1;
    		serverBases1[2]=  msg.game_state.base2;
    		serverBases2[0]=  msg.game_state.base3;
    		serverBases2[1]=  msg.game_state.base4;
    		serverBases2[2]=  msg.game_state.base5;
    		//proyectiles
    		serverProyectiles1[0]=  msg.game_state.proy0;
    		serverProyectiles1[1]=  msg.game_state.proy1;
    		serverProyectiles2[0]=  msg.game_state.proy2;
    		serverProyectiles2[1]=  msg.game_state.proy3;
        	
    		msgOnGameState=true;
        	console.log("GAME_STATE_RECIEVED");
        		}
         	break;

    }
 msgDefault= true;
}