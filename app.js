$(document).ready(function(){
  var geocoder = new google.maps.Geocoder();
  var long = 0.000;
  var lat = 0.000;
  var city = "";
  var country = "";
  var locationInfo = [];
  var count = 1;
  var Fahrenheit = 0;
  var Celcius = 0;

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
          country = locationInfo[1].replace(/ /g,'');
          city = locationInfo[0];
          console.log(country + ' ' + city);

          $.getJSON( "http://api.openweathermap.org/data/2.5/weather?q=" + city + ',' + country + "&APPID=9334f947893792dcb9b2e2c05ae23eb0",  function( data ) {
            Celcius = Math.round(data.main.temp-273);

          });

        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  $('.main-button').on('click', function() {
    var styles = {
      background: 'url(./images/summer.jpg) center center fixed',
      opacity: 0.9
    };
    if(Celcius >= 20) {
      console.log("here");
      $("html").css(styles);
      $("h1").animate({
        color: "#666600",
        padding: 7,
        opacity: 1
      }, 500);
      $(".main").css({border: '0 solid #ffff00'}).animate({backgroundColor: "#ffffb3", borderWidth: 4}, 500);
      $(".container").animate({
        color:'#666600',
        height: '18em',
        opacity: 0.8

      }, 500);

    } else if (Celcius <= 19 && Celcius >= 15) {

      var stylesSpring = {
        background: 'url(./images/spring.jpg) center center fixed',
        opacity: 0.9
      };
      $("html").css(stylesSpring);
      $("h1").animate({
        color: "#008000",
        padding: 7,
        opacity: 1
      }, 500);
      $(".main").css({border: '0 solid #42ff45'}).animate({backgroundColor: "#adffae", borderWidth: 4}, 500);
      $(".container").animate({
        color:'#008000',
        height: '18em',
        opacity: 0.8

      }, 500);
    } else if (Celcius <= 14 && Celcius >= 7) {

      var stylesAutumn = {
        background: 'url(./images/Autumn.jpg) center center fixed',
        opacity: 0.9
      };
      $("html").css(stylesAutumn);
      $("h1").animate({
        color: "#994d00",
        padding: 7,
        opacity: 1
      }, 500);
      $(".main").css({border: '0 solid #f37736'}).animate({backgroundColor: "#ffcc99", borderWidth: 4}, 500);
      $(".container").animate({
        color:'#994d00',
        height: '18em',
        opacity: 0.8

      }, 500);
    } else if (Celcius <= 6) {

      var stylesWinter = {
        background: 'url(./images/winter.jpg) center center fixed',
        opacity: 0.9
      };
      $("html").css(stylesWinter);
      $("h1").animate({
        color: "#0059b3",
        padding: 7,
        opacity: 1
      }, 500);
      $(".main").css({border: '0 solid #0015ff'}).animate({backgroundColor: "#99ccff", borderWidth: 4}, 500);
      $(".container").animate({
        color:'#0059b3',
        height: '18em',
        opacity: 0.8

      }, 500);
    }


    if(count == 1) {
      $('#temp').html(Celcius + ' degrees Celsius');
      $(this).html("Fahrenheit");
      count = 2;
      console.log(count);
    } else if(count == 2) {
      $(this).html("Celsius");
      Celcius = $("#temp").html().match(/\d/g).join('');
      Fahrenheit = parseInt(Celcius * 1.8 + 32);
      $("#temp").html(Fahrenheit + " degrees Fahrenheit");
      count = 1;
    }

  });

});
