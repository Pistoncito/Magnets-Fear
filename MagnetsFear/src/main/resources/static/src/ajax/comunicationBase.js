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