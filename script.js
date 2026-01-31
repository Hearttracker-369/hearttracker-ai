const xEl = document.getElementById("x");
const yEl = document.getElementById("y");
const zEl = document.getElementById("z");
const vEl = document.getElementById("v");

const statusEl = document.getElementById("status");
const confidenceEl = document.getElementById("confidence");
const startBtn = document.getElementById("startBtn");

let readings = [];

startBtn.addEventListener("click", () => {
  readings = [];
  statusEl.innerText = "Scanning...";
  confidenceEl.innerText = "0%";

  if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", handleMotion);
  } else {
    alert("Accelerometer not supported");
  }

  setTimeout(stopScan, 30000); // 30 sec scan
});

function handleMotion(event) {
  const x = event.accelerationIncludingGravity.x || 0;
  const y = event.accelerationIncludingGravity.y || 0;
  const z = event.accelerationIncludingGravity.z || 0;

  const vibration = Math.sqrt(x*x + y*y + z*z);

  xEl.innerText = x.toFixed(3);
  yEl.innerText = y.toFixed(3);
  zEl.innerText = z.toFixed(3);
  vEl.innerText = vibration.toFixed(3);

  readings.push(vibration);
}

function stopScan() {
  window.removeEventListener("devicemotion", handleMotion);

  // SIMPLE confidence logic (temporary)
  const avg = readings.reduce((a,b)=>a+b,0) / readings.length;

  let confidence = 60;
  let status = "Normal Pattern";

  if (avg > 0.35) {
    status = "Irregular Pattern Detected";
    confidence = 75;
  }

  statusEl.innerText = status;
  confidenceEl.innerText = confidence + "%";
}

