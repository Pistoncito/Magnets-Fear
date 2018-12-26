package CreativeCondors.MagnetsFear;

import java.util.Random;

public class Proyectile {
	private long id;
	private float x;
	private float y;
	private float vx;
	private float vy;
	private int polarity;
	Random rnd = new Random();
	
	Proyectile(){
		this.polarity = -1;
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

		public float getVx() {
			return vx;
		}

		public void setVx(float vx) {
			this.vx = vx;
		}

		public float getVy() {
			return vy;
		}

		public void setVy(float vy) {
			this.vy = vy;
		}

		public int getPolarity() {
			return polarity;
		}

		public void setPolarity(int polarity) {
			this.polarity = polarity;
		}
		public String toString() {
			  return "{\"id\":" + id + ",\"x\":" + x + ",\"y\":" + y + ",\"vx\":" + vx + ",\"vy\":" + vy + ",\"polarity\":" + polarity + "}";
		}
}