import { createInterface } from 'readline/promises';
import ollama from 'ollama';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const memory = [];

async function chat() {
  const content = await rl.question('Input: ');
  if (content === 'exit') {
    rl.close();
    return;
  }

  const userMessage = { role: 'user', content };
  memory.push(userMessage);
  const response = await ollama.chat({
    model: 'llama3.2',
    messages: memory,
  });
  memory.push(response.message);
  console.log(response.message.content);
  chat();
}

chat();