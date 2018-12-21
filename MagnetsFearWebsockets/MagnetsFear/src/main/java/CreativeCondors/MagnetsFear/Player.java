package CreativeCondors.MagnetsFear;
public class Player {
	private long id;
	private float x;
	private float y;
	private int score;
	private int polarity;
	private boolean ready = false;

	Player(){ polarity = -1; score= 0;}
		public int getScore() {
			return score;
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
}