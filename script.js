let audioContext;
let analyser;
let dataArray;

function startMic() {
  document.getElementById("status").innerText = "Mic starting...";

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);

      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      document.getElementById("status").innerText = "Mic running";
      readMic();
    })
    .catch(err => {
      alert("Mic permission denied");
    });
}

function readMic() {
  analyser.getByteFrequencyData(dataArray);

  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    sum += dataArray[i];
  }

  let average = Math.round(sum / dataArray.length);
  document.getElementById("value").innerText = average;

  requestAnimationFrame(readMic);
}