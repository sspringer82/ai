// ACHTUNG: Bild ins Verzeichnis legen, in dem das Skript ausgeführt wird
// Prompt anpassen
// sicherstellen dass das model installiert ist: ollama pull llama3.2-vision

import ollama from 'ollama';

const model = 'llama3.2-vision';

const prompt = 'Describe the content of the image';

const response = await ollama.chat({
  model,
  messages: [
    {
      role: 'user',
      content: prompt,
      images: ['input.jpg'],
    },
  ],
});

console.log(response);
