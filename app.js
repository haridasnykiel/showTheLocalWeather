$(document).ready(function(){
  var geocoder = new google.maps.Geocoder();
  var long = 0.000;
  var lat = 0.000;
  var city = "";
  var country = "";
  var locationInfo = [];

  if (navigator.geolocation) {

  navigator.geolocation.getCurrentPosition(function(position) {

    lat = position.coords.latitude;
    long = position.coords.longitude;
    $('#location').val(lat + "," + long);
    geocodeLatLng(geocoder);
  });

  } else {
    $('#temp').html('Geolocation is not available for the browser you are using');
  }

  function geocodeLatLng(geocoder) {
    var input = $('#location').val();
    var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    console.log(latlng);
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
          $('#location').html(results[1].formatted_address);
          locationInfo = results[1].formatted_address.split(',');
          country = locationInfo[2].replace(/ /g,'');
          city = locationInfo[0];
          console.log(country + ' ' + city);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  $('.main-button').on('click', function() {
    $.getJSON( "http://api.openweathermap.org/data/2.5/weather?q=" + city + ',' + country + "&APPID=9334f947893792dcb9b2e2c05ae23eb0",  function( data ) {
      $('#temp').html(Math.round(data.main.temp-273)+ ' degrees Celcius');
      console.log(data.main.temp);

    });
  });

  // data.main.temp-273




});
