package CreativeCondors.MagnetsFear;

import java.util.Collection;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class GameController {

	Map<Long, Player> players = new ConcurrentHashMap<>();
	Map <Long, Base> bases = new ConcurrentHashMap<>();
	Map <Long, Proyectile> proyectiles= new ConcurrentHashMap<>();
	
	AtomicLong nextPlayerId = new AtomicLong(-1);
	AtomicLong nextBaseId = new AtomicLong(-1);
	AtomicLong nextProyectileId = new AtomicLong(-1);
	int  maxBasesPerPlayer= 3;
	int maxProyectiles= 1;
	Random rnd = new Random();

	public int getMaxBases()
	{
		return maxBasesPerPlayer;
	}
	public int getMaxProyectiles()
	{
		return maxProyectiles;
	}
	public Collection<Player> getPlayers() {
		return players.values();
	}
	public Collection<Base> getBases() {
		return bases.values();
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

	public Base newBase(float x, float y) {
		Base base = new Base();
		long id = nextBaseId.incrementAndGet();
		base.setId(id);
		base.setX(x);
		base.setY(y);
		bases.put(base.getId(), base);
		return base;
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
	public void deleteBase(long id) {
		Base savedBase = bases.get(id);
		if (savedBase != null) {
			players.remove(savedBase.getId());
		}
	}
	
	public boolean updatePlayer(Player p)
	{
		Player savedPlayer= players.get(p.getId());
		if(savedPlayer !=null)
		{
			savedPlayer.setX(p.getX());
			savedPlayer.setY(p.getY());
			savedPlayer.setPolarity(p.getPolarity());
			savedPlayer.setScore(p.getScore());
			return true;
		}
		return false;
	}
	public boolean updateBase(Base b)
	{
		Base savedBase= bases.get(b.getId());
		if(savedBase !=null)
		{
			savedBase.setX(b.getX());
			savedBase.setY(b.getY());
			return true;
		}
		return false;
	}
	
}
