const startBtn = document.getElementById('startBtn');
const statusText = document.getElementById('status');

startBtn.addEventListener('click', async () => {
    try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        statusText.textContent = 'Microphone access granted! Listening...';

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        source.connect(analyser);
        analyser.fftSize = 256;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function detectSound() {
            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
            statusText.textContent = `Current volume: ${Math.round(average)}`;
            requestAnimationFrame(detectSound);
        }

        detectSound();
    } catch (err) {
        console.error(err);
        statusText.textContent = 'Microphone access denied or error occurred.';
    }
});