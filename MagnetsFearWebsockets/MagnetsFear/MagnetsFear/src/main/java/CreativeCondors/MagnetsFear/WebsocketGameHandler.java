package CreativeCondors.MagnetsFear;

import java.lang.reflect.Array;
import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.POJONode;

public class WebsocketGameHandler extends TextWebSocketHandler {

	private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	ObjectMapper mapper = new ObjectMapper();
	boolean debug = true;
	GameController gameController = new GameController();

	// Invoked after WebSocket negotiation has succeeded and the WebSocket
	// connection is opened and ready for use.
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}

	// Invoked after the WebSocket connection has been closed by either side, or
	// after a transport error has occurred. Although the session may technically
	// still be open, depending on the underlying implementation, sending messages
	// at this point is discouraged and most likely will not succeed.
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	// Invoked when a new WebSocket message arrives.
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		synchronized (sessions) {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode json = mapper.createObjectNode();

			switch (node.get("type").asText()) {
			
			case "TEST":
				Player p  = gameController.newPlayer(0,0);
				json.putPOJO("p", p);
				json.put("type", "TEST_RETURN");
				session.sendMessage(new TextMessage(json.toString()));
				break;
				
			case "PLAYER_WANT_JOIN":
				if (gameController.getPlayers().size() < 2) {
					Player player;
					ObjectNode jsonBases  =  mapper.createObjectNode();
					ObjectNode jsonProyectiles= mapper.createObjectNode();
					if(gameController.getPlayers().size() == 0)
					{
						player = gameController.newPlayer(100,400);
						//Hago proyectiles (random positions)
						for(int i=0; i< gameController.getMaxProyectiles(); i++)
						{
							switch(i)
							{
							case 0:
								Proyectile proy0 = gameController.newProyectile();
								jsonProyectiles.putPOJO("p0", proy0);
								break;
								
							case 1:
								Proyectile proy1 = gameController.newProyectile();
								jsonProyectiles.putPOJO("p1", proy1);
								break;
							}
						}
					}
					else
					{
						player = gameController.newPlayer(1280- 100, 400);
						Proyectile [] proyectilesValues_array= new Proyectile[gameController.getProyectiles().size()];
						proyectilesValues_array= gameController.getProyectiles().toArray(new Proyectile[0]);
						jsonProyectiles.putPOJO("p0", proyectilesValues_array[0]);
						jsonProyectiles.putPOJO("p1", proyectilesValues_array[1]);
					}
			
					
					//Hago bases
					for(int i=0; i< gameController.getMaxBases(); i++)
					{
						Base b;
						float x=  player.getX();
						float y = player.getY();
						switch(i)
						{
						case 0:
							x -= 100.0f;
							y += 50.0f;
							b= gameController.newBase(x, y);
							jsonBases.putPOJO("b0", b);
							break;
						case 1:
							y -= 200.0f;
							b= gameController.newBase(x, y);
							jsonBases.putPOJO("b1", b);
							break;
						case 2:
							x += 100.0f;
							y += 50.0f;
							b= gameController.newBase(x, y);
							jsonBases.putPOJO("b2", b);
							break;
						}
					} 
				
					json.putPOJO("player", player);
					json.putPOJO("bases", jsonBases);
					json.putPOJO("proyectiles", jsonProyectiles);
					json.put("type", "PLAYER_JOINED");
					
				} else {
					json.put("type", "GAME_COMPLETE");
				}
				session.sendMessage(new TextMessage(json.toString()));

				if (debug)
					System.out.println("[DEBUG] " + json.toString());
				break;
			case "GET_GS":
				//Recojo del cliente
				Player clientOpponent;
				Base clientOppB0,clientOppB1,clientOppB2;
				Proyectile clientProyect0, clientProyect1;
				
				clientOpponent = mapper.convertValue(node.get("player"),Player.class);
				clientOppB0 = mapper.convertValue(node.get("bases0"),Base.class);
				clientOppB1 = mapper.convertValue(node.get("bases1"),Base.class);
				clientOppB2 = mapper.convertValue(node.get("bases2"),Base.class);
				clientProyect0 = mapper.convertValue(node.get("proy0"),Proyectile.class);
				clientProyect1 = mapper.convertValue(node.get("proy1"),Proyectile.class);
				//Recojo del servidor
				Player oppUpdated =gameController.getPlayer(clientOpponent.getId());
				Base oppBase0Updated=gameController.getBase(clientOppB0.getId()); 
				Base oppBase1Updated=gameController.getBase(clientOppB1.getId()); 
				Base oppBase2Updated=gameController.getBase(clientOppB2.getId()); 
				
				//Si eres el jugador 2 coge los proyectiles
				Proyectile proyect0= null;
				Proyectile proyect1=null;
				if(clientOpponent.getId() ==0)
				{

					proyect0 =gameController.getProyectile(clientProyect0.getId()); 
					proyect1 =gameController.getProyectile(clientProyect1.getId());
				}
		
				json.putPOJO("oponente", oppUpdated);
				json.putPOJO("oppBase0", oppBase0Updated);
				json.putPOJO("oppBase1", oppBase1Updated);
				json.putPOJO("oppBase2", oppBase2Updated);
				json.putPOJO("proy0", proyect0);
				json.putPOJO("proy1", proyect1);
				
				json.put("type", "GOT_GS");
				
				break;
				
			case "GET_GAME_STATE":
				ObjectNode jsonGameState= mapper.createObjectNode();
				
				if (gameController.getPlayers().size() == 2)
				{		
					Player [] playerValues_array= new Player[gameController.getPlayers().size()];
					playerValues_array= gameController.getPlayers().toArray(new Player[0]);
					
					Player p1 = playerValues_array[0];
					Player p2= playerValues_array[1];
					jsonGameState.putPOJO("player1",p1);
					jsonGameState.putPOJO("player2", p2);
					
					Base [] basesValues_array= new Base[gameController.getBases().size()];
					basesValues_array= gameController.getBases().toArray(new Base[0]);
					
					for(int i=0; i< basesValues_array.length; i++)
					{
						jsonGameState.putPOJO("base"+i, basesValues_array[i]);
					}
					
					
					Proyectile [] proyectilesValues_array= new Proyectile[gameController.getProyectiles().size()];
					proyectilesValues_array= gameController.getProyectiles().toArray(new Proyectile[0]);
					
					for(int i=0; i< proyectilesValues_array.length; i++)
					{
						jsonGameState.putPOJO("proy"+i, proyectilesValues_array[i]);
					}
				}
				
				json.putPOJO("game_state", jsonGameState);
				json.put("type","GAME_STATE");
				session.sendMessage(new TextMessage(json.toString()));
				break;
		
			case "UPDATE_PLAYER":
				String jsonPlayer= mapper.writeValueAsString(node.get("info"));
				Player player = mapper.readValue(jsonPlayer, Player.class);
				boolean updated= gameController.updatePlayer(player);
				
				json.putPOJO("updated", updated);
				json.putPOJO("playerUpdated", player);
				json.put("type", "PLAYER_UPDATED");
				session.sendMessage(new TextMessage(json.toString()));
				break;
				
			case "UPDATE_GAME_STATE":
				Player clientPlayer = mapper.convertValue(node.get("player"),Player.class);
				
				gameController.updatePlayer(clientPlayer);
				Player opponent=null;
	
				 for(Player current : gameController.getPlayers())
				 {
					 if(current.getId() != clientPlayer.getId())
						{
							opponent= current;
							break;
						}
				 }
				 
					Base clientBase0 = mapper.convertValue(node.get("bases0"),Base.class);
					Base clientBase1 = mapper.convertValue(node.get("bases1"),Base.class);
					Base clientBase2 = mapper.convertValue(node.get("bases2"),Base.class);
					
					Base []clientBases= new Base[3];
					clientBases[0]= clientBase0;
					clientBases[1]= clientBase1;
					clientBases[2]= clientBase2;
					Base []oppBases= new Base[3];
					int oppBasesIndex= 0;
					
					boolean notFound= true;
					Base [] serverBases = new Base[gameController.getBases().size()];
					gameController.getBases().toArray(serverBases);
					
					
					for(int i=0; i< oppBases.length; i++)
					{
						oppBases[i]=null;
					}
					
					if(gameController.getBases().size() >= 6)
					{
						
						for(int i=0; i< serverBases.length; i++)
						{
							for(int j=0; j< clientBases.length; j++)
							{
								if(serverBases[i].getId() == clientBases[j].getId())
								{
									notFound=false;
									break;
								}
							}
							if(notFound== true)
							{
								oppBases[oppBasesIndex]= serverBases[i];
								oppBasesIndex++;
								if(oppBasesIndex >= oppBases.length) break;
							}
							notFound= true;
						}			
					}
					
					
				json.put("type", "GAME_STATE_UPDATED");
				json.putPOJO("serverOpponent", opponent);
				json.putPOJO("oppBase0", oppBases[0]);
				json.putPOJO("oppBase1", oppBases[1]);
				json.putPOJO("oppBase2", oppBases[2]);
				json.putPOJO("serverBase0", serverBases[0]);
				json.putPOJO("serverBase1", serverBases[1]);
				json.putPOJO("serverBase2", serverBases[2]);
				json.putPOJO("serverBase3", serverBases[3]);
				json.putPOJO("serverBase4", serverBases[4]);
				json.putPOJO("serverBase5", serverBases[5]);
				json.putPOJO("nServerBases", gameController.getBases().size());
				
				session.sendMessage(new TextMessage(json.toString()));
					break;
					
			case "UPDATE_GS":
				
				Player clientPlayer1;
				Base clientB0, clientB1, clientB2;
				Proyectile clientProy0=null, clientProy1=null;
				//Recojo del servidor
				clientPlayer1 = mapper.convertValue(node.get("player"),Player.class);
				clientB0 = mapper.convertValue(node.get("bases0"),Base.class);
				clientB1 = mapper.convertValue(node.get("bases0"),Base.class);
				clientB2 = mapper.convertValue(node.get("bases0"),Base.class);
				//recojo del servidor
				if(clientPlayer1.getId()==0)
				{
					clientProy0= mapper.convertValue(node.get("proy0"),Proyectile.class);
					clientProy1 = mapper.convertValue(node.get("proy1"),Proyectile.class);
				}
			
				//updateo en servidor
				gameController.updatePlayer(clientPlayer1);
				gameController.updateBase(clientB0);
				gameController.updateBase(clientB1);
				gameController.updateBase(clientB2);
				
				if(clientPlayer1.getId()==0)
				{
					gameController.updateProyectile(clientProy0);
					gameController.updateProyectile(clientProy1);
				}
			
				json.put("type", "UPDATED_GS");
				session.sendMessage(new TextMessage(json.toString()));
				break;
			default:
				break;
			}
		}
	}
}
