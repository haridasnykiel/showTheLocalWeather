$(document).ready(function(){
  var geocoder = new google.maps.Geocoder();
  var long = 0.000;
  var lat = 0.000;
  var city = "";
  var country = "";
  var locationInfo = [];
  var count = 1;

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
    if(count == 1) {
      $.getJSON( "http://api.openweathermap.org/data/2.5/weather?q=" + city + ',' + country + "&APPID=9334f947893792dcb9b2e2c05ae23eb0",  function( data ) {
        $('#temp').html(Math.round(data.main.temp-273)+ ' degrees Celsius');
        // console.log(data.main.temp);

      });
      $(this).html("Celsius");
      count = 2;
      console.log(count);

      $(".container").animate({
        backgroundColor:'#e6fffa',
        color:'#006652',
        borderBottomColor:'#004d3d',
        borderLeftColor:'#004d3d',
        borderRightColor:'#004d3d',
        borderTopColor:'#004d3d'

      }, 500);
    } else if(count == 2) {
      $(this).html("Fahrenheit");
      var Celcius = $("#temp").html().match(/\d/g).join('');
      var Fahrenheit = parseInt(Celcius * 1.8 + 32);
      $("#temp").html(Fahrenheit + " degrees Fahrenheit");
      count = 1;

      $(".container").animate({
        backgroundColor:'#e6ffff',
        color:'#006666',
        borderBottomColor:'#003333',
        borderLeftColor:'#003333',
        borderRightColor:'#003333',
        borderTopColor:'#003333'

      }, 500);
    }



  });

  // data.main.temp-273




});
