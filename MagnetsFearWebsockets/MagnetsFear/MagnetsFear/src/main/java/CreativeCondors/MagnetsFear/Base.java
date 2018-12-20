package CreativeCondors.MagnetsFear;



public class Base {
	private long id;
	private float x;
	private float y;
	private int hp;

	Base(){
		hp=1;
	}
		public long getId() {
			return id;
		}
		public void setId(long id) {
			this.id = id;
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
		
		public void setHp(int newHp)
		{
			hp =newHp;
		}
		public int getHp()
		{
			return hp;
		}
		public String toString() {
			return "{\"id\":" + id + ",\"x\":" + x + ",\"y\":" + y + ",\"hp\":" + hp + "}";
		}
}