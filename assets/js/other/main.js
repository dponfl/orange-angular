"use strict";

/*
$(document).ready(function() {
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {

      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 60
      }, 900, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
*/

/*
$(window).scroll(function() {
  $(".slideanim").each(function(){
    var pos = $(this).offset().top;

    var winTop = $(window).scrollTop();
    if (pos < winTop + 600) {
      $(this).addClass("slide");
    }
  });
});
*/

$(document).ready(function() {

  setTimeout(function () {
    $('.carousel').carousel('cycle');
  }, 3000);



  $( "body" ).on( 'click', '.link-and-scroll', function(event) {

    $('html, body').animate({
      scrollTop: 0
    }, 900);
  });


  $(".navbar a, footer a").on('click', function(event) {

    // $('html, body').scrollTop(0);

    $('html, body').animate({
      scrollTop: 0
    }, 900);

    $('.navbar-collapse').removeClass('in');
  });

/*
  setTimeout(function () {
    $(".right.carousel-control").click();
  }, 1000);
*/

/*
  setInterval(function () {
    $(".right.carousel-control").click();
  }, 3000);
*/


});