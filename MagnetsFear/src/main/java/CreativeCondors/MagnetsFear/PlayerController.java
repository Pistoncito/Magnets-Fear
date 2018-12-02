package CreativeCondors.MagnetsFear;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/players")
public class PlayerController {
	Map<Long, Player> players = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);

	@GetMapping
	public int numberPlayers() {
		return players.size();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public long newPlayer(@RequestBody Player player) {
		long id = nextId.incrementAndGet();
		player.setId(id);
		players.put(player.getId(), player);

		return player.getId();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Player> getPlayer(@PathVariable long id) {
		Player savedPlayer = players.get(id);
		if (savedPlayer != null) {
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Player> actualizaJugador(@PathVariable long id, @RequestBody Player playerUpdated) {

		Player savedPlayer = players.get(playerUpdated.getId());

		if (savedPlayer != null) {

			players.put(id, playerUpdated);

			return new ResponseEntity<>(playerUpdated, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Player> borraJugador(@PathVariable long id) {

		Player savedPlayer = players.get(id);

		if (savedPlayer != null) {
			players.remove(savedPlayer.getId());
			nextId.decrementAndGet();

			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}