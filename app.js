//import {Client} from "@googlemaps/google-maps-services-js";

const GoogleDistanceApi = require('google-distance-api');
const locations = ['3435 Amanda Ave, Nashville TN 37215', '1615 Woodmont Blvd Nashville, TN 37215', '1700 Woodmont Blvd Nashville, TN 37215', '1715 Woodmont Blvd Nashville, TN 37215'];
const options = {
  key: 'AIzaSyCWW5D0l2MdXfBzw4kZkq4oCuEeyCvxb8E',
  origins: locations,
  //origins: [],

  //origins: ['-86.800949,36.14405', 'Nashville, U'],
  destinations: locations,
  mode: 'walking'
}


const data  = GoogleDistanceApi.distance(options, (err, data) => {
    if(err) {
        return console.log(err);
    }

    console.log(data[0].durationValue);

    var count = 0;
    for (var i = 0; i < locations.length; i++){
      var tmp = new Array(locations.length);
      for (var j = 0; j < locations.length; j++){
        //console.log(costMatrix);
        tmp[j] = data[count].durationValue;
        //console.log(data[count].durationValue);
        //costMatrix[i][j] = data[count].durationValue;
        count++;
        //console.log(tmp);
      }
      //console.log(tmp);
      costMatrix[i] = tmp;
      //console.log(costMatrix);
    }
    //console.log(costMatrix);

    other();
});

function other(){
  console.log(costMatrix);
}

var costMatrix = new Array(locations.length);


console.log("outside");
console.log(costMatrix);
//console.log(data);
