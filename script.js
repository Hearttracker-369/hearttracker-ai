let buffer = [];

window.addEventListener("devicemotion", (event) => {
  let x = event.acceleration?.x || 0;
  let y = event.acceleration?.y || 0;
  let z = event.acceleration?.z || 0;

  let vibration = Math.sqrt(x*x + y*y + z*z);

  buffer.push(vibration);
  if (buffer.length > 20) buffer.shift();

  let smooth =
    buffer.reduce((a,b)=>a+b,0) / buffer.length;

  console.log("Vibration:", vibration.toFixed(4),
              "Smooth:", smooth.toFixed(4));
});
