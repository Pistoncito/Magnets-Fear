package CreativeCondors.MagnetsFear;

import java.util.Random;

public class Proyectile {
	private long id;
	private float x;
	private float y;
	Random rnd = new Random();
	
	Proyectile(){
		this.x = rnd.nextInt(1280)+1;
		this.y = rnd.nextInt(720)+1;
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
}