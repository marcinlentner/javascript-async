/*
 * JavaScript callback for retrieving data asynchronously.
 * Deal with failed callback.
 */

// instantiate object request
let httpRequest = new XMLHttpRequest();

// open connection, prepare success handler, send request
function get(url, success, fail) {
  httpRequest.open("GET", url);
  httpRequest.onload = function () {
    if (httpRequest.status === 200) {
      success(httpRequest.responseText);
    } else {
      fail(httpRequest.status);
    }
  };
  httpRequest.send();
}

// deal with data after asynchronous function returns
function successHandler(data) {
  const dataObj = JSON.parse(data);
  const weatherDiv = document.querySelector("#weather");
  const weatherFragment = `
  <h2>${dataObj.main.temp}</h2>
  `;
  weatherDiv.innerHTML = weatherFragment;
}

// deal with fail callback
function failHandler(status) {
  console.log(status);
  const weatherDiv = document.querySelector("#weather");
  weatherDiv.innerHTML = "<p>Checking data...</p>";
}

// start the request
document.addEventListener("DOMContentLoaded", function () {
  // const apiKey = "31b82782921c63b3313e889b892c15b6";
  const apiKey = "3";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=castleford&units=metric&appid=" +
    apiKey;

  // call request
  get(url, successHandler, failHandler);
});
