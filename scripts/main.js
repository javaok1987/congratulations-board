let markerAry = [];
let GMap;

function initMap() {

  GMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {
      lat: -34.397,
      lng: 150.644
    }
  });

  const geocoder = new google.maps.Geocoder();

  $.ajax({
    url: 'https://randomuser.me/api/?results=5',
    dataType: 'json',
    success: function(data) {
      for (let user of data.results) {
        const location = user.location;
        const address = `${location.city} ${location.state} ${location.street}`;
        geocodeAddress(geocoder, GMap, user, address);
      }
    }
  });

  setInterval(function() {
    showMarker(markerAry[getRandomNo()]);
  }, 5000);

}


function createMarker(data, latlng) {
  const tmpCanvas = document.createElement('canvas'),
    tmpCtx = tmpCanvas.getContext('2d'),
    thumbImg = new Image();

  thumbImg.src = data.picture.large;
  thumbImg.setAttribute('crossOrigin', 'Anonymous')


  thumbImg.onload = function() {

    //圖片加載完，再draw 和 toDataURL
    tmpCanvas.width = thumbImg.width;
    tmpCanvas.height = thumbImg.height;

    // draw the cached images to temporary canvas and return the context
    tmpCtx.save();
    tmpCtx.beginPath();
    tmpCtx.arc(thumbImg.width / 2, thumbImg.height / 2, thumbImg.width / 2, 0, Math.PI * 2, true);

    tmpCtx.lineWidth = 2;
    tmpCtx.strokeStyle = '#427FE1';
    tmpCtx.stroke();

    tmpCtx.closePath();
    tmpCtx.clip();

    tmpCtx.drawImage(thumbImg, 0, 0, thumbImg.width, thumbImg.height);

    tmpCtx.beginPath();
    tmpCtx.arc(0, 0, thumbImg.width / 2, 0, Math.PI * 2, true);
    tmpCtx.clip();
    tmpCtx.closePath();

    tmpCtx.restore();

    const icon = {
      url: tmpCanvas.toDataURL(), // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    const marker = new google.maps.Marker({
      position: {
        lat: latlng.lat(),
        lng: latlng.lng()
      },
      name: `${data.title}. ${data.name} ${data.name}`,
      message: `registered: ${data.registered}`,
      animation: google.maps.Animation.DROP,
      icon: icon
    });
    markerAry.push(marker);

  };
  return markerAry;
};

// 亂數.
function getRandomNo() {
  return Math.floor(Math.random() * markerAry.length);
}

function showMarker(marker) {
  GMap.panTo(marker.getPosition());

  marker.setMap(GMap);
  marker.setAnimation(google.maps.Animation.DROP);

  const boxText = document.createElement("div");
  boxText.classList.add('infowindow');
  boxText.innerHTML = `<div>${marker.message}</div>`;

  window.infowindow.setContent(boxText);

  setTimeout(function() {
    window.infowindow.open(GMap, marker);
    window.infowindow.setPosition(marker.getPosition())
  }, 500);


  setTimeout(function() {
    marker.setMap(null);
  }, 5000);

}

function geocodeAddress(geocoder, resultsMap, user, address) {
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      createMarker(user, results[0].geometry.location)
      // var marker = new google.maps.Marker({
      //   map: resultsMap,
      //   position: results[0].geometry.location
      // });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
