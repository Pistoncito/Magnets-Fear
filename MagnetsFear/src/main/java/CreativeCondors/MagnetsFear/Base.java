package CreativeCondors.MagnetsFear;

import java.util.Random;

public class Base {
	private long id;
	private float x;
	private float y;
	Random rnd = new Random();


	Base(){
		this.x = rnd.nextInt(1180)+100;
		this.y = rnd.nextInt(620)+100;
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