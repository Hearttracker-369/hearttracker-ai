window.addEventListener("devicemotion", (event) => {
  const acc = event.accelerationIncludingGravity;

  if (!acc) {
    document.getElementById("status").innerText =
      "Accelerometer not supported";
    return;
  }

  const x = acc.x || 0;
  const y = acc.y || 0;
  const z = acc.z || 0;

  const vibration = Math.sqrt(x*x + y*y + z*z);

  document.getElementById("output").innerText =
    "Vibration Energy: " + vibration.toFixed(2);
});
