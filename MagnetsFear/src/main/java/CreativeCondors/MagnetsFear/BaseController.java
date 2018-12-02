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
@RequestMapping("/bases")
public class BaseController {
	Map<Long, Base> bases = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(-1);

	@GetMapping
	public int numberBases() {
		return bases.size();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public long createBases(@RequestBody Base clientBase) {
		Base base = new Base();
		long id = nextId.incrementAndGet();
		base.setId(id);
		base.setX(clientBase.getX());
		base.setY(clientBase.getY());
		bases.put(base.getId(), base);
		return id;
	}

	@GetMapping("/{id}")
	public ResponseEntity<Base> getBase(@PathVariable long id) {
		Base savedBase = bases.get(id);
		if (savedBase != null) {
			return new ResponseEntity<>(savedBase, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Base> updateBase(@PathVariable long id, @RequestBody Base baseUpdated) {

		Base savedBase = bases.get(baseUpdated.getId());

		if (savedBase != null) {

			bases.put(id, baseUpdated);

			return new ResponseEntity<>(baseUpdated, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Base> deleteBase(@PathVariable long id) {

		Base savedBase = bases.get(id);

		if (savedBase != null) {
			bases.remove(savedBase.getId());
			nextId.decrementAndGet();

			return new ResponseEntity<>(savedBase, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
