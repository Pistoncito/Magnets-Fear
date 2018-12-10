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
				
					}
					else
					{
						player = gameController.newPlayer(1280- 100, 400);
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
					//Hago proyectiles (random positions)
					for(int i=0; i< gameController.getMaxProyectiles(); i++)
					{
						Proyectile proy = gameController.newProyectile();
						switch(i)
						{
						case 0:
							jsonProyectiles.putPOJO("p0", proy);
							break;
							
						case 1:
							jsonProyectiles.putPOJO("p1", proy);
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
				
			default:
				break;
			}
		}
	}
}
