// API de WebSocket
// https://developer.mozilla.org/es/docs/Web/API/WebSocket

// La URL a la cual se conecta, debe ser la URL con la cual el servidor WebSocket debe responder.
var ws = new WebSocket('ws://127.0.0.1:8080/MagnetsFear')

//Un monitor de eventos que es llamado cuando el estado readyState de la conexión Websocket cambia a OPEN. Esto indica que la conexión está lista para enviar y recibir datos. El evento es uno simple con el nombre "open".
ws.onopen = function (event) {
        console.log('[DEBUG-WS] Se ha establecido conexion con el servidor.')
    data = {
       type: '',
       player: null,
       bases0: null,
       bases1: null,
       bases2: null,
       proy0: null,
       proy1: null
       
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
	this.send(JSON.stringify(data));
}



ws.onUpdateGameState= function()
{
	data.type= 'UPDATE_GAME_STATE';
	data.player = player;
	
	var b0= serverBases1[0];
	var b1= serverBases1[1];
	var b2= serverBases1[2];
	
	data.bases0 = b0;
	data.bases1 = b1;
	data.bases2 = b2;
	
	if(player.id== 0)
		{
		console.log("id de cliente proy0: " + serverProyectiles[0].id);
		console.log("pos de cliente proy0: (" + serverProyectiles[0].x + ", " + serverProyectiles[0].y);
		console.log("id de cliente proy1: " + serverProyectiles[1].id);
		console.log("pos de cliente proy1: (" + serverProyectiles[1].x + ", " + serverProyectiles[1].y);
		data.proy0= serverProyectiles[0];
		data.proy1= serverProyectiles[1];
		}else
			{
			data.proy0= serverProyectiles[0];
			data.proy1= serverProyectiles[1];
			}
	
	console.log("EL ID DEL JUGADOR QUE MANDA ESTE CLIENTE AL SERVIDOR ES: " +player.id);
	this.send(JSON.stringify(data));
}


// Un monitor de eventos que es llamado cuando un mensaje es recibido desde un servidor. El monitor recibe un objeto MessageEvent llamado "mensaje".
ws.onmessage = function (message) {
 
 console.log('[DEBUG-WS] Se ha recibido un mensaje: ' + message.data)


    var msg = JSON.parse(message.data)

    console.log('INFO RECIBIDA ' + msg.type)

    switch (msg.type) {
  
        case "PLAYER_JOINED":
            console.log('@@@@@@ PLAYER JOINED @@@@@')
           // player= msg.player;
            player.id= msg.player.id;
            player.x= msg.player.x;
            player.y= msg.player.y;
            player.score= msg.player.score;
            player.polarity= msg.player.polarity;
            
            serverBases1[0]= msg.bases.b0;
            serverBases1[1]= msg.bases.b1;
            serverBases1[2]= msg.bases.b2;
            
            serverProyectiles[0].id =  msg.proyectiles.p0.id;
            serverProyectiles[0].x =  msg.proyectiles.p0.x;
            serverProyectiles[0].y =  msg.proyectiles.p0.y;
            serverProyectiles[0].vx =  msg.proyectiles.p0.vx;
            serverProyectiles[0].vy =  msg.proyectiles.p0.vy;
            serverProyectiles[0].polarity =  msg.proyectiles.p0.polarity;
            
            serverProyectiles[1].id =  msg.proyectiles.p1.id;
            serverProyectiles[1].x =  msg.proyectiles.p1.x;
            serverProyectiles[1].y =  msg.proyectiles.p1.y;
            serverProyectiles[1].vx =  msg.proyectiles.p1.vx;
            serverProyectiles[1].vy =  msg.proyectiles.p1.vy;
            serverProyectiles[1].polarity =  msg.proyectiles.p1.polarity;
            
            
           // console.log("posicion del JUGADOR: (" + player.x +" ," +  player.y + ")");
           //console.log("posicion del BASE0: (" + serverBases1[0].x +" ," +  serverBases1[0].y + ")");
            //console.log("posicion del BASE1: (" + serverBases1[1].x +" ," +  serverBases1[1].y + ")");
            //console.log("posicion del BASE2: (" + serverBases1[2].x +" ," +  serverBases1[2].y + ")");
            console.log("posicion del PROYECTIL0: (" + serverProyectiles[0].x +" ," +  serverProyectiles[0].y + ")");
            console.log("posicion del PROYECTIL1: (" + serverProyectiles[1].x +" ," +  serverProyectiles[1].y + ")");
            msgJoin= true;
            break;

        case "GAME_COMPLETE":
            console.log('##### GAME IS COMPLETE #####')
            break;
            
        case "GAME_STATE_UPDATED":
        	//si hay dos jugadores
        	if(msg.serverOpponent != null)
        		{
            	if(player.id !== msg.serverOpponent.id)
            		{
            		opponent.id= msg.serverOpponent.id;
            		opponent.x= msg.serverOpponent.x;
            		opponent.y= msg.serverOpponent.y;
            		opponent.polarity= msg.serverOpponent.polarity;
            		opponent.score= msg.serverOpponent.score;
            		}
        		}
        	
        	if(player.id=== 1)
        		{
        		if(msg.proyectiles.proy0 !== null)
        			{
        			serverProyectiles[0].x = msg.proyectiles.proy0.x;
            		serverProyectiles[0].y = msg.proyectiles.proy0.y;
            		serverProyectiles[0].vx = msg.proyectiles.proy0.vx;
            		serverProyectiles[0].vy = msg.proyectiles.proy0.vy;
            		serverProyectiles[0].polarity = msg.proyectiles.proy0.polarity;
        			}
        	
        		if(msg.proyectiles.proy1 !== null)
    				{
        		serverProyectiles[1].x = msg.proyectiles.proy1.x;
        		serverProyectiles[1].y = msg.proyectiles.proy1.y;
        		serverProyectiles[1].vx = msg.proyectiles.proy1.vx;
        		serverProyectiles[1].vy = msg.proyectiles.proy1.vy;
        		serverProyectiles[1].polarity = msg.proyectiles.proy1.polarity;
    				}
        		}
        	
        	/*
        	if(msg.oppBase0 !=null)
        	{
        		serverBases2[0].x = msg.oppBase0.x;
        		serverBases2[0].y = msg.oppBase0.y;
        		serverBases2[0].hp = msg.oppBase0.hp;
        	}
        	
        	if(msg.oppBase1 !=null)
    		{
        		serverBases2[1].x = msg.oppBase1.x;
        		serverBases2[1].y = msg.oppBase1.y;
        		serverBases2[1].hp = msg.oppBase1.hp;
    		}
        	
        	if(msg.oppBase2 !=null)
        	{
        		serverBases2[2].x = msg.oppBase2.x;
        		serverBases2[2].y = msg.oppBase2.y;
        		serverBases2[2].hp = msg.oppBase2.hp;
        	}
        	*/
        	//console.log("Numero de serverBases: " + msg.nServerBases);
        	 
        	break;
        	
        case "UPDATED_GS":
        	
            break;
        	
        case "GOT_GS":
      /*
       * oponente
       * 
       * oppBase0
       * oppBase1
       * oppBase2
       * 
       * proyect0
       * proyect1
       * */
        	opponent = msg.oponente;
        	
        	serverBases2[0] = msg.oppBase0;
        	serverBases2[1] = msg.oppBase1;
        	serverBases2[2] = msg.oppBase2;
        	
        	if(player.id == 1)
        		{
        		serverProyectiles[0]= msg.proyect0;
        		serverProyectiles[1]= msg.proyect1;
        		}

         	break;

    }
 msgDefault= true;
}