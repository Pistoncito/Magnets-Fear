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
@RequestMapping("/proyectiles")
public class ProyectileController {
	Map<Long, Proyectile> proyectiles = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(-1);

	@GetMapping
	public int numberProyectiles() {
		return proyectiles.size();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Proyectile newProyectile() {
		Proyectile proyectile = new Proyectile();
		long id = nextId.incrementAndGet();
		proyectile.setId(id);
		proyectiles.put(proyectile.getId(), proyectile);
		return proyectile;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Proyectile> getProyectile(@PathVariable long id) {
		Proyectile savedProyectile = proyectiles.get(id);
		if (savedProyectile != null) {
			return new ResponseEntity<>(savedProyectile, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Proyectile> updateProyectile(@PathVariable long id, @RequestBody Proyectile proyectileUpdated) {

		Proyectile savedProyectile = proyectiles.get(proyectileUpdated.getId());

		if (savedProyectile != null) {

			proyectiles.put(id, proyectileUpdated);

			return new ResponseEntity<>(proyectileUpdated, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Proyectile> deleteProyectile(@PathVariable long id) {

		Proyectile savedProyectile = proyectiles.get(id);

		if (savedProyectile != null) {
			proyectiles.remove(savedProyectile.getId());
			nextId.decrementAndGet();
			
			return new ResponseEntity<>(savedProyectile, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}