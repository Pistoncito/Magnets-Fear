
function getNumberBases(callback)
{
    $.ajax(
        {
            method:"GET",
            url: "http://localhost:8080/bases",
            processData: false,
            header:{
                "Content-Type": "application/json"
            }
            
        }).done(function(nBases){
            console.log(JSON.stringify(nBases) + " is the Number of bases");
            callback(nBases);
        });

}

function createBases(callback)
{
    $.ajax({
        method:"POST",
        url:"http://localhost:8080/bases",
        processData: false,
        header:
        {
            "Content-Type": "application/json"
        }
    }).done(function(nBases){
        console.log(JSON.stringify(nBases) +" bases created");
        callback(nBases);
    });
}

function getBase(callback,id)
{
    $.ajax({
        method:"GET",
        url: "http://localhost:8080/bases/" + id,
        processData:false,
        header: 
        {
            "Content-Type": "application/json"
        }

    }).done(function(base){
    console.log("Get base: " + JSON.stringify(base));
        callback(base);
    })

}
