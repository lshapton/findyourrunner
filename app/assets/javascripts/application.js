// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


var findRunner = {};

var mapStyle = [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}]

findRunner.loadMap = function(lat, lng) {

  console.log(lat);
  console.log(lng);

  var mapOptions = {
    center: { lat: lat, lng: lng},
    zoom: 15,
    styles: mapStyle
  };

  var mapCanvas = $('.map')[0];

  findRunner.map = new google.maps.Map(mapCanvas, mapOptions);

}; 

findRunner.loadRunners = function(lat, lng) {

  var runner = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: findRunner.map, // notice how we pass it the map we made earlier? This is how it knows which map to put the marker on
    icon : 'http://labs.google.com/ridefinder/images/mm_20_purple.png'
  });
  

};


$(function() {
  // Runner's position
  navigator.geolocation.getCurrentPosition(function(position) {
    findRunner.loadMap(position.coords.latitude, position.coords.longitude);
    findRunner.loadRunners(position.coords.latitude, position.coords.longitude);

    $.ajax({
        url: '/runners/1',
        type: "put",
        dataType: "script",
        data: { 
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          _method: 'put'
        }
    });

    console.log("saved?");

    }, 
    function(err){
      alert('there is an error');
  });

}); // end doc ready



