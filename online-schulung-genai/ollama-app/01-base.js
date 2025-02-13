import ollama from 'ollama';

const response = await ollama.chat({
  model: 'llama3.2',
  messages: [{ role: 'user', content: 'Erklär mir die Farbe orange in einem Satz' }],
});

console.log(response.message.content);
