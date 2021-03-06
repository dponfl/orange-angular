"use strict";

function camelDriveMaps() {

  // var mapProp01 = {
  //   center: {lat: 34.747895, lng: 32.425499},
  //   zoom:15,
  // };


  var mapProp02 = {
    center: {lat: 34.823686, lng: 32.390973},
    zoom:15,
  };


  // var map01=new google.maps.Map(document.getElementById("cameldrive01"),mapProp01);

  var map02=new google.maps.Map(document.getElementById("orange02"),mapProp02);

  // var marker01 = new google.maps.Marker({
  //   position:mapProp01.center,
  //   map: map01,
  //   animation:google.maps.Animation.BOUNCE,
  //   // icon: "../images/camel-logo-355x355.png",
  // });

  var marker02 = new google.maps.Marker({
    position:mapProp02.center,
    map: map02,
    animation:google.maps.Animation.BOUNCE,
  });

  // var infowindow01 = new google.maps.InfoWindow({
  //   content:"<h4>Orange Holiday Villas, Office 1</h4>" +
  //   "<h5></h5>" +
  //   "<h6>Часы работы/Working hours: 09:00 - 19:00</h6>"
  // });

  var infowindow02 = new google.maps.InfoWindow({
    content:"<h4>Orange Holiday Villas</h4>" +
    "<h5>Часы работы:</h5>" +
    "<h6>пн-сб: 09:00 - 18:00</h6>" +
    "<h6>вс: выходной</h6>" +
    "<h5>Working hours:</h5>" +
    "<h6>Monday - Saturday: 09:00 - 18:00</h6>" +
    "<h6>Sunday: day off</h6>"
  });

  // google.maps.event.addListener(marker01, 'click', function() {
  //   infowindow01.open(map01,marker01);
  // });

  google.maps.event.addListener(marker02, 'click', function() {
    infowindow02.open(map02,marker02);
  });

} // camelDriveMaps
