package CreativeCondors.MagnetsFear;

import java.util.Collection;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class GameController {

	Map<Long, Player> players = new ConcurrentHashMap<>();
	Map<Long, Proyectile> proyectiles = new ConcurrentHashMap<>();

	AtomicLong nextPlayerId = new AtomicLong(-1);
	AtomicLong nextProyectileId = new AtomicLong(-1);

	int maxBasesPerPlayer = 3;
	int maxProyectiles = 2;
	Random rnd = new Random();

	public int numPlayers() {
		return players.size();
	}
	
	public int numProyectiles() {
		return proyectiles.size();
	}
		
	public int getMaxBases() {
		return maxBasesPerPlayer;
	}

	public int getMaxProyectiles() {
		return maxProyectiles;
	}

	public Collection<Player> getPlayers() {
		return players.values();
	}

	public Collection<Base> getBases(Player p) {
		return p.getBasesPlayer();
	}

	public Collection<Proyectile> getProyectiles() {
		return proyectiles.values();
	}

	public Player newPlayer(float x, float y) {
		Player player = new Player();
		long id = nextPlayerId.incrementAndGet();
		player.setId(id);
		player.setX(x);
		player.setY(y);
		players.put(player.getId(), player);
		return player;
	}

	public Base newBase(Player p, float x, float y) {
		Player player = players.get(p.getId());
		return player.newBasePlayer(x, y);
	}

	public Proyectile newProyectile() {
		Proyectile proyectile = new Proyectile();
		long id = nextProyectileId.incrementAndGet();
		proyectile.setId(id);
		proyectiles.put(proyectile.getId(), proyectile);
		return proyectile;
	}

	public void deletePlayer(long id) {
		Player savedPlayer = players.get(id);
		if (savedPlayer != null) {
			players.remove(savedPlayer.getId());
		}
	}

	public void deleteBase(Player p, long id) {
		Player player = players.get(p.getId());
		player.deleteBasePlayer(id);
	}

	public void deleteProyectile(long id) {
		Proyectile proyectile = proyectiles.get(id);
		if(proyectile != null) {
			proyectiles.remove(id);
		}
	}
	
	public boolean updatePlayer(Player p) {
		Player savedPlayer = players.get(p.getId());
		if (savedPlayer != null) {
			savedPlayer.setX(p.getX());
			savedPlayer.setY(p.getY());
			savedPlayer.setPolarity(p.getPolarity());
			savedPlayer.setScore(p.getScore());
			return true;
		}
		return false;
	}

	public boolean updateBase(long playerId, Base b) {
		Player p = players.get(playerId);
		if (p != null) {
			return p.updateBasePlayer(b);
		} else {
			System.out.println("El id del jugador da null");
			return false;
		}
	}

	public boolean updateProyectile(Proyectile p) {
		Proyectile savedproy = proyectiles.get(p.getId());
		if (savedproy != null) {
			savedproy.setX(p.getX());
			savedproy.setY(p.getY());
			savedproy.setPolarity(p.getPolarity());
			return true;
		}
		return false;
	}

	public Player getPlayer(long id) {
		return players.get(id);
	}

	public Proyectile getProyectile(long id) {
		return proyectiles.get(id);
	}

	public int getBasesSize(Player p) {
		Player player = players.get(p.getId());
		return player.getBasesSizePlayer();
	}
	
	public void clearGame()
	{
		for(Player p: players.values())
		{
			p.clearPlayer();
		}
		this.players.clear();
		this.proyectiles.clear();
		
		this.nextPlayerId = new AtomicLong(-1);
		this.nextProyectileId = new AtomicLong(-1);
	}
	
}
