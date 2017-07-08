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
          console.log(locationInfo);

          $.getJSON("https://thingproxy.freeboard.io/fetch/https://api.darksky.net/forecast/169c7f8aff478c449a3d6d2c16dc0a8b/"+ lat +","+ long ,  function( data ) {
            Fahrenheit = Math.round(data.currently.temperature);
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
    if(Fahrenheit >= 68) {
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

    } else if (Fahrenheit <= 66 && Fahrenheit >= 59) {

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
    } else if (Fahrenheit <= 57 && Fahrenheit >= 44) {

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
    } else if (Fahrenheit <= 42) {

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
      $('#temp').html(Fahrenheit + ' degrees Fahrenheit');
      $(this).html("Celsius");
      count = 2;
      console.log(Fahrenheit);
    } else if(count == 2) {
      $(this).html("Fahrenheit");
      Fahrenheit = $("#temp").html().match(/\d/g).join('');
      Celcius = parseInt((Fahrenheit - 32) / 1.8);
      $("#temp").html(Celcius + " degrees Celcius");
      count = 1;
    }

  });

});
