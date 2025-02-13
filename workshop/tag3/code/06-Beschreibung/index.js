// Voraussetzungen: lokales ollama
// ollama pull llava-phi3
// ollama serve

import ollama from 'ollama';
import { readFile } from 'node:fs/promises';

const data = await readFile('./cat.jpg');
console.log(data);
const base64String = data.toString('base64');

const response = await ollama.chat({
  model: 'llava-phi3',
  messages: [
    {
      role: 'user',
      content:
        'Beschreibe die wesentlichen Aspekte des Bildes in 250 Zeichen oder weniger.',
      images: [base64String],
    },
  ],
});

console.log(response.message.content);
