//var locations = ['232 Hillwood Blvd, Nashville, TN 37205', '224 W Hillwood Dr, Nashville, TN 37205', '224 Wilsonia Ave, Nashville, TN 37205']

var matrix = []

function codeAll(addresses, geocodes) {
    
    //var geocodes = Array(locations.length).fill(Array(2));
    for (var i = 0; i < addresses.length; i++) {
        geo(addresses[i], i, geocodes);
    }

    //console.log(geocodes)
}


function geo(address, i, geocodes) {

    $.ajax({
        url: 'http://api.positionstack.com/v1/forward',
        data: {
            access_key: '5f2e198072a98ee5ffea4e349a121e18',
            query: address,
            fields: 'results.latitude, results.longitude',
            limit: 1
        }
    }).done(function (data) {

        geocodes[i] = [data.data[0].latitude, data.data[0].longitude]

        //console.log(address + ": " + data.data[0].latitude +", " +  data.data[0].longitude);
    });

    
}

function displayGeo(addresses) {
    var geocodes = codeAll(addresses)
    console.log(locations)
    console.log(geocodes)

    return geocodes
}


function getGeos(addresses, callback){
    if (addresses[addresses.length - 1] === ''){
        addresses.pop()
    }
    var geocodes = Array(addresses.length).fill(Array(2));
    codeAll(addresses, geocodes)

    setTimeout(function(){
        callback(geocodes)
        //console.log(geocodes)
        //console.log(matrix)

        var maxCost = document.getElementById("maxInput").value
        console.log("MAX_COST: " + maxCost)
        var cycles = algo(maxCost*60 / 1000, addresses, matrix)
        
        var geoLocations = cyclesToGeos(cycles, addresses, geocodes)


        // for (var i = 0; i < cycles.length; i++){
        //     var cycleString = 'Cycle: '
        //     var array = cycles[i].toArray()
        //     //console.log("array: " + i  + " : " + array)
        //     for (var j = 0; j < array.length; j++){
        //         cycleString += ' ' + geocodes[array[j]] + '->'
        //     }
        //     console.log(cycleString)

        // }

        console.log(geoLocations)

        callBack(geoLocations)

        var turfsDisplay = document.getElementById("count")
        turfsDisplay.innerHTML = "Number of Turfs: " + cycles.length

        


    }, 5000)
}


function cyclesToGeos(cycles, addresses, geocodes){
    var geoCycles = Array(cycles.length)
    for (var i = 0; i < cycles.length; i++){
        geoCycles[i] = cycleToGeo(cycles[i].toArray(), addresses, geocodes)
    }
    return geoCycles
}


function cycleToGeo(cycleArr, addresses, geocodes){
    var geoCycle = Array(cycleArr.length)
    for (var i = 0; i < cycleArr.length; i++){
        geoCycle[i] = [addresses[cycleArr[i]], geocodes[cycleArr[i]][0], geocodes[cycleArr[i]][1]]
    }
    return geoCycle
}



document.getElementById("readFile").addEventListener("click", function () {
    getGeos(locations, updateMatrix)
    //var geocodes = [[36.127926, -86.8621], [36.126287, -86.859309], [36.127991, -86.865669]]
    
});


function updateMatrix(geocodes){ 
    console.log(locations)
    matrix = euclidianDistMatrix(geocodes)
    //console.log(distanceMatrix)

}


function dist(lat1, lon1, lat2, lon2) {
    return Math.pow(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2), 0.5)
}

function euclidianDistMatrix(geocodes) {
    //var distanceMatrix = Array(geocodes.length).fill(Array(geocodes.length))

    var distanceMatrix = []
    var tmp = []
    for (var i = 0; i < geocodes.length; i++) {
        tmp = []
        for (var j = 0; j < geocodes.length; j++) {
            tmp.push(dist(geocodes[i][0], geocodes[i][1], geocodes[j][0], geocodes[j][1]))
            //console.log(dist(geocodes[i][0], geocodes[i][1], geocodes[j][0], geocodes[j][1]))

        }
        distanceMatrix.push(tmp)
    }

    return distanceMatrix
}



