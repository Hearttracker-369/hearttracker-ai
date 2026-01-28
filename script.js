console.log("JS Loaded");

const statusText = document.getElementById("status");

window.addEventListener("devicemotion", (event) => {
  // PURE acceleration (gravity removed by system)
  const acc = event.acceleration;

  if (!acc) {
    statusText.innerText = "Acceleration not supported";
    return;
  }

  let x = acc.x ?? 0;
  let y = acc.y ?? 0;
  let z = acc.z ?? 0;

  let magnitude = Math.sqrt(x*x + y*y + z*z);

  statusText.innerText =
    `x: ${x.toFixed(3)} | y: ${y.toFixed(3)} | z: ${z.toFixed(3)}\n` +
    `Vibration: ${magnitude.toFixed(3)}`;

  console.log("Vibration:", magnitude);
});
