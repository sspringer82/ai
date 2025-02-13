// Elemente aus dem DOM auswählen
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const output = document.querySelector('output');

let mediaRecorder;
let audioChunks = [];

// Start-Aufnahme-Button Eventlistener
startButton.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    uploadAudio(audioBlob);
  };

  mediaRecorder.start();
  startButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
  mediaRecorder.stop();
  startButton.disabled = false;
  stopButton.disabled = true;
});

async function uploadAudio(audioBlob) {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');

  try {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log('Upload erfolgreich:', result);

    output.innerText = result.text;
  } catch (error) {
    console.error('Fehler beim Hochladen:', error);
  }
}
