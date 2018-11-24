package CreativeCondors.MagnetsFear;
public class Player {
	private long id;
	private float x;
	private float y;
	private int polarity;
	private int score;

	Player(){}
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
}