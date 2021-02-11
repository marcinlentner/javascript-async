// add global variable containing XHR object
let httpRequest = new XMLHttpRequest();

// add get() function
function get(url) {
  httpRequest.open("GET", url);
  httpRequest.send();
}

function successHandler(data) {
  const dataObj = JSON.parse(data);
  const weatherDiv = document.querySelector("#weather");
  const weatherFragment = `
    <h2>${dataObj.main.temp}</h2>
  `;
  weatherDiv.innerHTML = weatherFragment;
}

document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "31b82782921c63b3313e889b892c15b6";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=castleford&appid=" +
    apiKey;

  // send request
  get(url);
  // take data and do something with it
  successHandler(httpRequest.responseText);
});
