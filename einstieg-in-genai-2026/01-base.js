import ollama from 'ollama';

const response = await ollama.chat({
  model: 'llama3.2:1b',
  messages: [{ role: 'user', content: 'What is the capital of France?' }],
});

console.log(response.message.content);
