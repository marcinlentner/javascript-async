console.log("Hi");

setTimeout(function () {
  console.log("Asynchronus result");
}, 5000);

console.log("Synchronus result");

// Hi
// Synchronus result
// Asynchronus result
