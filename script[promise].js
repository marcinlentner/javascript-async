// instantiate object request
let httpRequest = new XMLHttpRequest();

// open connection, prepare success handler, send request
function get(url) {
  return new Promise(function (resolve, reject) {
    httpRequest.open("GET", url);
    httpRequest.onload = function () {
      if (httpRequest.status === 200) {
        resolve(httpRequest.responseText);
      } else {
        reject(Error(httpRequest.status));
      }
    };
    httpRequest.send();
  });
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
  const apiKey = "31b82782921c63b3313e889b892c15b6";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=castleford&units=metric&appid=" +
    apiKey;

  get(url)
    .then(function (response) {
      successHandler(response);
    })
    .catch(function (status) {
      failHandler(status);
    })
    .finally(function () {
      // always executes
      const weatherDiv = document.querySelector("#weather");
      const degrees = document.createElement("span");
      degrees.innerHTML = "&deg;";
      weatherDiv.appendChild(degrees);
    });
});
