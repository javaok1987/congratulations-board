"use strict";function initMap(){GMap=new google.maps.Map(document.getElementById("map"),{zoom:8,center:{lat:-34.397,lng:150.644}});var c=new google.maps.Geocoder;$.ajax({url:"https://randomuser.me/api/?results=5",dataType:"json",success:function(e){var t=!0,o=!1,n=void 0;try{for(var a,r=e.results[Symbol.iterator]();!(t=(a=r.next()).done);t=!0){var i=a.value,s=i.location,l=s.city+" "+s.state+" "+s.street;geocodeAddress(c,GMap,i,l)}}catch(e){o=!0,n=e}finally{try{!t&&r.return&&r.return()}finally{if(o)throw n}}}}),setInterval(function(){showMarker(markerAry[getRandomNo()])},5e3)}function createMarker(o,n){var a=document.createElement("canvas"),r=a.getContext("2d"),i=new Image;return i.src=o.picture.large,i.setAttribute("crossOrigin","Anonymous"),i.onload=function(){a.width=i.width,a.height=i.height,r.save(),r.beginPath(),r.arc(i.width/2,i.height/2,i.width/2,0,2*Math.PI,!0),r.lineWidth=2,r.strokeStyle="#427FE1",r.stroke(),r.closePath(),r.clip(),r.drawImage(i,0,0,i.width,i.height),r.beginPath(),r.arc(0,0,i.width/2,0,2*Math.PI,!0),r.clip(),r.closePath(),r.restore();var e={url:a.toDataURL(),scaledSize:new google.maps.Size(50,50),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(0,0)},t=new google.maps.Marker({position:{lat:n.lat(),lng:n.lng()},name:o.title+". "+o.name+" "+o.name,message:"registered: "+o.registered,animation:google.maps.Animation.DROP,icon:e});markerAry.push(t)},markerAry}function getRandomNo(){return Math.floor(Math.random()*markerAry.length)}function showMarker(e){GMap.panTo(e.getPosition()),e.setMap(GMap),e.setAnimation(google.maps.Animation.DROP);var t=document.createElement("div");t.classList.add("infowindow"),t.innerHTML="<div>"+e.message+"</div>",window.infowindow.setContent(t),setTimeout(function(){window.infowindow.open(GMap,e),window.infowindow.setPosition(e.getPosition())},500),setTimeout(function(){e.setMap(null)},5e3)}function geocodeAddress(e,o,n,t){e.geocode({address:t},function(e,t){"OK"===t?(o.setCenter(e[0].geometry.location),createMarker(n,e[0].geometry.location)):alert("Geocode was not successful for the following reason: "+t)})}var markerAry=[],GMap=void 0;