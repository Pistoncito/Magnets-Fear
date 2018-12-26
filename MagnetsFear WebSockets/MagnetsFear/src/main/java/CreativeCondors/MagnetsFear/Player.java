package CreativeCondors.MagnetsFear;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class Player {
	private long id;
	private float x;
	private float y;
	private int score;
	private int polarity;
	private boolean ready = false;
	Map <Long, Base> bases = new ConcurrentHashMap<>();
	AtomicLong nextBaseId = new AtomicLong(-1);
	int maxBases= 3;
	
	Player(){ polarity = -1; score= 0;}
		public int getScore() {
			return score;
		}
		
		public Base getBasePlayer(long id)
		{
			return bases.get(id);
		}
		
		public Collection<Base> getBasesPlayer()
		{
			return bases.values();
		}
		
		public Base newBasePlayer(float x, float y) {
			Base base = new Base();
			long id = nextBaseId.incrementAndGet();
			base.setId(id);
			base.setX(x);
			base.setY(y);
			bases.put(base.getId(), base);
			return base;
		}
		
		public void deleteBasePlayer(long id) {
			Base savedBase = bases.get(id);
			if (savedBase != null) {
				bases.remove(savedBase.getId());
			}
		}
		
		public boolean updateBasePlayer(Base b)
		{
		
			boolean isUpdated= false;
			Base current= bases.get(b.getId());
			
			System.out.println("El id de b es: " + b.getId());
			System.out.println("El id de current es: " +current.getId());
			if(current !=  null)
			{
			current.setHp(b.getHp());
			current.setX(b.getX());	
			current.setX(b.getY());	
			isUpdated=true;
			}
			return isUpdated;
		}
		
		public void setScore(int puntuacion) {
			this.score = puntuacion;
		}
		public long getId() {
			return id;
		}
		public void setId(long id) {
			this.id = id;
		}
		public int getPolarity() {
			return polarity;
		}
		public void setPolarity(int polaridad) {
			this.polarity = polaridad;
		}
		public float getX() {
			return x;
		}
		public void setX(float posicionX) {
			this.x = posicionX;
		}
		public float getY() {
			return y;
		}
		public void setY(float posicionY) {
			this.y = posicionY;
		}
		public boolean isReady() {
			return ready;
		}
		public void setReady(boolean ready) {
			this.ready = ready;
		}
		public String toString() {
			return "{\"id\":" + id + ",\"x\":" + x + ",\"y\":" + y + ",\"score\":" + score + ",\"polarity\":" + polarity + "}";
		}
		
		public int getBasesSizePlayer()
		{
			return bases.values().size();
		}
		
}