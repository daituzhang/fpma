function initMap() {
  geocoder = new google.maps.Geocoder();
  var gmapCanvas = document.getElementById("gmap_canvas");
    var geocoder;
    var map;
    var mapTitle = gmapCanvas.getAttribute("data-title");
    var mapAddress = gmapCanvas.getAttribute("data-address");
    var mapContent = gmapCanvas.getAttribute("data-content");
    var div = document.createElement("div");
    div.innerHTML = mapContent;
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var myOptions = {
    zoom: 14,
    center: latlng,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
  if (geocoder) {
    geocoder.geocode({
      'address': mapAddress
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          map.setCenter(results[0].geometry.location);

          var infowindow = new google.maps.InfoWindow({
            content: '<b>'+mapTitle+'</b><br>'+mapContent,
            size: new google.maps.Size(180, 50)
          });

          var marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: mapAddress
          });
          infowindow.open(map, marker);
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });

        } else {
          alert("No results found");
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}

function setSubject() {
    $('select[name="location"]').change(function(){
        var location = $(this).val();
        $('input[name="subjectLine"]').val( 'New Contact For ' + location);
    });
}

function slides(){
  var len = $('.hero-slide').length;
  var lock = 0;
  function slideLeft() {
    lock = 1;
    var current = $('.hero-slide.active').index() - 1;
    var next = current == 0 ? len - 1 : current - 1;
    $('.hero-slide.active').addClass('right-out');
    $('.hero-slide').eq(next).addClass('active left-in');
    setTimeout(function(){
      lock = 0;
      $('.hero-slide.right-out').removeClass('right-out active');
      $('.hero-slide.left-in').removeClass('left-in');
    }, 1000);
  }
  function slideRight() {
    lock = 1;
    var current = $('.hero-slide.active').index() - 1;
    var next = current == len - 1 ? 0 : current + 1;
    $('.hero-slide.active').addClass('left-out');
    $('.hero-slide').eq(next).addClass('active right-in');
    setTimeout(function(){
      lock = 0;
      $('.hero-slide.left-out').removeClass('left-out active');
      $('.hero-slide.right-in').removeClass('right-in');
    }, 1000);
  }
  var slideLoop = setInterval(function() {
    slideRight();
  }, 5000);
  $('.hero-arrow.arrow-left').click(function(e){
    clearInterval(slideLoop);
    if(!lock){
      slideLeft();
    }
  });
  $('.hero-arrow.arrow-right').click(function(e){
    if(!lock){
      clearInterval(slideLoop);
      slideRight();
    }
  });
}

function gallery() {
    var len = $('.gallery-image-container').length;
    var lock = 0;
    function showNext(next) {
      var imageUrl = $('.gallery-image-container').eq(next).children('.gallery-image').data('url');
      $('.gallery-view').data('index',next);
      $('.gallery-view').addClass('fade');
      setTimeout(function(){
        lock = 0;
        $('.gallery-view').attr('src', imageUrl);
        $('.gallery-view').removeClass('fade');
      }, 500);
    }
    function slideLeft() {
      lock = 1;
      var current = $('.gallery-view').data('index');
      var next = current == 0 ? len - 1 : current - 1;
      showNext(next);
    }
    function slideRight() {
      lock = 1;
      var current = $('.gallery-view').data('index');
      var next = current == len - 1 ? 0 : current + 1;
      showNext(next)
    }
    $('.gallery-arrow.arrow-left').click(function(e){
      if(!lock){
        slideLeft();
      }
    });
    $('.gallery-arrow.arrow-right').click(function(e){
      if(!lock){
        slideRight();
      }
    });
    $('.gallery-image-container').click(function(e){
      $('.gallery-view-container:not(.active)').addClass('active');
      var current = $('.gallery-view').data('index');
      console.log(current);
      var next = $(this).index();
      if(!lock && current != next){
        showNext(next);
      }
    });
    $('.gallery-close').click(function(e){
      e.preventDefault();
      $('.gallery-view-container.active').removeClass('active');
    });
  }

$(document).ready(function() {
    setSubject();
    if($('#gmap_canvas').length ) {
       google.maps.event.addDomListener(window, 'load', initMap); 
    }
    slides();
    gallery();
});