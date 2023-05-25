/* myLoc.js */


window.onload = getMyLocation;

//추가1
function getMyLocation(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      displayLocation,
      displayError);
    
  }
  else{
    alert("이런, 지오로케이션이 제공되지 않네요");
    
  }
}

//추가2
function displayLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  var div = document.getElementById("location");
  div.innerHTML = "당신은 위도: "
  + latitude + ", 경도: " + longitude + "에 있습니다.";
}

//추가3
function displayError(error){
  var errorTypes = {
    0: "알려지지 않은 에러",
    1: "사용자가 권한 거부",
    2: "위치를 찾을 수 없음",
    3: "요청 응답 시간 초과"
  };

  var errorMessage = errorTypes[error.code];
  if (error.code == 0 || error.code == 2) {
    errorMessage = errorMessage + " " + error.errorMessage;

  }
  var div = document.getElementById("location");
  div.innerHTML = errorMessage;


}
