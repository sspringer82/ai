import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

import * as cocoSsd from '@tensorflow-models/coco-ssd';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

async function detectObjects() {
  const model = await cocoSsd.load();
  const ctx = canvas.getContext('2d');

  video.addEventListener('loadeddata', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  });

  function detectFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    model.detect(video).then((predictions) => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      predictions.forEach((prediction) => {
        const [x, y, width, height] = prediction.bbox;

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        ctx.font = '18px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText(prediction.class, x, y > 10 ? y - 5 : 10);
      });
    });
    requestAnimationFrame(detectFrame);
  }

  detectFrame();
}

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
  video.play();
});

video.addEventListener('play', () => {
  console.log('play');
  detectObjects();
});
