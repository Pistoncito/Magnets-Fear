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

	// Invocado una vez la negociación WebSocket haya tenido éxito y la conexión WebSocket
	// esté abierta y lista para su uso.
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}

	// Invocado después de que se haya cerrado la conexión webSocket, ó
	// después de un error de transporte.
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	// Invocado al llegar un mensaje WebSocket.
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		synchronized (sessions) {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode json = mapper.createObjectNode();

			switch (node.get("type").asText()) {
				// Un jugador intenta unirse a la partida
				case "PLAYER_WANT_JOIN":
					if (gameController.getPlayers().size() < 2) {
						Player player;
						ObjectNode jsonBases = mapper.createObjectNode();
						ObjectNode jsonProyectiles = mapper.createObjectNode();
						if (gameController.getPlayers().size() == 0) {
							player = gameController.newPlayer(100, 400);
							// Se crean proyectiles en posiciones aleatorias
							for (int i = 0; i < gameController.getMaxProyectiles(); i++) {
								switch (i) {
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
						} else {
							player = gameController.newPlayer(1280 - 100, 400);
							Proyectile[] proyectilesValues_array = new Proyectile[gameController.getProyectiles().size()];
							proyectilesValues_array = gameController.getProyectiles().toArray(new Proyectile[0]);
							jsonProyectiles.putPOJO("p0", proyectilesValues_array[0]);
							jsonProyectiles.putPOJO("p1", proyectilesValues_array[1]);
						}
	
						// Creo bases para el jugador
						for (int i = 0; i < gameController.getMaxBases(); i++) {
							Base b;
							float x = player.getX();
							float y = player.getY();
							switch (i) {
							case 0:
								x -= 100.0f;
								y += 50.0f;
								b = gameController.newBase(player, x, y);
								jsonBases.putPOJO("b0", b);
								break;
							case 1:
								y -= 200.0f;
								b = gameController.newBase(player, x, y);
								jsonBases.putPOJO("b1", b);
								break;
							case 2:
								x += 100.0f;
								y += 50.0f;
								b = gameController.newBase(player, x, y);
								jsonBases.putPOJO("b2", b);
								break;
							}
						}
						player.setReady(true);
	
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
				// Actualiza el estado del juego (jugador y proyectiles)
				case "UPDATE_GAME_STATE":
					Player clientPlayer = mapper.convertValue(node.get("player"), Player.class);
	
					gameController.updatePlayer(clientPlayer);
					Player opponent = null;
	
					for (Player current : gameController.getPlayers()) {
						if (current.getId() != clientPlayer.getId()) {
							opponent = current;
							break;
						}
					}
	
					Base clientBase0 = mapper.convertValue(node.get("bases0"), Base.class);
					Base clientBase1 = mapper.convertValue(node.get("bases1"), Base.class);
					Base clientBase2 = mapper.convertValue(node.get("bases2"), Base.class);
	
					Proyectile clientProy0 = mapper.convertValue(node.get("proy0"), Proyectile.class);
					Proyectile clientProy1 = mapper.convertValue(node.get("proy1"), Proyectile.class);
	
					ObjectNode jsonProys = mapper.createObjectNode();
	
					if (clientPlayer.getId() == 0) // updateo proyectiles
					{
						if (clientProy0 != null) {
							System.out.println("proy0 id: " + clientProy0.getId());
							System.out.println("proy0 pos: (" + clientProy0.getX() + ", " + clientProy0.getY() + ")");
							gameController.updateProyectile(clientProy0);
						}
	
						if (clientProy1 != null) {
							System.out.println("proy0 id: " + clientProy1.getId());
							System.out.println("proy0 pos: (" + clientProy1.getX() + ", " + clientProy1.getY() + ")");
							gameController.updateProyectile(clientProy1);
						}
	
					} else if (clientPlayer.getId() == 1) // Recojo del server los proyectiles
					{
	
						for (Proyectile proyect : gameController.getProyectiles()) {
							switch ((int) proyect.getId()) {
							case 0:
								jsonProys.putPOJO("proy0", proyect);
								break;
							case 1:
								jsonProys.putPOJO("proy1", proyect);
								break;
							}
						}
					}
	
					json.put("type", "GAME_STATE_UPDATED");
					json.putPOJO("serverOpponent", opponent);
					json.putPOJO("proyectiles", jsonProys);
					session.sendMessage(new TextMessage(json.toString()));
					break;
					
				//Borra los datos de la partida
				case "CLEAR_GAME":
					gameController.clearGame();
					session.sendMessage(new TextMessage(json.toString()));
					break;
			default:
				break;
			}
		}
	}
}
