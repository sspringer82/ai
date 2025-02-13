import express from 'express';
import ollama from 'ollama';

const app = express();

app.use(express.static('public'));
app.use(express.json());

const messages = [];

app.post('/chat', async (request, response) => {
  const { content } = request.body;

  messages.push({ role: 'user', content });
  const ollamaResponse = await ollama.chat({
    model: 'llama3.2',
    messages,
  });
  messages.push(ollamaResponse.message);
  response.json(ollamaResponse.message);
});

app.post('/chat-stream', async (request, response) => {
  const { content } = request.body;

  messages.push({ role: 'user', content });

  response.setHeader('Content-Type', 'text/event-stream');
  response.setHeader('Cache-Control', 'no-cache');
  response.setHeader('Connection', 'keep-alive');
  response.flushHeaders();

  const stream = await ollama.chat({
    model: 'llama3.2',
    messages,
    stream: true,
  });

  let ollamaResponse = '';
  for await (const part of stream) {
    ollamaResponse += part.message.content;
    response.write(part.message.content);
  }
  messages.push({ role: 'assistant', content: ollamaResponse });
  response.end();
});

app.listen(8081, () => {
  console.log('Server started on http://localhost:8081');
});
