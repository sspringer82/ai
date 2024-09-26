import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';
import { Camera } from '@mediapipe/camera_utils';

const outputCanvas = document.getElementById('outputCanvas');
const canvasCtx = outputCanvas.getContext('2d');

const selfieSegmentation = new SelfieSegmentation({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
  },
});

selfieSegmentation.setOptions({
  modelSelection: 1, // 0 für schnelles Modell, 1 für höherwertiges Modell
});

selfieSegmentation.onResults(onResults);

const mode = 'image';

if (mode === 'video') {
  const videoElement = document.createElement('video');

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await selfieSegmentation.send({ image: videoElement });
    },
    width: 640,
    height: 480,
  });

  camera.start();
} else if (mode === 'image') {
  const imageUpload = document.getElementById('imageUpload');

  imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = async () => {
        outputCanvas.width = image.width;
        outputCanvas.height = image.height;
        await selfieSegmentation.send({ image });
      };
    }
  });
}

function onResults(results) {
  // Zeichnen des Hintergrundbildes (optional)
  // canvasCtx.drawImage(backgroundImage, 0, 0, outputCanvas.width, outputCanvas.height);

  // Zeichnen des Originalvideos
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    outputCanvas.width,
    outputCanvas.height
  );

  // Anwenden der Segmentierungsmaske
  canvasCtx.globalCompositeOperation = 'destination-in';
  canvasCtx.drawImage(
    results.segmentationMask,
    0,
    0,
    outputCanvas.width,
    outputCanvas.height
  );

  // Rücksetzen des Composite-Operationsmodus
  canvasCtx.globalCompositeOperation = 'source-over';

  canvasCtx.restore();
}
