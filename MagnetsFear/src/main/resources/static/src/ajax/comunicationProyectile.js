function createProyectile(callback) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/proyectiles',
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        console.log("Proyectile created: " + JSON.stringify(data));
        callback(data);
    })
}

function numberProyectiles(callback){
    $.ajax({
        method: "GET",
        url: 'http://localhost:8080/proyectiles',
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (numProyectiles) {
        console.log("Info Received" + JSON.stringify(numProyectiles));
        callback(numProyectiles);
    })
}

function getProyectile(callback, id){
    $.ajax({
        method: "GET",
        url: 'http://localhost:8080/proyectiles/' + id,
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (proyectile) {
        console.log("Info Received" + JSON.stringify(proyectile));
        callback(proyectile);
    })
}

function updateProyectile(proyectile) {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/proyectiles/' + proyectile.id,
        data: JSON.stringify(proyectile),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (proyectile) {
        console.log("Updated proyectile: " + JSON.stringify(proyectile))
    })
}

function deleteProyectile(id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/proyectiles/' + id
    }).done(function (proyectile) {
        console.log("Deleted proyectile " + id)
    })
}