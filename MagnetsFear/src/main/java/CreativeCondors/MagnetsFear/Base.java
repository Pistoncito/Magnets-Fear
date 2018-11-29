package CreativeCondors.MagnetsFear;

import java.util.Random;

public class Base {
	private long id;
	private float x;
	private float y;
	Base(){
		this.x = new Random().nextInt(1180)+100;
		this.y = new Random().nextInt(620)+100;
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
