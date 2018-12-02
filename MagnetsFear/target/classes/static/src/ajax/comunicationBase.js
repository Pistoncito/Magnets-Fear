function getNumberBases(callback)
{
    $.ajax(
        {
            method:"GET",
            url: "http://localhost:8080/bases",
            processData: false,
            headers:{
                "Content-Type": "application/json"
            }
            
        }).done(function(nBases){
            console.log(JSON.stringify(nBases) + " is the Number of bases");
            callback(nBases);
        });

}

function createBase(callback, base)
{
    $.ajax({
        method:"POST",
        url:"http://localhost:8080/bases",
        data: JSON.stringify(base),
        processData: false,
        headers:
        {
            "Content-Type": "application/json"
        }
    }).done(function(base){
        console.log("Id Base: " + JSON.stringify(base));
        callback(base);
    });
}

function getBase(callback,id)
{
    $.ajax({
        method:"GET",
        url: "http://localhost:8080/bases/" + id,
        processData:false,
        headers: 
        {
            "Content-Type": "application/json"
        }

    }).done(function(base){
    	console.log("Get base: " + JSON.stringify(base));
        callback(base);
    })

}

function updateBase(callback, base) {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:8080/bases/' + base.id,
        data: JSON.stringify(base),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (base) {
        console.log("Updated base: " + JSON.stringify(base));
        callback();
    })
}

function deleteBase(id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/bases/' + id
    }).done(function (player) {
        console.log("Deleted base " + id)
    })
}