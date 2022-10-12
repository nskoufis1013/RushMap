function callBack(locations) {
    // Locations Array
  
    // var locations = [
    //   [['801 S Hope St A, Los Angeles, CA 90017', 34.046438, -118.25965],
    //    ['525 Santa Monica Blvd, Santa Monica, CA 90401', 34.017951, -118.493567]],
  
    //   [['146 South Lake Avenue #106, At Shoppers Lane, Pasadena, CA 91101', 34.143073, -118.132040],
    //    ['21016 Pacific Coast Hwy, Huntington Beach, CA 92648', 33.655199, -117.998640]],
  
    //   [['13005 Ventura Blvd, Studio City, CA 91604', 34.145670, -118.416730]]
    // ]
  
  var k, t;
  for (k = 0; k < locations.length; k++){
    for (t = 0; t < locations[k].length; t++){
      geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address: locations[k][t][0]
        }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                //console.log(results[0].geometry.location.lat());
                //console.log(results[0].geometry.location.lng());
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
  }
  
    initMap(locations);
  }
  
  function initMap(locationsArray) {
    // The locations array in a particular format
    var locations = locationsArray;
  
    // The array of url's for different icons
    var urls = ["http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png", 
                "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
                ]
  
  
      // Create the map
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(36.125, -86.865),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
  
      // Infowindow for when one clicks on the marker
      var infowindow = new google.maps.InfoWindow();
  
      var marker, i, j;
      for (i = 0; i < locations.length; i++)
      {
        for (j = 0; j < locations[i].length; j++) {
  
          // Addidng a marker
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][j][1], locations[i][j][2]),
            map: map,
            icon: {
              url: urls[i % urls.length],
            }
          });
  
          // Adding a listener so that some stuff pops up when you click the marker
          google.maps.event.addListener(marker, 'click', (function(marker, i, j) {
            return function() {
              infowindow.setContent(locations[i][j][0]);
              infowindow.open(map, marker);
            }
          })(marker, i, j));
        }
      }
  }