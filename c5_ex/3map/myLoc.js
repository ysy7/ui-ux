/* myLoc.js */

//추가3 
var map = null;

var ourCoords =  {
   latitude: 47.624851,
   longitude: -122.52099
};

window.onload = getMyLocation;

function getMyLocation() {
   if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
         displayLocation, 
         displayError);
   }
   else {
      alert("이런, 지오로케이션이 제공되지 않네요");
   }
}

function displayLocation(position) {
   var latitude = position.coords.latitude;
   var longitude = position.coords.longitude;

   var div = document.getElementById("location");
   div.innerHTML = "당신은 위도: " + latitude + ", 경도: " + longitude + "에 있습니다";

   var km = computeDistance(position.coords, ourCoords);
   var distance = document.getElementById("distance");
   distance.innerHTML = "당신은 WickedlySmart HQ와 " + km + "km 떨어져 있습니다";
   // 추가2
   showMap(position.coords);
}
// --------------------- 준비 코드 시작 ------------------
//
// 구면 코사인 법칙으로 두 위도/경도 지점의 거리를 구함
//
function computeDistance(startCoords, destCoords) {
   var startLatRads = degreesToRadians(startCoords.latitude);
   var startLongRads = degreesToRadians(startCoords.longitude);
   var destLatRads = degreesToRadians(destCoords.latitude);
   var destLongRads = degreesToRadians(destCoords.longitude);

   var Radius = 6371; // radius of the Earth in km
   var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * Radius;

   return distance;
}

function degreesToRadians(degrees) {
   radians = (degrees * Math.PI)/180;
   return radians;
}

// ------------------ 준비 코드 종료 -----------------



//추가1
function showMap(coords) {
   var googleLatAndLong = new google.maps.LatLng(coords.latitude, 
   coords.longitude);
   var mapOptions = {
      zoom: 10, 
      center: googleLatAndLong, 
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   var mapDiv = document.getElementById("map");
   map = new google.maps.Map(mapDiv, mapOptions);
}








function displayError(error) {
   var errorTypes = {
      0: "알려지지 않은 에러",
      1: "사용자가 권한 거부",
      2: "위치를 찾을 수 없음",
      3: "요청 응답 시간 초과"
   };
   var errorMessage = errorTypes[error.code];
   if (error.code == 0 || error.code == 2) {
      errorMessage = errorMessage + " " + error.message;
   }
   var div = document.getElementById("location");
   div.innerHTML = errorMessage;
}
