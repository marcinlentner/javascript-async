/*
 * JavaScript Promise
 */

// instantiate object request

// open connection, prepare success handler, send request
function get(url) {
  return new Promise(function (resolve, reject) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url);
    httpRequest.onload = function () {
      if (httpRequest.status === 200) {
        resolve(httpRequest.responseText);
      } else {
        reject(Error(httpRequest.status));
      }
    };
    // Handle network errors
    httpRequest.onerror = function () {
      reject(Error("Network Error"));
    };

    httpRequest.send();
  });
}

// deal with data after asynchronous function returns
function successHandler(data) {
  const dataObj = JSON.parse(data);
  console.log(dataObj);
  const div = `
  <h2>${dataObj.name}: ${dataObj.main.temp}</h2>
  `;
  return div;
}

// deal with fail callback
function failHandler(status) {
  console.log(status);
}

// start the request
document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "31b82782921c63b3313e889b892c15b6";
  const weatherDiv = document.querySelector("#weather");
  const locations = [
    "castleford, gb",
    "windermere, gb",
    "york, gb",
    "london, gb",
  ];

  const urls = locations.map(function (location) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  });

  // Promise.all([get(urls[0]), get(urls[1]), get(urls[2]), get(urls[3])])
  //   .then(function (responses) {
  //     return responses.map(function (response) {
  //       return successHandler(response);
  //     });
  //   })
  //   .then(function (literals) {
  //     weatherDiv.innerHTML = `<h1>Weather</h1>${literals.join("")}`;
  //   })
  //   .catch(function (status) {
  //     failHandler(status);
  //   })
  //   .finally(function () {
  //     // always executes
  //     weatherDiv.classList.add("green");
  //   });

  (async function () {
    let responses = [];
    responses.push(await get(urls[0]));
    responses.push(await get(urls[1]));
    responses.push(await get(urls[2]));
    responses.push(await get(urls[3]));
    let literals = responses.map(function (response) {
      return successHandler(response);
    });
    weatherDiv.innerHTML = `<h1>Weather</h1>${literals.join("")}`;
    weatherDiv.classList.add("green");
  })();
});
