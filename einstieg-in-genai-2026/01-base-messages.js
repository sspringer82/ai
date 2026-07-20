import ollama from 'ollama';

const response = await ollama.chat({
  model: 'llama3.2:1b',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'What is the capital of France?' },
    { role: 'assistant', content: 'The capital of France is Paris.' },
    { role: 'user', content: 'What about Germany?' },
  ],
});

console.log(response.message.content);
